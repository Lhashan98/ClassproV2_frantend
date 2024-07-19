import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdditionalRequestService {
  private baseUrl = 'http://5.181.217.67:8002'; // Update with your backend API base URL

  constructor(private http: HttpClient) {}

  saveAdditionalRequest(adddetails: string): Observable<any> {
    const bodyData = { adddetails };

    return this.http.post(`${this.baseUrl}/adddetails/create`, bodyData);
  }

  // getAdditionalDetails(): Observable<any> {
  //   // Implement your logic for fetching additional details here
  //   console.log('Getting additional details');
  //   // You can return an observable with the data from your backend API if needed
  //   // Example: return this.http.get(`${this.baseUrl}/adddetails`);
  // }
}
