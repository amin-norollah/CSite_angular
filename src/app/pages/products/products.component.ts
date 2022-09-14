import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ControlDialogComponent } from 'src/app/shared/dialog/controlDialog.component';
import { GenericService } from 'src/app/shared/generic.service';
import { ICars } from 'src/app/shared/interfaces/products/ICars';
import { IProduct } from 'src/app/shared/interfaces/products/IProduct';
import { environment } from 'src/environments/environment';

import { faClose, faCheck } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  faClose = faClose;
  faCheck = faCheck;

  //car variables
  carName: string = '';
  carPrice: string = '';
  carDescription: string = '';

  carTarget: ICars | any;
  carList: ICars[] = [];

  //product variables
  productsTarget: IProduct | any;
  productsList: IProduct[] = [];

  constructor(
    private gService: GenericService<IProduct>,
    private dialog: MatDialog,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    //list of cars
    this.gService
      .getGeneric(environment.apiRoot + environment.carEndpoint, '')
      .subscribe({
        next: (data: any) => {
          this.productsList = data;
        },
        error: (error: any) => {
          this.dialog.open(ControlDialogComponent, {
            data: {
              title: `${error.statusCode}`,
              message: error.message,
            },
          });
        },
      });

    //list of products
    this.gService
      .getGeneric(environment.apiRoot + environment.productEndpoint, '')
      .subscribe({
        next: (data: any) => {
          this.productsList = data;
        },
        error: (error: any) => {
          this.dialog.open(ControlDialogComponent, {
            data: {
              title: `${error.statusCode}`,
              message: error.message,
            },
          });
        },
      });
  }

  AddCar() {
    this.carTarget = {
      id: 0,
      name: this.carName,
      price: this.carPrice,
      description: this.carDescription,
      createdDate: new Date(),
      modifiedDate: new Date(),
      userId: this.authService.userId,
    };

    console.log(this.carTarget);
  }
}
