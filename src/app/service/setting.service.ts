import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SettingService {
  private baseUrl = 'http://localhost:8002'; // Your Node.js server URL
 

  constructor(private http: HttpClient) {}


  changePassword(currentPassword: string, newPassword: string , uname: string): Observable<any> {

    const request={
      "username": uname,
      "currentPassword": currentPassword,
      "newPassword":newPassword
  }
  console.log(request);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });


    return this.http.post(`${this.baseUrl}/change-password`, request, { headers });
  }
}



