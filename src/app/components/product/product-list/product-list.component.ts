import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit{
 constructor(
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.getAllProducts();
  }

  productList: any[] = [];

  // Get All Product
  getAllProducts() {
    this.productService.GetAll().subscribe({
      next: (res) => {
        console.log(res);
        this.productList = res;
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

  // Delete Product

DeleteProduct(id: any) {
  Swal.fire({
    title: 'Are you sure?',
    text: 'This product will be permanently deleted!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#6c757d',
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'Cancel'
  }).then((result) => {
    if (result.isConfirmed) {
      this.productService.Delete(id).subscribe({
        next: (res) => {
          Swal.fire('Deleted!', 'Product has been deleted.', 'success');
          this.ngOnInit();
        },
        error: (err) => {
          Swal.fire('Error!', 'Something went wrong.', 'error');
          console.error(err);
        }
      });
    }
  });
}

}
