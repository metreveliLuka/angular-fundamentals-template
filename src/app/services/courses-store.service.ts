import { Injectable } from '@angular/core';
import { CourseBody, CoursesService, CreateAuthorBody, GetCourseBody } from './courses.service';
import { BehaviorSubject, map, tap } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CoursesStoreService{
    constructor(private courseService: CoursesService) {
        this.getAll().pipe(tap(courses => {
            this.courses$$.next(courses.result!);
        })).subscribe();
    }
    private authorsLoading$$ = new BehaviorSubject<boolean>(false);
    authorsLoading$ = this.authorsLoading$$.asObservable();

    private courses$$ = new BehaviorSubject<GetCourseBody[]>([]);
    courses$ = this.courses$$.asObservable();

    private isLoading$$ = new BehaviorSubject<boolean>(false);
    isLoading$ = this.isLoading$$.asObservable();
    
    get courses() {
        return this.courses$$.value;
    }

    private set courses(value: GetCourseBody[]) {
        this.courses$$.next(value);
    }


    getAll(){
        this.isLoading$$.next(true);
        return this.courseService.getAll()
        .pipe(tap(result => {
            this.courses$$.next(result.result!);
            this.isLoading$$.next(false);
        }));
    }

    createCourse(course: CourseBody) {
        return this.courseService.createCourse(course).pipe(tap(() => { this.getAll().subscribe() }));
    }

    getCourse(id: string) {
        return this.courseService.getCourse(id);
    }

    editCourse(id: string, course: CourseBody) {
        return this.courseService.editCourse(id, course).pipe(tap(() => { this.getAll().subscribe() }));
    }

    deleteCourse(id: string) {
        return this.courseService.deleteCourse(id).pipe(tap(() => { this.getAll().subscribe() }));
    }

    filterCourses(value: string) {
        this.isLoading$$.next(true);
        return this.courseService.filterCourses(value).pipe(
            tap(res => {
            this.courses$$.next(res.result!);
            this.isLoading$$.next(false);
        }));
    }

    getAllAuthors() {
        return this.courseService.getAllAuthors().pipe(map(resp => resp.result));
    }

    createAuthor(author: CreateAuthorBody) {
        this.authorsLoading$$.next(true);
        return this.courseService.createAuthor(author).pipe(tap(() => {
            this.authorsLoading$$.next(false);
        }));
    }

    getAuthorById(id: string) {
        return this.courseService.getAuthorById(id).pipe(map(resp => resp.result));
    }
}
