import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  //this function posts data to the json server using post method of the httpClientModule
  postProduct(data: any) {
    return this.http.post<any>("http://localhost:3000/productList/", data);
  }

  //this function retreive data from the json server using get method of the httpClientModule
  getProduct() {
    return this.http.get<any>("http://localhost:3000/productList/");
  }

  //this function is for updating data on the server
  putProduct(data: any, id: number) {
    return this.http.put<any>("http://localhost:3000/productList/"+id ,data);
  }

  //this function is for deleting data from the server
  deleteProduct(id: number) {
    return this.http.delete<any>("http://localhost:3000/productList/"+ id);
  }

}

