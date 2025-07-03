import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesRoutingModule } from './courses-routing.module';
import { SharedModule } from '@app/shared/shared.module';
import { CoursesComponent } from './courses.component';
import { CoursesListComponent } from './courses-list/courses-list.component';
import { CourseInfoComponent } from '../course-info/course-info.component';
import { RouterOutlet } from '@angular/router';

@NgModule({
  declarations: [CoursesComponent, CoursesListComponent, CourseInfoComponent],
  imports: [
    CommonModule,
    SharedModule,
    CoursesRoutingModule,
    RouterOutlet
  ]
})
export class CoursesModule { }
