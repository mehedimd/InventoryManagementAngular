import { Routes } from '@angular/router';
import { ProductListComponent } from './components/product/product-list/product-list.component';
import { ProductAddOrUpdateComponent } from './components/product/product-add-or-update/product-add-or-update.component';
import { SupplierListComponent } from './components/supplier/supplier-list/supplier-list.component';
import { SupplierAddOrUpdateComponent } from './components/supplier/supplier-add-or-update/supplier-add-or-update.component';
import { CustomerOrderListComponent } from './components/order/customer-order-list/customer-order-list.component';
import { CustomerOrderAddOrUpdateComponent } from './components/order/customer-order-add-or-update/customer-order-add-or-update.component';
import { StockOverviewComponent } from './components/report/stock-overview/stock-overview.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TopSellingProductComponent } from './components/report/top-selling-product/top-selling-product.component';

export const routes: Routes = [
{ path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },

  { path: 'product', component: ProductListComponent },
  { path: 'product/add', component: ProductAddOrUpdateComponent },
  { path: 'product/edit/:id', component: ProductAddOrUpdateComponent },
  
  { path: 'supplier', component: SupplierListComponent },
  { path: 'supplier/add', component: SupplierAddOrUpdateComponent },
  { path: 'supplier/edit/:id', component: SupplierAddOrUpdateComponent },

  { path: 'customer/order', component: CustomerOrderListComponent },
  { path: 'customer/order/add', component: CustomerOrderAddOrUpdateComponent },
  { path: 'customer/order/edit/:id', component: CustomerOrderAddOrUpdateComponent },

  { path: 'report/stock/overview', component: StockOverviewComponent },
  { path: 'report/top/selling/products', component: TopSellingProductComponent }
];
