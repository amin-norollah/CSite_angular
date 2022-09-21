import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ControlDialogComponent } from 'src/app/shared/dialog/controlDialog.component';
import { GenericService } from 'src/app/shared/generic.service';
import { ICars } from 'src/app/shared/interfaces/products/ICars';
import { IProduct } from 'src/app/shared/interfaces/products/IProduct';
import { environment } from 'src/environments/environment';

import { faClose, faCheck, faTrash } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/shared/services/auth.service';
import { TableDataSource } from 'src/app/shared/classes/TableDataSource';
import { IGenericDialogData } from 'src/app/shared/interfaces/global/dialog';
import { GenericDialogComponent } from 'src/app/shared/dialog/GenericDialog.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  faClose = faClose;
  faCheck = faCheck;
  faTrash = faTrash;

  //car variables
  carList: ICars[] = [];
  carTableDataSource = new TableDataSource<ICars>(this.carList);
  carTableDisplayedColumns: string[] = [
    'control',
    'id',
    'name',
    'price',
    'username',
    'createdDate',
    'modifiedDate',
    'description',
  ];

  //product variables
  productsList: IProduct[] = [];
  productsTableDataSource = new TableDataSource<IProduct>(this.productsList);
  productsTableDisplayedColumns: string[] = [
    'control',
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
          this.productsList.forEach((item: any) => {
            item.cars = this.carList.filter((x) => x.id === item.carsId);
          });
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

  /////////////////////////////////////////////////////////////////
  // add and remove cars
  AddCar() {
    const dialogRef = this.dialog.open(GenericDialogComponent, {
      data: {
        title: 'Add new car',
        inputs: [
          ['Name', 'text'],
          ['Price', 'number'],
        ],
        textarea: 'Description',
      } as IGenericDialogData,
    });

    //on closing dialog
    dialogRef.afterClosed().subscribe((dialogData) => {
      if (!dialogData) return;

      const carTarget = {
        id: 0,
        name: dialogData.inputs[0],
        price: +dialogData.inputs[1],
        image: '',
        description: dialogData.textarea,
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
    });
  }

  RemoveCarItem(id: number) {
    this.gService
      .removeGeneric(environment.apiRoot + environment.carEndpoint + `/${id}`)
      .subscribe({
        next: () => {
          this.carList = this.carList.filter((ele) => ele.id !== id);
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

  /////////////////////////////////////////////////////////////////
  // add and remove products
  AddProduct() {
    const dialogRef = this.dialog.open(GenericDialogComponent, {
      data: {
        title: 'Add new car',
        inputs: [
          ['Car ID', 'number'],
          ['Initial quantity', 'number'],
        ],
        textarea: '',
      } as IGenericDialogData,
    });

    //on closing dialog
    dialogRef.afterClosed().subscribe((dialogData) => {
      if (!dialogData) return;

      const car = this.carList.find((x) => x.id === +dialogData.inputs[0]);

      if (!car) {
        this.dialog.open(ControlDialogComponent, {
          data: {
            title: 'Car not found',
            message: `There is no car with input car id '${dialogData.inputs[0]}'.`,
          },
        });
        return;
      }

      const productsTarget = {
        id: 0,
        quantity: +dialogData.inputs[1],
        exported: 0,
        imported: +dialogData.inputs[1],
        carsId: +dialogData.inputs[0],
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
    });
  }

  RemoveProductItem(id: number) {
    this.gService
      .removeGeneric(environment.apiRoot + environment.carEndpoint + `/${id}`)
      .subscribe({
        next: () => {
          this.productsList = this.productsList.filter((ele) => ele.id !== id);
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
}
