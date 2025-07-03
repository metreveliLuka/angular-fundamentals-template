import { Component, EventEmitter, Input, Output } from '@angular/core';
import { mockedAuthorsList } from '@app/shared/mocks/mocks';
import { UserStoreService } from '@app/user/services/user-store.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CoursesStoreService } from '@app/services/courses-store.service';
import { GetAuthorBody, GetCourseBody } from '@app/services/courses.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss']
})
export class CourseCardComponent {
  constructor(private userStore: UserStoreService, private router: Router, private coursesService: CoursesStoreService, private route: ActivatedRoute) {}

  @Input() id: string = "";
  @Input() title: string = "";
  @Input() description: string = "";
  @Input() creationDate: Date = new Date();
  @Input() duration: number = 0;
  @Input() authors: string[] = [];
  @Input() editable: boolean = false;

  editText: string = "Edit";
  removeText: string = "Remove";
  showCourseButtonText: string = "Show course";

  getAuthorsNames() {
    return this.userStore.authors$.pipe(map(authors => authors.filter(this.isInAuthorsList.bind(this))));
  }

  clickOnShow(): void{
    this.router.navigate([this.id], {relativeTo: this.route});
  }

  clickOnEdit(): void{
    this.router.navigate(['courses','edit', this.id]);
  }

  clickOnRemove(): void{
    this.coursesService.deleteCourse(this.id).subscribe();
    this.router.navigate(['courses']);
  }
  
  isInAuthorsList(author: GetAuthorBody): boolean {
    return this.authors.filter(auth => auth === author.id).length > 0;
  }
}
