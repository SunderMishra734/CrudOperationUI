import { Component, EventEmitter, Output } from '@angular/core';
import { Student } from '../../app/models/student.model';
import { StudentService } from '../../services/student.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-students-list-page',
  standalone: true,
  imports: [HttpClientModule, CommonModule],
  templateUrl: './students-list-page.component.html',
  styleUrl: './students-list-page.component.css',
  providers: [StudentService]
})

export class StudentsListPageComponent {
  students: Student[] = [];
  loading: boolean = true;
  @Output() isCreatePage = new EventEmitter<boolean>();
  @Output() showToaster = new EventEmitter<number>();
  // Pagination properties
  currentPage: number = 1;
  pageSize: number = 10;
  totalPages: number = 1;
  totalEntries?: number;

  constructor(private studentService: StudentService, private sharedService: SharedService) { }

  ngOnInit(): void {
    this.fetchStudents();
  }

  fetchStudents() {
    this.loading = true;
    this.studentService.getAllStudents().subscribe({
      next: (data) => {
        this.students = data;
        this.totalEntries = this.students.length;
        this.totalPages = Math.ceil(this.students.length / this.pageSize);
        this.loading = false;
      },
      error: (error) => {
        this.loading = false;
      },
      complete: () => { }
    });
  }

  // Pagination methods
  get paginatedStudents(): Student[] {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    return this.students.slice(start, end);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  getPagesAroundCurrent(): number[] {
    const range: number[] = [];
    const start = Math.max(2, this.currentPage - 2); // Start at least from page 2
    const end = Math.min(this.totalPages - 1, this.currentPage + 2); // End before the last page
    for (let i = start; i <= end; i++) {
      range.push(i);
    }
    return range;
  }

  editFn(stdData: Student) {
    this.sharedService.isCreateAction = false;
    this.sharedService.updateStudentData(stdData);
    this.isCreatePage.emit(true);
  }

  deleteStudentFn(stdData: Student) {
    this.studentService.deleteStudent(stdData.studentId).subscribe({
      next: (data) => {
        this.showToaster.emit(2);
        this.students = data;
      },
      error: (err) => {
        console.error('Error deleting student:', err);
      }
    });
  }
}
