import { Component, OnInit } from '@angular/core';
import { CustomerOrderService } from '../../../services/customer-order.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customer-order-list',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './customer-order-list.component.html',
  styleUrl: './customer-order-list.component.css'
})
export class CustomerOrderListComponent implements OnInit{

  allOrderList: any = [];
  order: any = {};
  orderItems: any = [];
  getUserRole: any;
  constructor(
    private orderService: CustomerOrderService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllCustomerOrderList();
  }

  // get all order List
  getAllCustomerOrderList() {
    this.orderService.GetAll().subscribe({
      next: (data) => {
        console.log(data);
        this.allOrderList = data;
      },
      error: (e) => {
        console.error(e);
        this.router.navigate(['/badrequest']);
      },
    });
  }
  // Delete order
  deleteOrder(id: any) {
    this.orderService.Delete(id).subscribe({
      next: (res) => {
        console.log(res);
        this.ngOnInit();
      },
      error: (e) => console.log(e),
    });
  }

  // order details
  orderDetails(id: any) {
    this.orderService.GetById(id).subscribe({
      next: (data) => {
        console.log(data);
        this.order = data;
        this.orderItems = data.customerOrderDetails;
      },
      error: (e) => console.log(e),
    });
  }
}
