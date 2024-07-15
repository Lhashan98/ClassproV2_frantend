import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewcourseService {
  private apiUrl = 'http://5.181.217.67:8002'; // Adjust the URL to your backend endpoint

  constructor(private http: HttpClient) { }

  getCourses(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/addcourse/getAll`);
  }

  addNewCourse(courseData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/addcourse/create`, courseData);
  }
}