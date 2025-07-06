import { Action, createReducer, on } from '@ngrx/store';
import * as CourseActions from './courses.actions';
import { CourseBody, GetCourseBody } from '@app/services/courses.service';

// Add your code here

export interface CoursesState {
    allCourses?: GetCourseBody[];
    course?: GetCourseBody;
    isAllCoursesLoading: boolean;
    isSingleCourseLoading: boolean;
    isSearchState: boolean;
    errorMessage: string | undefined;
    id: string | undefined;
    courseBody: CourseBody| undefined;
}

export const initialState: CoursesState = {
    allCourses: [],
    courseBody: undefined,
    id: undefined,
    isAllCoursesLoading: false,
    isSingleCourseLoading: false,
    isSearchState: false,
    errorMessage: undefined
};

export const coursesFeatureKey = 'courses';

export const coursesReducer = createReducer(
    initialState,
    on(CourseActions.requestAllCourses, (state) => ({
        ...state,
        isAllCoursesLoading: true,
    })),
    on(CourseActions.requestAllCoursesSuccess, (state, {courses}) => ({
        ...state,
        allCourses: courses,
        isAllCoursesLoading: false,
    })),
    on(CourseActions.requestAllCoursesFail, (state, {error}) => ({
        ...state,
        errorMessage: error,
        isAllCoursesLoading: false,
    })),
    on(CourseActions.requestSingleCourse, (state, {id}) => ({
        ...state,
        id: id,
        isSingleCourseLoading: true,
    })),
    on(CourseActions.requestSingleCourseSuccess, (state, {course}) => ({
        ...state,
        course: course,
        isSingleCourseLoading: false,
    })),
    on(CourseActions.requestSingleCourseFail, (state, {error}) => ({
        ...state,
        isSingleCourseLoading: true,
    })),
    on(CourseActions.requestFilteredCourses, (state, {title}) => ({
        ...state,
        id: title,
        isSearchState: true,
        isAllCoursesLoading: true,
    })),
    on(CourseActions.requestFilteredCoursesSuccess, (state, {courses}) => ({
        ...state,
        allCourses: courses,
        isSearchState: false,
    })),
    on(CourseActions.requestFilteredCoursesFail, (state, {error}) => ({
        ...state,
        errorMessage: error,
        isSearchState: false,
    })),
    on(CourseActions.requestDeleteCourse, (state, {id}) => ({
        ...state,
        id: id,
        isAllCoursesLoading: true,
        errorMessage: ""
    })),
    on(CourseActions.requestDeleteCourseSuccess, (state) => ({
        ...state,
        allCourses: state.allCourses!.filter(course => course.id !== state.id),//?
        isAllCoursesLoading: false,
    })),
    on(CourseActions.requestDeleteCourseFail, (state, {error}) => ({
        ...state,
        errorMessage: error,
        isAllCoursesLoading: false,
    })),
    on(CourseActions.requestEditCourse, (state, {id, course}) => ({
        ...state,
        id: id,
        courseBody: course,
        errorMessage: "",
    })),
    on(CourseActions.requestEditCourseSuccess, (state, {course}) => ({
        ...state,
        course: course,
    })),
    on(CourseActions.requestEditCourseFail, (state, {error}) => ({
        ...state,
        errorMessage: error,
    })),
    on(CourseActions.requestCreateCourse, (state, {course}) => ({
        ...state,
        courseBody: course,
        errorMessage: "",
    })),
    on(CourseActions.requestCreateCourseSuccess, (state, {course}) => ({
        ...state,
        course: course
    })),
    on(CourseActions.requestCreateCourseFail, (state, {error}) => ({
        ...state,
        errorMessage: error
    })),
); // Add your code here

export const reducer = (state: CoursesState, action: Action): CoursesState => coursesReducer(state, action);
