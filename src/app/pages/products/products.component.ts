import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ControlDialogComponent } from 'src/app/shared/dialog/controlDialog.component';
import { GenericService } from 'src/app/shared/generic.service';
import { ICars } from 'src/app/shared/interfaces/products/ICars';
import { IProduct } from 'src/app/shared/interfaces/products/IProduct';
import { environment } from 'src/environments/environment';

import { faClose, faCheck } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/shared/services/auth.service';
import { TableDataSource } from 'src/app/shared/classes/TableDataSource';

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

  carList: ICars[] = [];
  carTableDataSource = new TableDataSource<ICars>(this.carList);
  carTableDisplayedColumns: string[] = [
    'id',
    'name',
    'price',
    'username',
    'createdDate',
    'modifiedDate',
    'description',
  ];

  //product variables
  productCarId: string = '';
  productQuantity: string = '';

  productsList: IProduct[] = [];
  productsTableDataSource = new TableDataSource<IProduct>(this.productsList);
  productsTableDisplayedColumns: string[] = [
    'id',
    'carId',
    'carName',
    'quantity',
    'imported',
    'exported',
  ];

  constructor(
    private gService: GenericService<IProduct | ICars>,
    private dialog: MatDialog,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    //list of cars
    this.gService
      .getGeneric(environment.apiRoot + environment.carEndpoint, '')
      .subscribe({
        next: (data: any) => {
          this.carList = data.result;
          this.carList.forEach((item: any) => {
            item.createdDate = new Date(Date.parse(item.createdDate));
            item.modifiedDate = new Date(Date.parse(item.modifiedDate));
          });
          this.carTableDataSource.setData(this.carList);
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
          this.productsList = data.result;
          this.productsTableDataSource.setData(this.productsList);
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
    const carTarget = {
      id: 0,
      name: this.carName,
      price: +this.carPrice,
      image: '',
      description: this.carDescription,
      createdDate: new Date(),
      modifiedDate: new Date(),
      userId: this.authService.userId,
      userName: this.authService.username,
    } as ICars;

    //create new car
    this.gService
      .createGeneric(environment.apiRoot + environment.carEndpoint, carTarget)
      .subscribe({
        next: (data: any) => {
          this.ClearFields();

          //assign new ID
          carTarget.id = data.result.id;
          this.carList.push(carTarget);
          this.carTableDataSource.setData(this.carList);
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

  AddProduct() {
    const car = this.carList.find((x) => x.id === +this.productCarId);

    if (!car)
      this.dialog.open(ControlDialogComponent, {
        data: {
          title: 'Car not found',
          message: 'There is no car with input car id.',
        },
      });

    const productsTarget = {
      id: 0,
      quantity: +this.productQuantity,
      exported: 0,
      imported: +this.productQuantity,
      cars: car,
    } as IProduct;

    console.log(productsTarget);

    //create new product
    this.gService
      .createGeneric(
        environment.apiRoot + environment.productEndpoint,
        productsTarget
      )
      .subscribe({
        next: (data: any) => {
          this.ClearFields();

          //assign new ID
          productsTarget.id = data.result.id;
          this.productsList.push(productsTarget);
          this.productsTableDataSource.setData(this.productsList);
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

  ClearFields() {
    this.carName = '';
    this.carPrice = '0';
    this.carDescription = '';

    this.productCarId = '';
    this.productQuantity = '0';
  }
}
