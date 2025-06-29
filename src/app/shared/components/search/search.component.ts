import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  searchButtonText: string = "Search";
  // Use the name `placeholder` for the @Input.
  // Use the name `search` for the @Output.
  @Input() placeholder: string = "";
  @Output() search = new EventEmitter<any>();
  searchControl = new FormControl("", Validators.required);

  clickSearch(){
    this.search.emit(this.searchControl.value);
  }
}
