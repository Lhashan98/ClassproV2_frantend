import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CodashService {
  private apiUrl = 'http://5.181.217.67:8002';

  constructor(private http: HttpClient) { }

  codash(codashData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/findclassroom/create`, codashData);
  }

  getCourses(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/findclassroom/getAll`);
  }

  addNewCourse(codash: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/findclassroom/create`, codash);
  }
}
