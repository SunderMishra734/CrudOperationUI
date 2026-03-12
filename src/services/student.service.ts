import { Injectable } from '@angular/core';
import { Student } from '../app/models/student.model';
import { environment } from '../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  baseUrl: string = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getAllStudents(): Observable<Student[]> {
    const url = `${this.baseUrl}/Student`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.get<Student[]>(url);
  }

  addStudent(stdData: Student): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const url = `${this.baseUrl}/Student`;
    return this.http.post(url, stdData, { headers });
  }

  editStudent(id?: number | null, stdData?: Student | null): Observable<any>{
    const url = `${this.baseUrl}/Student/${id}`;
    return this.http.put<Student>(url, stdData);
  }

  deleteStudent(id: number): Observable<Student[]>{
    const url = `${this.baseUrl}/Student/${id}`;
    return this.http.delete<Student[]>(url);
  }
}
