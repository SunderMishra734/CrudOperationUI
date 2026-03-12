import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Student } from '../app/models/student.model';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private stdDataSubject = new BehaviorSubject<Student | null>(null);
  isCreateAction: boolean = false;
  stddata$ = this.stdDataSubject.asObservable();

  constructor() {}

  updateStudentData(data: Student) {
    this.stdDataSubject.next(data);
  }
}
