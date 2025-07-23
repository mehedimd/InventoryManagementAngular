import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogModule,
} from '@angular/material/dialog';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CustomerOrderService } from '../../../services/customer-order.service';
import { CustomerOrderItemComponent } from '../customer-order-item/customer-order-item.component';

@Component({
  selector: 'app-customer-order-add-or-update',
  standalone: true,
  imports: [MatDialogModule,FormsModule,RouterLink,ReactiveFormsModule],
  templateUrl: './customer-order-add-or-update.component.html',
  styleUrl: './customer-order-add-or-update.component.css'
})
export class CustomerOrderAddOrUpdateComponent {
  orderForm: any;

  isEdit: boolean = false;
  activeRouteId: any;

  constructor(
    private dialog: MatDialog,
    public orderService: CustomerOrderService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}
  ngOnInit(): void {
    // reset order form
    this.resetOrderForm();
    // for edit  get id by snapshot route
    this.activeRouteId = this.route.snapshot.params['id'];

    if (this.activeRouteId > 0){
      this.isEdit = true;
      this.getEditFormValue();
    }
  }

  // for edit patch value to form
  getEditFormValue() {
      this.orderService.GetById(this.activeRouteId).subscribe({
        next: (res) => {
          console.log(res);
          this.orderForm.patchValue(res);
          this.orderService.orderItems = res.customerOrderDetails;
        },
        error: (e) => console.error(e),
      });
  }

  //orderItem order Item dialog popup
  addOrEditItems(itemIndex: any) {
    let customerOrderId = this.orderForm.value.customerOrderId;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = '40%';
    dialogConfig.data = { itemIndex, customerOrderId };
    this.dialog
      .open(CustomerOrderItemComponent, dialogConfig)
      .afterClosed()
      .subscribe({
        next: (res) => this.updateGrandTotal(),
      });
  }
  // remove orderItems in orderList
  removeItems(index: any) {
    console.log(index);
    this.orderService.orderItems.splice(index, 1);
    this.updateGrandTotal();
  }
  // update Grand Total
  updateGrandTotal() {
    this.orderForm.patchValue({
      totalAmount: this.orderService.orderItems.reduce((prev, current) => {
        return prev + current.subTotal;
      }, 0),
    });
  }


  // Create Order
  createOrder() {
    if (this.orderService.orderItems.length == 0) {
      alert('Please Order At Least 1 Item!');
    } else {
      if (this.orderForm.value.customerOrderId > 0) {
        this.orderService
          .Update(this.orderForm.value.customerOrderId, this.orderForm.value)
          .subscribe({
            next: (res) => {
              console.log(res);
              this.router.navigate(['/customer/order']);
              this.resetOrderForm();
            },
            error: (e) => {
              console.log(e);
              alert(e.error.message);
            },
          });
      } else {
        this.orderService.Create(this.orderForm.value).subscribe({
          next: (res) => {
            console.log(res);
            this.router.navigate(['/customer/order']);
            this.resetOrderForm();
          },
          error: (e) => {
              console.log(e);
              alert(e.error.message);
          },
        });
      }
    }
  }

  // reset all input
  resetOrderForm() {
    this.orderForm = this.formBuilder.group({
    customerOrderId: [0],
    orderNo: (10000 + Math.floor(Math.random() * 1000 + 500)).toString(),
    customerName: ['', Validators.required],
    phone: ['', Validators.required],
    address: ['', Validators.required],
    orderDate: [new Date().toISOString().slice(0, 10)],
    totalAmount: [0]
  });
  this.orderService.orderItems = [];
  }
}
