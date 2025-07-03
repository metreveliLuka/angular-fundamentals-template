import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthorizedGuard } from '@app/auth/guards/authorized.guard';
import { CourseFormComponent } from '@app/shared/components';
import { AdminGuard } from '@app/user/guards/admin.guard';
import { CourseInfoComponent } from '../course-info/course-info.component';
import { CoursesComponent } from './courses.component';
import { CoursesListComponent } from './courses-list/courses-list.component';

const routes: Routes = [
  {
    path: '',
    component: CoursesComponent,
    children: [
    {
      path: '',
      component: CoursesListComponent
    },
    {
      path: 'add',
      component: CourseFormComponent,
      canLoad: [AuthorizedGuard],
      canActivate: [AdminGuard]
    },
    {
      path: ':id',
      component: CourseInfoComponent,
      canLoad: [AuthorizedGuard]
    },
    {
      path: 'edit/:id',
      component: CourseFormComponent,
      canLoad: [AuthorizedGuard],
      canActivate: [AdminGuard]
    }],
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
})
export class CoursesRoutingModule { }
