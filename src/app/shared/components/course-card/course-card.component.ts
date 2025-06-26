import { Component, EventEmitter, Input, Output } from '@angular/core';
import { mockedAuthorsList } from '@app/shared/mocks/mocks';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss']
})
export class CourseCardComponent {
  @Input() id: string = "";
  @Input() title: string = "";
  @Input() description: string = "";
  @Input() creationDate: Date = new Date();
  @Input() duration: number = 0;
  @Input() authors: string[] = [];

  getAuthorsNames(): string[]{
    return this.authors.map(auth => mockedAuthorsList.filter((author) => author.id == auth)[0].name);
  }
  
  @Input() editable: boolean = false;
  
  @Output() showCourse = new EventEmitter<any>;

  @Output() editCourse = new EventEmitter<any>;

  @Output() removeCourse = new EventEmitter<any>;

  clickOnShow(): void{
    this.showCourse.emit(this.getCardInfo().id);
  }

  clickOnEdit(): void{
    this.editCourse.emit(this.getCardInfo().id);
  }

  clickOnRemove(): void{
    this.removeCourse.emit(this.getCardInfo().id);
  }
  editText: string = "Edit";
  removeText: string = "Remove";
  showCourseButtonText: string = "Show course";
  getCardInfo(): {id: string, title: string, description: string, creationDate: Date, duration: number, authors: string[]}{
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      creationDate: this.creationDate,
      duration: this.duration,
      authors: this.authors,
    };
  }
}
