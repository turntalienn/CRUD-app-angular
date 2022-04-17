import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {

  //frehnesslist is called as a loop(for) to get values for radio buttons
  freshnessList = ['Brand New', 'Second Hand', 'Refurbished'];
  productForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private api: ApiService, private dialogRef: MatDialogRef<DialogComponent>) { }

  //formControlName needs the names given to the validators for a successfull form-grouping
  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      productName: ['', Validators.required],
      category: ['', Validators.required],
      date: ['', Validators.required],
      freshness: ['', Validators.required],
      price: ['', Validators.required],
      comment: ['', Validators.required],
    });
  }

  //add product function that utilizes latest angular 13 observable type of error handling
  addProduct() {
    if (this.productForm.valid) {
      this.api.postProduct(this.productForm.value).subscribe({
        next: (res) => {
          alert("Product added successfully");
          this.productForm.reset();
          this.dialogRef.close('save');
        },
        error: () => {
          alert("Error while adding the product")
        }
      })
    }
  }
}
