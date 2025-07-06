import { ActionReducer, ActionReducerMap, MetaReducer } from "@ngrx/store";
import { coursesReducer, CoursesState } from "./courses/courses.reducer";
import { CoursesEffects } from "./courses/courses.effects";

export interface State {
  courses: CoursesState;
}

export const reducers: ActionReducerMap<State> = {
  courses: coursesReducer,
};

export const effects = [CoursesEffects]

export function debug(reducer: ActionReducer<any>): ActionReducer<any> {
  return function (state, action) {
    console.log("state", state);
    console.log("action", action);

    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<any>[] = [debug];
