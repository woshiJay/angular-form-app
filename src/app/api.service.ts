import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// rxjs imports
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:3000/api'; // Adjust this to your backend URL

  constructor(private http: HttpClient) {}

  getIntroductions(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/introductions`);
  }

  addIntroduction(introduction: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/introductions`, introduction);
  }

  updateIntroduction(id: number, introduction: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/introductions/${id}`, introduction);
  }

  deleteIntroduction(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/introductions/${id}`);
  }
}