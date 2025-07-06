import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CoursesStoreService } from '@app/services/courses-store.service';
import { GetCourseBody } from '@app/services/courses.service';
import { CoursesStateFacade } from '@app/store/courses/courses.facade';
import { UserStoreService } from '@app/user/services/user-store.service';
import { filter, Subject, switchMap, takeUntil } from 'rxjs';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css']
})
export class CoursesListComponent implements OnDestroy, OnInit {
  constructor(private userStore: UserStoreService, private coursesFacade: CoursesStateFacade, private router: Router) {}
  
  placeholderButtonText: string = "Input text";
  addCourseButtonText: string = "Add Course";
  courses$ = this.coursesFacade.allCourses$;
  editable: boolean = false;
  selectedCourse: GetCourseBody | null = null;
  backButtonText: string = "Back";
  destroy$ = new Subject<void>();

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit() {
    this.editable = this.userStore.isAdmin;
    this.userStore.isAdmin$.subscribe(isAdmin => {
      this.editable = isAdmin;
    });
    
    this.coursesFacade.getAllCourses();
  }

  getDate(dateString: string): Date {
    return new Date(dateString); 
  }
    
  clickAddCourseButton() {
    this.router.navigate(['courses', 'add']);
  }

  clickSearch(searchString: string | undefined) {
    if(searchString){
      this.coursesFacade.getFilteredCourses(searchString);
    } else {
      this.coursesFacade.getAllCourses();
    }
  }
}
