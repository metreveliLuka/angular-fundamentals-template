import { Routes } from '@angular/router';
import { LoginFormComponent, RegistrationFormComponent } from './shared/components';
import { CoursesComponent } from './features/courses/courses.component';
import { NotAuthorizedGuard } from './auth/guards/not-authorized.guard';
import { AuthorizedGuard } from './auth/guards/authorized.guard';

export const routes: Routes = [
    {
        path: "login",
        component: LoginFormComponent,
        canActivate: [NotAuthorizedGuard]
    },
    {
        path: "registration",
        component: RegistrationFormComponent,
        canActivate: [NotAuthorizedGuard]
    },
    {
        path: "courses",
        loadChildren: () => import('./features/courses/courses.module').then(m => m.CoursesModule),
        canLoad: [AuthorizedGuard],
    },
    {
        path: "",
        redirectTo: "/courses",
        pathMatch: "full"
    },
];
