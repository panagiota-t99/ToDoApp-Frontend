import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DialogComponent} from "../dialog/dialog.component";

@Component({
  selector: 'app-dialog-delete',
  templateUrl: './dialog-delete.component.html',
  styleUrls: ['./dialog-delete.component.scss']
})
export class DialogDeleteComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private dialogRef: MatDialogRef<DialogComponent>) {
    dialogRef.disableClose = true;
  }

  ngOnInit(): void {
  }

}
