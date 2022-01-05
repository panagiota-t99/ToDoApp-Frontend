import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DialogComponent} from "../dialog/dialog.component";

@Component({
  selector: 'app-dialog-user',
  templateUrl: './dialog-user.component.html',
  styleUrls: ['./dialog-user.component.scss']
})
export class DialogUserComponent implements OnInit {

  roles: any[] = [
    {value: 'Admin'},
    {value: 'User'}
  ];
  selectedValue: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private dialogRef: MatDialogRef<DialogComponent>) {
    dialogRef.disableClose = true;

    this.selectedValue = (this.roles)[data.roleid].value
  }

  ngOnInit(): void {
  }

}
