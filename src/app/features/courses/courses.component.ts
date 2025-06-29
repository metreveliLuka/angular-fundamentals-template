import { Component, Input, TemplateRef } from '@angular/core';
import { mockedCoursesList } from '@app/shared/mocks/mocks';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent {
  courses: {id:string, title: string, description: string, creationDate: Date, duration: number, authors: string[]}[] = mockedCoursesList.map( obj => {
    return {
      id: obj.id,
      title: obj.title,
      description: obj.description,
      creationDate: new Date(obj.creationDate),
      duration: obj.duration,
      authors: obj.authors,
    }});
  editable = true;
  selectedCourse: {id:string, title: string, description: string, creationDate: Date, duration: number, authors: string[]} | null = null;
  backButtonText: string = "Back";
  onShowCourse(id: string) {
    const course = this.courses.find(c => c.id === id);
    if (course) {
      this.selectedCourse = course;
    }

  }

  onBackFromInfo() {
    this.selectedCourse = null;
  }

  onEditCourse(id: string) {
    // Handle edit logic here
    console.log('Edit course:', id);
  }

  onDeleteCourse(id: string) {
    // Handle delete logic here
    this.courses = this.courses.filter((obj, i) => obj.id != id);
  }
}
