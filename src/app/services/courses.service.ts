import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface Response<T>{
    successful?: boolean;
    result?: T;
    errors?: [];
}

export interface CreateAuthorBody{
    name: string;
}

export interface GetAuthorBody{
    name: string;
    id: string;
}

export interface GetCourseBody {
    id?: string;
    creationDate?: string;
    title?: string;
    description?: string;
    duration?: number;
    authors?: string[];
}

export interface CourseBody {
    title?: string;
    description?: string;
    duration?: number;
    authors?: string[];
}

@Injectable({
    providedIn: 'root'
})
export class CoursesService {
    private readonly url: string = 'http://localhost:4000/';
    constructor(private client: HttpClient) { }
    getAll() {
        return this.client.get<Response<GetCourseBody[]>>(this.url + 'courses/all');
    }

    createCourse(course: CourseBody) { // replace 'any' with the required interface
        return this.client.post<Response<GetCourseBody>>(this.url + 'courses/add', course);
    }

    editCourse(id: string, course: CourseBody) { // replace 'any' with the required interface
        return this.client.put<Response<GetCourseBody>>(this.url + `courses/${id}`, course);
    }

    getCourse(id: string) {
        return this.client.get<Response<GetCourseBody>>(this.url + `courses/${id}`);
    }

    deleteCourse(id: string) {
        return this.client.delete<Response<string>>(this.url + `courses/${id}`);
    }

    filterCourses(value: string) {
        return this.client.get<Response<GetCourseBody[]>>(this.url + `courses/filter?title=${value}`);
    }

    getAllAuthors() {
        return this.client.get<Response<GetAuthorBody[]>>(this.url + 'authors/all');
    }

    createAuthor(author: CreateAuthorBody) {
        return this.client.post<Response<GetAuthorBody>>(this.url + 'authors/add', author);
    }

    getAuthorById(id: string) {
        return this.client.get<Response<GetAuthorBody>>(this.url + `authors/${id}`);
    }
}
