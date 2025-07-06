import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { CoursesStoreService } from '@app/services/courses-store.service';
import { GetAuthorBody, GetCourseBody } from '@app/services/courses.service';
import { CoursesStateFacade } from '@app/store/courses/courses.facade';
import { UserStoreService } from '@app/user/services/user-store.service';
import { combineLatest, map, take } from 'rxjs';

@Component({
  selector: 'app-course-info',
  templateUrl: './course-info.component.html',
  styleUrls: ['./course-info.component.scss']
})
export class CourseInfoComponent implements OnInit{
  constructor(private router: Router, private userStore: UserStoreService, private coursesFacade: CoursesStateFacade, private route: ActivatedRoute) {}

  course$ = this.coursesFacade.course$;
  backButtonText: string = "Back";

  ngOnInit(): void {
    const courseId = this.route.snapshot.paramMap.get('id') as string;
    this.coursesFacade.getSingleCourse(courseId);
  }

  getList(): void{
    this.router.navigate(['courses']);
  }

  getAuthorNames() {
    return combineLatest([this.userStore.authors$, this.course$])
    .pipe(
      map(authorCourse => authorCourse[0].filter(author => this.idIsInAuthors(author, authorCourse[1]!)).map(author => author.name)),
      take(1));
  }

  idIsInAuthors(author: GetAuthorBody, course: GetCourseBody): boolean {
    const countInAuthors: number = course!.authors!.filter(_author => _author === author.id).length;
    return countInAuthors > 0;
  }
  
  getDate(dateString: string): Date {
    return new Date(dateString);
  }
  clickBackButton() {
    this.router.navigate(['/courses']);
  }
}
