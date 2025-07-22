import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { SupplierService } from '../../../services/supplier.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-supplier-add-or-update',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './supplier-add-or-update.component.html',
  styleUrl: './supplier-add-or-update.component.css'
})
export class SupplierAddOrUpdateComponent implements OnInit{

  supplierForm : any;

constructor(
    private formBuilder: FormBuilder,
    public supplierService: SupplierService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createSupplierForm();

    let activatedRouteId = this.route.snapshot.params['id'];
    if (activatedRouteId > 0) {
      this.getEditFormValue(activatedRouteId);
      this.isEdit = true;
    }
  }

  createSupplierForm(){
    this.supplierForm = this.formBuilder.group({
      supplierId: [0],
      supplierName: ['', Validators.required],
      phone: ['', Validators.required],
      address: ['',Validators.required]
    });
  }


  isEdit: boolean = false;

  // for edit
  getEditFormValue(id: any) {
    this.supplierService.GetById(id).subscribe({
      next: (data) => {
        console.log(data);
        this.supplierForm.patchValue(data);
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

  // create new supplier or update
  CreateSupplier() {
    if (this.supplierForm.value.supplierId > 0) {
      this.supplierService
        .Update(this.supplierForm.value.supplierId, this.supplierForm.value)
        .subscribe({
          next: (res) => {
            console.log(res);
            this.router.navigate(['/supplier']);
          },
          error: (e) => console.log(e),
        });
    } else {
      this.supplierService.Create(this.supplierForm.value).subscribe({
        next: (data) => {
          console.log(data);
          this.router.navigate(['/supplier']);
        },
        error: (e) => {
          console.log(e);
        },
      });
    }
  }

}
