import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { BehaviorSubject, filter, switchMap, tap } from 'rxjs';
import { GetAuthorBody } from '@app/services/courses.service';
import { CoursesStoreService } from '@app/services/courses-store.service';

@Injectable({
    providedIn: 'root'
})
export class UserStoreService{

    constructor(private userService: UserService, private courseStore: CoursesStoreService) {
        this.courseStore.getAllAuthors().subscribe(authors =>{
            this.authors = authors;
        });

        this.courseStore.authorsLoading$
        .pipe(
            filter(loading => !loading),
            switchMap(() => this.courseStore.getAllAuthors())
        )
        .subscribe(authors =>{
            this.authors=authors;
        });
        this.getUser();
    }
    getUser() {
        return this.userService.getUser().pipe(tap(res => {
            this.isAdmin = res.role === "admin";
            this.name$$.next(res.name);
        })).subscribe();
    }

    get authors() {
        return this.authors$$.value;
    }

    set authors(value: GetAuthorBody[]){
        this.authors$$.next(value);
    }

    private authors$$ = new BehaviorSubject<GetAuthorBody[]>([]);
    authors$ = this.authors$$.asObservable();

    private name$$ = new BehaviorSubject<string>("");
    name$ = this.name$$.asObservable();

    private isAdmin$$ = new BehaviorSubject<boolean>(false);
    isAdmin$ = this.isAdmin$$.asObservable();

    get isAdmin() {
        return this.isAdmin$$.value;
    }

    set isAdmin(value: boolean) {
        this.isAdmin$$.next(value);
    }
}
