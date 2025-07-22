import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const baseUrl = `https://localhost:7047/api/supplier`;

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

   constructor(private http: HttpClient) {}

  GetAll(): Observable<any[]> {
    return this.http.get<any[]>(baseUrl);
  }

  GetById(id: any): Observable<any> {
    return this.http.get<any>(`${baseUrl}/ ${id}`);
  }

  Create(data: any): Observable<any> {
    return this.http.post<any>(baseUrl, data);
  }

  Update(id: any, data: any): Observable<any> {
    return this.http.put<any>(`${baseUrl}/${id}`, data);
  }

  Delete(id: any): Observable<any> {
    return this.http.delete<any>(`${baseUrl}/${id}`);
  }
}
