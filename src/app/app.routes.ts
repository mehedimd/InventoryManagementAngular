import { Routes } from '@angular/router';
import { ProductListComponent } from './components/product/product-list/product-list.component';
import { ProductAddOrUpdateComponent } from './components/product/product-add-or-update/product-add-or-update.component';

export const routes: Routes = [
{ path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: ProductListComponent },
  { path: 'product', component: ProductListComponent },
  { path: 'product/add', component: ProductAddOrUpdateComponent },
  { path: 'product/edit/:id', component: ProductAddOrUpdateComponent },
];
