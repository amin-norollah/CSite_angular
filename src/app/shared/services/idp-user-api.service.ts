import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { ControlDialogComponent } from '../dialog/controlDialog.component';
import { GenericService } from '../generic.service';
import {
  AutoWrappedList,
  AutoWrappedSingle,
} from '../interfaces/global/interfaces';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class IdpUserApiService {
  constructor(
    private genericService: GenericService<any>,
    private dialog: MatDialog,
    private _authService: AuthService
  ) {}

  /////////////////////////////////////////////
  /////////////////////////////////////////////
  // by this function you can get list of users
  // with and without details, according to the
  // asker's access(role)
  // public GetUsersAsList(
  //   withDetail: boolean = false,
  //   searchWord: string = '',
  //   pageNum: number = 1,
  //   pageSize: number = 20
  // ): Promise<(UserListWithDetail | UserListWithoutDetail)[]> {
  //   // create promise in order to follow it
  //   return new Promise((resolve, reject) => {
  //     this.genericService
  //       .getGeneric(
  //         this._authService.getAccessToken(),
  //         `${environment.idpUserAPI}/api/v1.0/Users?search=${searchWord}&page=${pageNum}&pageSize=${pageSize}&isDetailsIncluded=${withDetail}`,
  //         ''
  //       )
  //       .subscribe(
  //         (
  //           data: AutoWrappedList<UserListWithDetail | UserListWithoutDetail>
  //         ) => {
  //           resolve(data.result);
  //         },
  //         (error: AutoWrappedSingle<any>) => {
  //           this.dialog.open(DialogComponent, {
  //             data: {
  //               title: `${error.statusCode}`,
  //               message: error.message,
  //             },
  //           });
  //           reject({
  //             title: `${error.statusCode}`,
  //             message: error.message,
  //           });
  //         }
  //       );
  //   });
  // }

  // /////////////////////////////////////////////
  // /////////////////////////////////////////////
  // // getting all user_farms claims of specific user
  // public GetUserFarmClaims(
  //   userId: string,
  //   pageNum: number = 1,
  //   pageSize: number = 20
  // ): Promise<GetUserFarmClaims[]> {
  //   return new Promise((resolve, reject) => {
  //     this.genericService
  //       .getGeneric(
  //         this._authService.getAccessToken(),
  //         `${environment.idpUserAPI}/api/v1.0/Users/${userId}/UserFarmClaims?page=${pageNum}&pageSize=${pageSize}`,
  //         ''
  //       )
  //       .subscribe(
  //         (data: AutoWrappedList<GetUserFarmClaims>) => {
  //           resolve(data.result);
  //         },
  //         (error: AutoWrappedSingle<any>) => {
  //           this.dialog.open(DialogComponent, {
  //             data: {
  //               title: `${error.statusCode}`,
  //               message: error.message,
  //             },
  //           });
  //           reject({
  //             title: `${error.statusCode}`,
  //             message: error.message,
  //           });
  //         }
  //       );
  //   });
  // }

  // /////////////////////////////////////////////
  // /////////////////////////////////////////////
  // // assigning a farm and role to specific user
  // public PostUserFarmClaims(
  //   userId: string,
  //   data: PostUserFarmClaims
  // ): Promise<void> {
  //   return new Promise((resolve, reject) => {
  //     this.genericService
  //       .createGeneric(
  //         this._authService.getAccessToken(),
  //         `${environment.idpUserAPI}/api/v1.0/Users/${userId}/UserFarmClaims`,
  //         data
  //       )
  //       .subscribe(
  //         () => {
  //           resolve();
  //         },
  //         (error: AutoWrappedSingle<any>) => {
  //           this.dialog.open(DialogComponent, {
  //             data: {
  //               title: `${error.statusCode}`,
  //               message: error.message,
  //             },
  //           });
  //           reject({
  //             title: `${error.statusCode}`,
  //             message: error.message,
  //           });
  //         }
  //       );
  //   });
  // }

  // /////////////////////////////////////////////
  // /////////////////////////////////////////////
  // // updating the role of the user in the specific farm
  // public PutUserFarmClaims(
  //   userId: string,
  //   data: PostUserFarmClaims
  // ): Promise<GetUserFarmClaims | null> {
  //   return new Promise((resolve, reject) => {
  //     this.genericService
  //       .updateGeneric(
  //         this._authService.getAccessToken(),
  //         `${environment.idpUserAPI}/api/v1.0/Users/${userId}/UserFarmClaims`,
  //         data
  //       )
  //       .subscribe(
  //         (data: AutoWrappedSingle<GetUserFarmClaims>) => {
  //           resolve(data.result);
  //         },
  //         (error: AutoWrappedSingle<any>) => {
  //           this.dialog.open(DialogComponent, {
  //             data: {
  //               title: `${error.statusCode}`,
  //               message: error.message,
  //             },
  //           });
  //           reject({
  //             title: `${error.statusCode}`,
  //             message: error.message,
  //           });
  //         }
  //       );
  //   });
  // }

  // /////////////////////////////////////////////
  // /////////////////////////////////////////////
  // // delete the existing farm access from an user
  // public DeleteUserFarmClaims(userId: string, farmId: string): Promise<void> {
  //   return new Promise((resolve, reject) => {
  //     this.genericService
  //       .removeGeneric(
  //         this._authService.getAccessToken(),
  //         `${environment.idpUserAPI}/api/v1.0/Users/${userId}/UserFarmClaims?farmId=${farmId}`
  //       )
  //       .subscribe(
  //         () => {
  //           resolve();
  //         },
  //         (error: AutoWrappedSingle<any>) => {
  //           this.dialog.open(DialogComponent, {
  //             data: {
  //               title: `${error.statusCode}`,
  //               message: error.message,
  //             },
  //           });
  //           reject({
  //             title: `${error.statusCode}`,
  //             message: error.message,
  //           });
  //         }
  //       );
  //   });
  // }

  // /////////////////////////////////////////////
  // /////////////////////////////////////////////
  // // getting list of roles that can assign to farm users
  // public GetFarmRolesAsList(
  //   searchWord: string = '',
  //   pageNum: number = 1,
  //   pageSize: number = 20
  // ): Promise<GetRoles[]> {
  //   return new Promise((resolve, reject) => {
  //     this.genericService
  //       .getGeneric(
  //         this._authService.getAccessToken(),
  //         `${environment.idpUserAPI}/api/v1.0/Roles/GetFarmRolesAsList?searchText=${searchWord}&page=${pageNum}&pageSize=${pageSize}`,
  //         ''
  //       )
  //       .subscribe(
  //         (data: AutoWrappedList<GetRoles>) => {
  //           resolve(data.result);
  //         },
  //         (error: AutoWrappedSingle<any>) => {
  //           this.dialog.open(DialogComponent, {
  //             data: {
  //               title: `${error.statusCode}`,
  //               message: error.message,
  //             },
  //           });
  //           reject({
  //             title: `${error.statusCode}`,
  //             message: error.message,
  //           });
  //         }
  //       );
  //   });
  // }

  // /////////////////////////////////////////////
  // /////////////////////////////////////////////
  // // getting all roles that can be assign to back-office users
  // public GetMainRolesAsList(
  //   searchWord: string = '',
  //   pageNum: number = 1,
  //   pageSize: number = 20
  // ): Promise<GetRoles[]> {
  //   return new Promise((resolve, reject) => {
  //     this.genericService
  //       .getGeneric(
  //         this._authService.getAccessToken(),
  //         `${environment.idpUserAPI}/api/v1.0/Roles/GetMainRolesAsList?searchText=${searchWord}&page=${pageNum}&pageSize=${pageSize}`,
  //         ''
  //       )
  //       .subscribe(
  //         (data: AutoWrappedList<GetRoles>) => {
  //           resolve(data.result);
  //         },
  //         (error: AutoWrappedSingle<any>) => {
  //           this.dialog.open(DialogComponent, {
  //             data: {
  //               title: `${error.statusCode}`,
  //               message: error.message,
  //             },
  //           });
  //           reject({
  //             title: `${error.statusCode}`,
  //             message: error.message,
  //           });
  //         }
  //       );
  //   });
  // }
}
