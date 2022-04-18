import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  //frehnesslist is called as a loop(for) to get values for radio buttons
  freshnessList = ['Brand New', 'Second Hand', 'Refurbished'];
  productForm !: FormGroup;
  actionBtn: string = "Save";

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<DialogComponent>
  ) { }

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

    //this conditional make sure that the editData is patched to the edit dialogue
    if (this.editData) {
      this.actionBtn = 'Update'; //changes the action button on dialogue to update from save
      this.productForm.controls['productName'].setValue(
        this.editData.productName
      );
      this.productForm.controls['category'].setValue(this.editData.category);
      this.productForm.controls['freshness'].setValue(this.editData.freshness);
      this.productForm.controls['comment'].setValue(this.editData.comment);
      this.productForm.controls['price'].setValue(this.editData.price);
      this.productForm.controls['date'].setValue(this.editData.date);
    }
  }

  //add product function that utilizes latest angular 13 observable type of error handling
  addProduct() {
    if (!this.editData) {
      if (this.productForm.valid) {
        this.api.postProduct(this.productForm.value).subscribe({
          next: (res) => {
            alert('Product added successfully');
            this.productForm.reset();
            this.dialogRef.close('save');
          },
          error: () => {
            alert('Error while adding the product');
          }
        })
      }
    }else{
      this.updateProduct()
    }
  }
  
  //this method updates the product info after editing
  updateProduct() {
    this.api.putProduct(this.productForm.value, this.editData.id)
    .subscribe({
      next:(res) => {
        alert("Product updated successfully");
        this.productForm.reset();
        this.dialogRef.close('update') //when the dialog is closed the data is updated on the table
      },
      error:() => {
        alert("Error while updating the record");
      }
    })
  }

}
