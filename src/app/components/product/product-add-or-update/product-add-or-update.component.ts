import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogModule,
} from '@angular/material/dialog';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-add-or-update',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './product-add-or-update.component.html',
  styleUrl: './product-add-or-update.component.css'
})
export class ProductAddOrUpdateComponent implements OnInit{

  productForm : any;

constructor(
    private formBuilder: FormBuilder,
    public productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createProductForm();

    let activatedRouteId = this.route.snapshot.params['id'];
    if (activatedRouteId > 0) {
      this.getEditFormValue(activatedRouteId);
      this.isEdit = true;
    }
  }

  createProductForm(){
    this.productForm = this.formBuilder.group({
      productId: [0],
      productName: ['', Validators.required],
      description: [''],
      unitPrice: [0,[Validators.required, Validators.min(1)]],
      reorderLevel: [0, Validators.required],
      stockQuantity: [0]
    });
  }


  isEdit: boolean = false;

  // for edit
  getEditFormValue(id: any) {
    this.productService.GetById(id).subscribe({
      next: (data) => {
        console.log(data);
        this.productForm.patchValue(data);
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

  // create new product or update
  CreateProduct() {
    if (this.productForm.value.productId > 0) {
      this.productService
        .Update(this.productForm.value.productId, this.productForm.value)
        .subscribe({
          next: (res) => {
            console.log(res);
            Swal.fire({
            icon: 'success',
            title: 'Product Updated',
            text: 'Product updated successfully!',
            timer: 2000,
            showConfirmButton: false
          });
            this.router.navigate(['/product']);
          },
          error: (e) => {
            console.log(e)
          Swal.fire({
            icon: 'error',
            title: 'Update Failed',
            text: 'Something went wrong while updating.'
          });
        },
        });
    } else {
      this.productService.Create(this.productForm.value).subscribe({
        next: (data) => {
           Swal.fire({
          icon: 'success',
          title: 'Product Added',
          text: 'Product added successfully!',
          timer: 2000,
          showConfirmButton: false
        });
          this.router.navigate(['/product']);
        },
        error: (e) => {
          console.log(e);
          Swal.fire({
          icon: 'error',
          title: 'Add Failed',
          text: 'Something went wrong while adding the product.'
        });
        },
      });
    }
  }

}
