import { Component, Inject, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { CustomerOrderService } from '../../../services/customer-order.service';
import { ProductService } from '../../../services/product.service';

import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatDialogClose } from '@angular/material/dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-customer-order-item',
  standalone: true,
  imports: [FormsModule,MatDialogClose,ReactiveFormsModule],
  templateUrl: './customer-order-item.component.html',
  styleUrl: './customer-order-item.component.css'
})
export class CustomerOrderItemComponent implements OnInit{

  orderItemForm: any ;

  allProducts: any = [];
  stockQuantity: number = 0;

  constructor(
    private orderService: CustomerOrderService,
    private productService: ProductService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<CustomerOrderItemComponent>,
    private formBuilder: FormBuilder
  ) {}
  ngOnInit(): void {
    this.orderItemCreateForm();
    // all product get
    this.getAllProduct();

      if (this.data.itemIndex != null) {
      this.orderItemForm.patchValue(
        this.orderService.orderItems[this.data.itemIndex]
      );
    }
  }

  /// all product retrive
  getAllProduct() {
    this.productService.GetAll().subscribe({
      next: (data) => {
        console.log(data);
        this.allProducts = data;
        if (this.data.itemIndex != null) {
        const productId = this.orderService.orderItems[this.data.itemIndex].productId;
        const matchedProduct = this.allProducts.find((p : any) => p.productId == productId);
        if (matchedProduct) {
          this.stockQuantity = matchedProduct.stockQuantity;
        }
      }
      },
      error: (e) => console.log(e),
    });
  }

  // price update
  updatePrice(e: any) {
    if (e.target.selectedIndex != 0) {
      this.orderItemForm.patchValue({
        unitPrice: this.allProducts[e.target.selectedIndex - 1].unitPrice,
        productName: this.allProducts[e.target.selectedIndex - 1].productName,
        reorderLevel : this.allProducts[e.target.selectedIndex - 1].reorderLevel
      });
      this.stockQuantity = this.allProducts[e.target.selectedIndex - 1].stockQuantity;
      // update total
      this.updateTotal();
    } else {
      this.orderItemForm.patchValue({
        price: 0,
        productName: '',
      });

      this.stockQuantity = 0;
      // update total
      this.updateTotal();
    }
  }
  // update Total
  updateTotal() {
    this.orderItemForm.patchValue({
      subTotal: this.orderItemForm.value.unitPrice * this.orderItemForm.value.quantity,
    });
  }

  // add order item
  addOrderItem() {

    if (this.orderItemForm.value.quantity > this.stockQuantity) {
      Swal.fire({
        icon: 'error',
        title: '❌ Insufficient Stock',
        text: `Not enough stock available for this product. Only ${this.stockQuantity} in stock.`,
        confirmButtonText: 'OK',
      });
      return;
    }

    if (this.stockQuantity < this.orderItemForm.value.reorderLevel) {
      Swal.fire({
        icon: 'warning',
        title: '⚠️ Low Stock Warning',
        text: 'This product has reached its reorder level. Do you want to proceed?',
        showCancelButton: true,
        confirmButtonText: 'Proceed',
        cancelButtonText: 'Cancel',
      }).then((result) => {
        if (result.isConfirmed) {
 
          if (this.data.itemIndex == null) {
            this.orderService.orderItems.push(this.orderItemForm.value);
          } else {
            this.orderService.orderItems[this.data.itemIndex] = this.orderItemForm.value;
          }
          this.dialogRef.close();
        }

      });
    } else {

      if (this.data.itemIndex == null) {
        this.orderService.orderItems.push(this.orderItemForm.value);
      } else {
        this.orderService.orderItems[this.data.itemIndex] = this.orderItemForm.value;
      }
      this.dialogRef.close();
    }
  }

  orderItemCreateForm(){
  this.orderItemForm = this.formBuilder.group({
    id: [0],
    productId: ['', [Validators.required]],
    customerOrderId: [this.data.customerOrderId],
    unitPrice: [0],
    quantity: [0, [Validators.required, Validators.min(1)]],
    subTotal: [0],
    stockQuantity: [0],
    reorderLevel: [0]
  });
  }
}
