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
  infoButtonText: string = "add new course";
  infoTitle: string = "Your list is empty"
  infoText: string = "Please use 'Add New Course' button to add your first course";
}
