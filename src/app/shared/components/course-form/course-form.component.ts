import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder, FormControl, FormGroup,
  Validators
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursesStoreService } from '@app/services/courses-store.service';
import { GetAuthorBody, GetCourseBody } from '@app/services/courses.service';
import { UserStoreService } from '@app/user/services/user-store.service';
import { filter, map, take } from 'rxjs';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss'],
})
export class CourseFormComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private userStore: UserStoreService,
    private coursesStore: CoursesStoreService,
    private route: ActivatedRoute,
    private router: Router) {
    this.courseForm = this.buildForm();
  }
  
  private init: boolean = false;
  authors: GetAuthorBody[] = [];
  availableAuthors: GetAuthorBody[] = [];
  courseForm: FormGroup;
  submitButtonText = "Add Course";
  backToCoursePageText = "Back";
  createAuthorButtonText = "Create Author";
  removeAuthorButtonText: string = "Remove Author";
  addAuthorButtonText= "Add Author";
  submitted: boolean = false;

  ngOnInit(): void {
    this.userStore.authors$.subscribe(authors => {
      this.authors = authors;
      if(!this.init){
        this.availableAuthors = this.authors.slice();
        this.init = true;
      } else {
        const lastAuthor = authors[authors.length - 1];
        this.availableAuthors.push(lastAuthor);
      }
    });

    this.id = this.route.snapshot.paramMap.get('id');
    if(this.id){
      this.initializeForm(this.id);
    }
  }

  private id: string | null = null;
  
  initializeForm(id: string) {
    this.coursesStore.courses$.pipe(
      map(courses => courses.find(course => course.id === id)!))
    .subscribe(course => {
        this.courseForm.get('title')?.setValue(course.title);
        this.courseForm.get('description')?.setValue(course.description);
        this.getCourseAuthors(course)
          .forEach(index => {
            this.addAuthor(index);
          })
        this.courseForm.get('duration')?.setValue(course.duration);
      }
    );
  }

  getCourseAuthors(course: GetCourseBody): number[] {
    const indexes = this.availableAuthors
      .map((author, index) => { return {author: author, index: index} })
      .filter(author=> course.authors.find(_author => _author === author.author.id))
      .map(author => author.index);
    return indexes.sort((a,b) => b - a);
  }

  get authorGroup() {
    return this.courseForm.get('newAuthor') as FormGroup;
  }

  buildForm() {
    return this.fb.group({
      title: new FormControl("", [Validators.minLength(2), Validators.required]),
      description: new FormControl("", [Validators.minLength(2), Validators.required]),
      authors: this.fb.array([], Validators.required),
      duration: new FormControl("", [Validators.required, Validators.min(0)]),
      newAuthor: this.fb.group({
        name: new FormControl("", [Validators.minLength(2), Validators.pattern(/^[a-zA-Z0-9]+$/)])}),
    });
  }

  showCoursePage(): void {
    this.router.navigate(['/courses']);
  }

  createAuthor(): void{
    const authorName = this.authorGroup.get('name') as FormControl;
    if(authorName && authorName!.valid && authorName.value.length > 0){
      this.coursesStore.createAuthor({name: authorName.value}).pipe(
        take(1),
        filter(resp => resp.successful),
        map(resp => resp.result)
      ).subscribe();
      authorName.reset();
    }
  }

  addAuthor(i: number): void{
    const author = this.availableAuthors[i];
    if(!this.getAuthors().controls.find((contr) => contr.value.id === author.id))
    {
      this.availableAuthors.splice(i,1);
      this.getAuthors().push(new FormControl(author.id));
    }
  }

  removeAuthor(i: number) {
    const authorArray = this.getAuthors();
    const author = authorArray.controls[i] as FormControl;
    authorArray.removeAt(i);
    this.availableAuthors.push(this.getAuthor(author.value)!);
  }

  getAuthor(id: string) {
    const author = this.authors.find(author => author.id === id);
    return author;
  }

  getAuthors(): FormArray {
    return this.courseForm.get("authors") as FormArray;
  }
  
  onSubmit(){
    this.submitted = true;
    if(this.courseForm.invalid){
      return;
    }

    if(this.id){
      this.coursesStore.editCourse(this.id, this.courseForm.value).subscribe(resp => {
        if(resp.successful){
          this.router.navigate(['/courses', resp.result.id]);
        }
      });
    } else {
      this.coursesStore.createCourse(this.courseForm.value).subscribe(resp => {
        if(resp.successful){
          this.router.navigate(['/courses', resp.result.id]);
        }
      });
    }
  }
  
  get duration(){
    return this.courseForm.get("duration") as FormControl;
  }
}
