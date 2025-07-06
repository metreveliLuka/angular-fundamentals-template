import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  searchButtonText: string = "Search";
  @Input() placeholder: string = "";
  @Output() search = new EventEmitter<any>();
  searchControl = new FormControl("", Validators.required);

  clickSearch(){
    this.search.emit(this.searchControl.value);
  }
}
