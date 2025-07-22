import { Component, OnInit } from '@angular/core';
import { SupplierService } from '../../../services/supplier.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-supplier-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './supplier-list.component.html',
  styleUrl: './supplier-list.component.css'
})
export class SupplierListComponent implements OnInit{
 constructor(
    private supplierService: SupplierService
  ) {}

  ngOnInit(): void {
    this.getAllProducts();
  }

  supplierList: any[] = [];

  // Get All Supplier
  getAllProducts() {
    this.supplierService.GetAll().subscribe({
      next: (res) => {
        console.log(res);
        this.supplierList = res;
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

  // Delete Supplier
  DeleteSupplier(id: any) {
    this.supplierService.Delete(id).subscribe({
      next: (res) => {
        console.log(res);
        this.ngOnInit();
      },
      error: (e) => {
        console.log(e);
        this.ngOnInit();
      },
    });
  }

}
