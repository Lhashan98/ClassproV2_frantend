import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private apiUrl = 'http://5.181.217.67:8002'; // Adjust the API URL

  constructor(private http: HttpClient) { }

  getAvailableRooms(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/rooms`);
  }

  bookRoom(bookingDetails: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/bookings`, bookingDetails);
  }

  saveBooking(bookingDetails: { room: any; date: any; startTime: any; endTime: any; }): Observable<any> {
    // Implement saving booking details here
    return this.http.post<any>(`${this.apiUrl}/bookings/save`, bookingDetails);
  }
}
