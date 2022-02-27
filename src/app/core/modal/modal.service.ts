import { ComponentType } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(
    private dialog: MatDialog
  ) { }

  openDialog(component: ComponentType<any>, data?: any) {
    let dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    if (data)
      dialogConfig = {
        ...dialogConfig,
        ...data
      }
    return this.dialog.open(component, dialogConfig);
}
}
