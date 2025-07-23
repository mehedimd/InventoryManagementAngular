import { Component, OnInit } from '@angular/core';
import { ReportService } from '../../../services/report.service';

@Component({
  selector: 'app-stock-overview',
  standalone: true,
  imports: [],
  templateUrl: './stock-overview.component.html',
  styleUrl: './stock-overview.component.css'
})
export class StockOverviewComponent implements OnInit{
constructor(
    private reportService: ReportService
  ) {}

  ngOnInit(): void {
    this.getStockOverview();
  }

  stockOverviewList: any[] = [];

  // Get All Product
  getStockOverview() {
    this.reportService.GetStockOverview().subscribe({
      next: (res) => {
        console.log(res);
        this.stockOverviewList = res;
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

}
