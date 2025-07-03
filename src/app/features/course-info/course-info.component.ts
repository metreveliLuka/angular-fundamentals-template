import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { CoursesStoreService } from '@app/services/courses-store.service';
import { GetAuthorBody, GetCourseBody } from '@app/services/courses.service';
import { UserStoreService } from '@app/user/services/user-store.service';
import { map, take } from 'rxjs';

@Component({
  selector: 'app-course-info',
  templateUrl: './course-info.component.html',
  styleUrls: ['./course-info.component.scss']
})
export class CourseInfoComponent implements OnInit{
  constructor(private router: Router, private userStore: UserStoreService, private courseStore: CoursesStoreService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const courseId = this.route.snapshot.paramMap.get('id') as string;
    this.courseStore.getCourse(courseId)
      .pipe(take(1))
      .subscribe(course => {this.course = course});
  }

  course?: GetCourseBody;

  backButtonText: string = "Back";

  getList(): void{
    this.router.navigate(['courses']);
  }

  getAuthorNames() {
    return this.userStore.authors$.pipe(
      map(authors => authors.filter(this.idIsInAuthors.bind(this)).map(author => author.name)),
      take(1));
  }

  idIsInAuthors(author: GetAuthorBody): boolean {
    const countInAuthors = this.course!.authors.filter(_author => _author === author.id).length;
    return countInAuthors > 0;
  }
  
  getDate(dateString: string): Date {
    return new Date(dateString);
  }
  clickBackButton() {
    this.router.navigate(['/courses']);
  }
}
