import { Component, OnInit } from '@angular/core';
import { ReportService } from '../../../services/report.service';

@Component({
  selector: 'app-top-selling-product',
  standalone: true,
  imports: [],
  templateUrl: './top-selling-product.component.html',
  styleUrl: './top-selling-product.component.css'
})
export class TopSellingProductComponent implements OnInit{
constructor(
    private reportService: ReportService
  ) {}

  ngOnInit(): void {
    this.getTopSellingProduct();
  }

  productList: any[] = [];

  // Get All 
  getTopSellingProduct() {
    this.reportService.getTopSellingProduct().subscribe({
      next: (res) => {
        console.log(res);
        this.productList = res;
      },
      error: (e) => {
        console.log(e);
      },
    });
  }
}
