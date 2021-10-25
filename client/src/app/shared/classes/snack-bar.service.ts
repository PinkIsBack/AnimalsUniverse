import { Injectable } from '@angular/core';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
@Injectable({
  providedIn: 'root'
})
export class SnackBar {
  constructor(private snackBar: MatSnackBar) {}
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  showError(error) {
    this.snackBar.open(error.error.message, null, {
      duration: 3500,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass : ['snackBarError']
    });
  }
  openSnackBar(message: string) {
    this.snackBar.open(message, null,{
      duration: 3500,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass : ['snackBar']
    });
  }
}
