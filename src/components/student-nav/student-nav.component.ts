import { Component, EventEmitter, Output } from '@angular/core';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-student-nav',
  standalone: true,
  imports: [],
  templateUrl: './student-nav.component.html',
  styleUrl: './student-nav.component.css'
})
export class StudentNavComponent {
  @Output() isCreate = new EventEmitter<boolean>();

  constructor(private sharedService: SharedService) {}

  addNewStudent() {
    this.sharedService.isCreateAction = true;
    this.isCreate.emit(true);
  }
}
