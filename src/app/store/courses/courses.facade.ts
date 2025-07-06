import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as CourseSelectors from './courses.selectors';
import * as CourseActions from './courses.actions';
import { CourseBody } from '@app/services/courses.service';

@Injectable({
    providedIn: 'root'
})
export class CoursesStateFacade {
    allCourses$ = this.store.select(CourseSelectors.getCourses);
    isAllCoursesLoading$ = this.store.select(CourseSelectors.isAllCoursesLoadingSelector);
    isSingleCourseLoading$ = this.store.select(CourseSelectors.isSingleCourseLoadingSelector);
    isSearchingState$ = this.store.select(CourseSelectors.isSearchingStateSelector);
    courses$ = this.store.select(CourseSelectors.getCourses);
    course$ = this.store.select(CourseSelectors.getCourse);
    errorMessage$ = this.store.select(CourseSelectors.getErrorMessage);
    
    getAllCourses() {
        this.store.dispatch(CourseActions.requestAllCourses());
    }

    getSingleCourse(id: string) {
        this.store.dispatch(CourseActions.requestSingleCourse({ id }));
    } 

    getFilteredCourses(searchValue: string) {
        this.store.dispatch(CourseActions.requestFilteredCourses({ title: searchValue }))
    } 
    
    editCourse(body: CourseBody, id: string) {
        this.store.dispatch(CourseActions.requestEditCourse({ course:body, id }))
    }
    
    createCourse(body: CourseBody) {
        this.store.dispatch(CourseActions.requestCreateCourse({ course: body }));
    } 

    deleteCourse(id: string) {
        this.store.dispatch(CourseActions.requestDeleteCourse({ id }));
    } 

    constructor(private store: Store) {}
}
