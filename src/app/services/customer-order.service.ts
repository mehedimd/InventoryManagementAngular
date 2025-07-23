import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const baseUrl = `https://localhost:7047/api/customerOrder`;

@Injectable({
  providedIn: 'root'
})
export class CustomerOrderService {

  orderItems: any[] = [];
  constructor(private http: HttpClient) {}

    GetAll(): Observable<any[]> {
      return this.http.get<any[]>(baseUrl);
    }
  
    GetById(id: any): Observable<any> {
      return this.http.get<any>(`${baseUrl}/ ${id}`);
    }
  
    Create(data: any): Observable<any> {
      const obj = {
      ...data,
      CustomerOrderDetails: this.orderItems,
      };
      return this.http.post<any>(baseUrl, obj);
    }
  
    Update(id: any, data: any): Observable<any> {
      const obj = {
      ...data,
      CustomerOrderDetails: this.orderItems,
      };
      return this.http.put<any>(`${baseUrl}/${id}`, obj);
    }
  
    Delete(id: any): Observable<any> {
      return this.http.delete<any>(`${baseUrl}/${id}`);
    }
}
