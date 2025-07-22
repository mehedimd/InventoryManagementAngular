import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ProductService } from '../../../services/product.service';

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
    this.productService.Delete(id).subscribe({
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
