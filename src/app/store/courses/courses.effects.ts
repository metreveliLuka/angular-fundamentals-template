import { Injectable } from '@angular/core';
import { CoursesStoreService } from '@app/services/courses-store.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as CourseActions from './courses.actions';
import { map, mergeMap, take, tap } from 'rxjs';
import { Router } from '@angular/router';
import { CoursesStateFacade } from './courses.facade';

@Injectable()
export class CoursesEffects {
    constructor(
        private actions$: Actions,
        private coursesService: CoursesStoreService,
        private router: Router,
        private coursesFacade: CoursesStateFacade 
    ) {}

    getAll$ = createEffect(() => this.actions$.pipe(
        ofType(CourseActions.requestAllCourses),
        mergeMap(() => this.coursesService.getAll()
            .pipe(
                map(response => {
                    if (response.successful) {
                        return CourseActions.requestAllCoursesSuccess({ courses: response.result! });
                    } else {
                        return CourseActions.requestAllCoursesFail({ error: response.result as unknown as string });
                    }
                }),
            )
        )
    ));

    filteredCourses$ = createEffect(() => this.actions$.pipe(
        ofType(CourseActions.requestFilteredCourses),
        mergeMap(state => this.coursesFacade.allCourses$
            .pipe(take(1),
                map(courses => {
                    return CourseActions.requestFilteredCoursesSuccess({courses: courses!.filter(course => course.title === state.title).slice()})
                })
            )
        )
    ));

    getSpecificCourse$ = createEffect(() => this.actions$.pipe(
        ofType(CourseActions.requestSingleCourse),
        mergeMap(state => this.coursesService.getCourse(state.id)
            .pipe(
                map(response => {
                    if(response.successful) {
                        return CourseActions.requestSingleCourseSuccess({course: response.result!});
                    } else {
                        return CourseActions.requestSingleCourseFail({error: response.result as unknown as string})
                    }
                })
            )
        )
    ));

    deleteCourse$ = createEffect(() => this.actions$.pipe(
        ofType(CourseActions.requestDeleteCourse),
        mergeMap(state => this.coursesService.deleteCourse(state.id)
            .pipe(
                map(response => {
                    if(response.successful) {
                        return CourseActions.requestAllCourses();
                    } else {
                        return CourseActions.requestDeleteCourseFail({error: response.result})
                    }
                })
            )
        )
    ));

    editCourse$ = createEffect(() => this.actions$.pipe(
        ofType(CourseActions.requestEditCourse),
        mergeMap(state => this.coursesService.editCourse(state.id, state.course)
            .pipe(
                map(response => {
                    if(response.successful) {
                        return CourseActions.requestEditCourseSuccess({course: response.result!});
                    } else {
                        return CourseActions.requestEditCourseFail({error: response.errors})
                    }
                })
            )
        )
    ));

    createCourse$ = createEffect(() => this.actions$.pipe(
        ofType(CourseActions.requestCreateCourse),
        mergeMap(state => this.coursesService.createCourse(state.course)
            .pipe(
                map(response => {
                    if(response.successful) {
                        return CourseActions.requestCreateCourseSuccess({course: response.result!});
                    } else {
                        return CourseActions.requestCreateCourseFail({error: response.errors})
                    }
                })
            )
        )
    ));

    redirectToTheCoursesPage$ = createEffect(() => this.actions$.pipe(
        ofType(
            CourseActions.requestCreateCourseSuccess,
            CourseActions.requestEditCourseSuccess,
            CourseActions.requestSingleCourseFail
        ),
        tap(() => {
           this.router.navigate(['/courses']);
        })),
        {dispatch: false}
    );
}
