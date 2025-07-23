import { Component, OnInit } from '@angular/core';
import { SupplierService } from '../../../services/supplier.service';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

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
  Swal.fire({
    title: 'Are you sure?',
    text: 'This supplier will be permanently deleted!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
      this.supplierService.Delete(id).subscribe({
        next: (res) => {
          Swal.fire({
            icon: 'success',
            title: 'Deleted!',
            text: 'Supplier has been deleted.',
            timer: 2000,
            showConfirmButton: false
          });
          this.ngOnInit();
        },
        error: (e) => {
          console.log(e);
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'Failed to delete supplier.'
          });
          this.ngOnInit();
        },
      });
    }
  });
}

}
