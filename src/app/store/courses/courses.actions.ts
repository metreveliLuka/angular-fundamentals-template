import { createAction, props } from '@ngrx/store';
import { CoursesConstants } from '@app/store/courses/courses.constants';
import { CourseBody, GetCourseBody } from '@app/services/courses.service';

// Add your code here

export const requestAllCourses = createAction(
    CoursesConstants.REQUEST_ALL_COURSES,
);

export const requestAllCoursesSuccess = createAction(
    CoursesConstants.REQUEST_ALL_COURSES_SUCCESS,
    props<{courses: GetCourseBody[]}>()
);

export const requestAllCoursesFail = createAction(
    CoursesConstants.REQUEST_ALL_COURSES_FAIL,
    props<{error: any}>()
);

export const requestSingleCourse = createAction(
    CoursesConstants.REQUEST_SINGLE_COURSE,
    props<{id: string}>()
);

export const requestSingleCourseSuccess = createAction(
    CoursesConstants.REQUEST_SINGLE_COURSE_SUCCESS,
    props<{course: GetCourseBody}>()
);

export const requestSingleCourseFail = createAction(
    CoursesConstants.REQUEST_SINGLE_COURSE_FAIL,
    props<{error: any}>()
);

export const requestFilteredCourses = createAction(
    CoursesConstants.REQUEST_FILTERED_COURSES,
    props<{title: string}>()
);

export const requestFilteredCoursesSuccess = createAction(
    CoursesConstants.REQUEST_FILTERED_COURSES_SUCCESS,
    props<{courses: GetCourseBody[]}>()
);

export const requestFilteredCoursesFail = createAction(
    CoursesConstants.REQUEST_FILTERED_COURSES_FAIL,
    props<{error: any}>()
);

export const requestDeleteCourse = createAction(
    CoursesConstants.REQUEST_DELETE_COURSE,
    props<{id: string}>()
);

export const requestDeleteCourseSuccess = createAction(
    CoursesConstants.REQUEST_DELETE_COURSE_SUCCESS,
    props<{id: string}>()
);

export const requestDeleteCourseFail = createAction(
    CoursesConstants.REQUEST_DELETE_COURSE_FAIL,
    props<{error: any}>()
);

export const requestEditCourse = createAction(
    CoursesConstants.REQUEST_EDIT_COURSE,
    props<{id: string, course: CourseBody}>()
);

export const requestEditCourseSuccess = createAction(
    CoursesConstants.REQUEST_EDIT_COURSE_SUCCESS,
    props<{course: GetCourseBody}>()
);

export const requestEditCourseFail = createAction(
    CoursesConstants.REQUEST_EDIT_COURSE_FAIL,
    props<{error: any}>()
);

export const requestCreateCourse = createAction(
    CoursesConstants.REQUEST_CREATE_COURSE,
    props<{course: CourseBody}>()
);

export const requestCreateCourseSuccess = createAction(
    CoursesConstants.REQUEST_CREATE_COURSE_SUCCESS,
    props<{course: GetCourseBody}>()
);

export const requestCreateCourseFail = createAction(
    CoursesConstants.REQUEST_CREATE_COURSE_FAIL,
    props<{error: any}>()
);