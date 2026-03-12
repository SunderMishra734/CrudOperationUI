import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StudentService } from '../../services/student.service';
import { Student } from '../../app/models/student.model';
import { HttpClientModule } from '@angular/common/http';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-create-student-page',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './create-student-page.component.html',
  styleUrl: './create-student-page.component.css',
  providers: [StudentService]
})
export class CreateStudentPageComponent {
  @Output() isCreate = new EventEmitter<boolean>();
  @Output() showToaster = new EventEmitter<number>();
  stdName: string = '';
  stdAge: number = 0;
  stdClasses: string[] = [
    '1st Grade',
    '2nd Grade',
    '3rd Grade',
    '4th Grade',
    '5th Grade',
    '6th Grade',
    '8th Grade',
    '9th Grade',
    '10th Grade',
  ];
  stdClass: string = 'Select an Option';
  stdEmail: string = '';
  stdFN: string = '';
  stdMN: string = '';
  stdData?: Student | null;
  actionName: string = 'Create';
  stdStudentId: number = 0;

  constructor(private studentService: StudentService, private sharedService: SharedService) { }

  ngOnInit() {
    if (this.sharedService.isCreateAction) {
      this.actionName = 'Create';
    }
    else {
      this.actionName = 'Edit';
      this.sharedService.stddata$.subscribe(data => {
        if (data) {
          this.stdData = data;
          this.stdStudentId = this.stdData.studentId;
          this.stdName = this.stdData.studentName;
          this.stdAge = this.stdData.studentAge;
          this.stdClass = this.stdData.studentStandard;
          this.stdEmail = this.stdData.studentEmail;
          this.stdFN = this.stdData.studentFatherName;
          this.stdMN = this.stdData.studentMotherName;
        }
      });
    }
  }

  closeCreatePage() {
    this.isCreate.emit(false);
  }

  createStudentFn() {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (this.validateInputField()) {
      if (emailPattern.test(this.stdEmail)) {
        if (this.sharedService.isCreateAction) {
          this.stdData = {
            studentId: 0,
            studentName: this.stdName,
            studentAge: Number(this.stdAge),
            studentStandard: this.stdClass,
            studentEmail: this.stdEmail,
            studentFatherName: this.stdFN,
            studentMotherName: this.stdMN
          };
          this.studentService.addStudent(this.stdData).subscribe({
            next: (response) => {
              this.showToaster.emit(1);
              this.isCreate.emit(false);
            },
            error: (error) => {
              console.error('Error adding student:', error);
            }
          });
        }
        else {
          this.stdData = {
            studentId: this.stdStudentId,
            studentName: this.stdName,
            studentAge: Number(this.stdAge),
            studentStandard: this.stdClass,
            studentEmail: this.stdEmail,
            studentFatherName: this.stdFN,
            studentMotherName: this.stdMN
          };
          this.studentService.editStudent(this.stdData?.studentId, this.stdData).subscribe({
            next: (response) => {
              this.showToaster.emit(3);
              this.isCreate.emit(false);
            },
            error: (err) => {
              console.error('Error updating student:', err);
            }
          });
        }
      }
      else {
        alert('Enter proper email.')
      }
    }
    else {
      alert('Please enter all data.')
    }
  }

  validateInputField(): boolean {
    if (this.stdName == '' || this.stdAge == 0 || this.stdClass == '' || this.stdEmail == '' || this.stdFN == '' || this.stdMN == '')
      return false;
    return true;
  }

  editStudentFn(stdData: Student) {
    this.studentService.editStudent(stdData.studentId, stdData).subscribe({
      next: (response) => {
        this.isCreate.emit(false);
      },
      error: (err) => {
        console.error('Error updating student:', err);
      }
    });
  }
}
