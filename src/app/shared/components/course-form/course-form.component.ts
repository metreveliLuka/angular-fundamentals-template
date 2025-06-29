import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import {
  FormArray,
  FormBuilder, FormControl, FormGroup,
  Validators
} from '@angular/forms';
import { mockedAuthorsList } from '@app/shared/mocks/mocks';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss'],
})
export class CourseFormComponent {
  removeAuthor(i: number) {
    const authorArray = this.getAuthors();
    const authorName = this.authorGroup.get('name') as FormControl;
    if(authorName){
      const author = authorArray.controls[i] as FormControl;
      authorArray.removeAt(i);
      this.authors.push(author.value)
    }
  }

  constructor(public fb: FormBuilder, public library: FaIconLibrary) {
    library.addIconPacks(fas);
    this.buildForm();
  }

  get authorGroup() {
    return this.courseForm.get('newAuthor') as FormGroup;
  }

  buildForm(): void{
    this.courseForm = this.fb.group({
      title: new FormControl("", [Validators.minLength(2), Validators.required]),
      description: new FormControl("", [Validators.minLength(2), Validators.required]),
      authors: this.fb.array([], Validators.required),
      duration: new FormControl("", [Validators.required, Validators.min(0)]),
      newAuthor: this.fb.group({
        name: new FormControl("", [Validators.minLength(2), Validators.pattern(/^[a-zA-Z0-9]+$/)])}),
    });
  }

  authors: {id: string, name: string}[] = mockedAuthorsList;
  courseForm!: FormGroup;
  submitButtonText = "Add Course";
  backToCoursePageText = "Back";
  createAuthorButtonText = "Create Author";
  removeAuthorButtonText: string = "Remove Author";
  addAuthorButtonText= "Add Author";
  submitted: boolean = false;
  
  @Output() coursePage: EventEmitter<any> = new EventEmitter<any>();
  
  showCoursePage(): void {
    this.coursePage.emit();
  }

  createAuthor(): void{
    const authorName = this.authorGroup.get('name') as FormControl;
    if(authorName && authorName!.valid && authorName.value.length > 0){
      this.authors.push({id: CourseFormComponent.standardGuid(), name: authorName.value,})
      authorName.reset();
    }
  }
  static standardGuid(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
      const r: number = Math.random() * 16 | 0;
      const v: number = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  addAuthor(i: number): void{
    const author = this.authors[i];
    if(this.getAuthors().controls.filter((contr) => contr.value.id === author.id).length === 0)
    {
      this.authors.splice(i,1);
      this.getAuthors().push(new FormControl(author));
    }
  }

  getAuthors(): FormArray {
    return this.courseForm.get("authors") as FormArray;
  }
  
  onSubmit(){
    this.submitted = true;
  }
  
  get duration(){
    return this.courseForm.get("duration") as FormControl;
  }
  // Use the names `title`, `description`, `author`, 'authors' (for authors list), `duration` for the form controls.
}
