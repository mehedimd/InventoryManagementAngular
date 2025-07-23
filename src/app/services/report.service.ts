import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const baseUrl = `https://localhost:7047/api/report`;

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private http: HttpClient) {}

  GetStockOverview(): Observable<any[]> {
    return this.http.get<any[]>(`${baseUrl}/stock/overview`);
  }

  getTopSellingProduct(): Observable<any[]> {
    return this.http.get<any[]>(`${baseUrl}/top/selling/products/5`);
  }
}
