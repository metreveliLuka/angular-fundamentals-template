import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor (private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.isAuthorized$.subscribe(isAuthorized => {
      this.isLoggedIn = isAuthorized;      
    })
  }

  isLoggedIn: boolean = false;
  
  logOut() {
    this.authService.logout()
    .subscribe(success =>{
      if(success){
        this.router.navigate(['login']);
      }
    });
  }

  title = 'courses-app';
  logOutIconName = "some name";
  logOutButtonText: string = "log out";
  addCourseText: string = "add new course";
  infoTitle: string = "Your list is empty"
  infoText: string = "Please use 'Add New Course' button to add your first course";
  loginText: string = "Login";
  addCoursePage: boolean = false;
}
