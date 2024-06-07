import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ComumService {

  constructor(private _snackBar: MatSnackBar) {}

  openSnackBar(message: string, action: string = 'OK') {
    this._snackBar.open(message, action, {
      duration: 5000,
      verticalPosition: 'top',
    });
  }
}
