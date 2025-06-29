import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'courses-app';
  logOutIconName = "some name";
  logOutButtonText: string = "log out";
  addCourseText: string = "add new course";
  infoTitle: string = "Your list is empty"
  infoText: string = "Please use 'Add New Course' button to add your first course";
  loginText: string = "Login";
  isLoggedIn: boolean = true;
  addCoursePage: boolean = false;
  showAddCoursePage() {
    if(this.isLoggedIn){
      this.addCoursePage = true;
    }
  }
  showCoursePage(){
    if(this.isLoggedIn){
      this.addCoursePage = false;
    }
  }
}
