import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { ApiService } from './services/api.service';
import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'CRUD-app-angular-material';
  
  //make sure the elements inside displayedColoumns match the exact name in the api call  
  displayedColumns: string[] = ['productName', 'category', 'date', 'price', 'freshness', 'comment', 'action'];
  dataSource !: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog, private api: ApiService) {

  }

  ngOnInit(): void {
    this.getAllProducts();
  }
  openDialog() {
    this.dialog.open(DialogComponent, {
    }).afterClosed().subscribe(val=> {
      if(val === 'save') {
        this.getAllProducts();
      }
    })
  }

  //this method helps get the product data from the http get call
  getAllProducts() {
    this.api.getProduct()
      .subscribe({
        next: (res) => {
          this.dataSource = new MatTableDataSource(res); //declared in the viewChils above
          this.dataSource.paginator = this.paginator; //declared in the viewChils above
          this.dataSource.sort = this.sort; //declared in the viewChils above
        },
        error: (err) => {
          alert("error while fetching the data")
        }
      })
  }

  //this method allows editing of the existing data
  editProduct(row: any) {
    this.dialog.open(DialogComponent, {
      width: '30%',
      data:row
    }).afterClosed().subscribe(val=> {
      if(val==='update'){
        this.getAllProducts();
      }
    })
  }
  
  //this method allows us to delete the items from the server
  deleteProduct(id: number) {
    this.api.deleteProduct(id)
    .subscribe({
      next: (res) => {
        alert("Product Deleted Successfully");
        this.getAllProducts();
      },
      error: () => {
        alert("Error while deleting the product")
      }
    })
  }
  
  //this method helps us filter the table data
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
