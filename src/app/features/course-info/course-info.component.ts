import { Component, EventEmitter, Input, Output } from '@angular/core';
import { mockedAuthorsList } from '@app/shared/mocks/mocks';

@Component({
  selector: 'app-course-info',
  templateUrl: './course-info.component.html',
  styleUrls: ['./course-info.component.scss']
})
export class CourseInfoComponent {
  @Input() title: string = "";
  @Input() description: string = "";
  @Input() creationDate: Date = new Date();
  @Input() duration: number = 0;
  @Input() authors: string[] = [];
  @Input() id: string = "";

  @Input() backButtonText: string = "";
  @Output() goBack = new EventEmitter<any>();

  getList(): void{
    this.goBack.emit();
  }
  getAuthorNames(): string[]{
    return this.authors.map(id => mockedAuthorsList.filter(auth => auth.id == id)[0].name);
  }
}
