import {Component, Inject, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {DialogComponent} from "../dialog/dialog.component";
import {DialogDeleteComponent} from "../dialog-delete/dialog-delete.component";
import * as moment from 'moment';
import {formatDate} from "@angular/common";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})

export class HomeComponent implements OnInit {
  listSource: any;
  displayedColumnsLists = ['listid', 'listname', 'dateCreated', 'dateModified', 'action'];
  cardSource: any;

  constructor(private router: Router, private userService: UserService, public dialog: MatDialog, public deleteDialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getListsFunction();
  }


  openDialogDeleteList(listid: any, listname: any) {
    let dialogRef = this.dialog.open(DialogDeleteComponent,
      {
        data: {
          title: "Delete list",
          text: "Are you sure you want to delete the list with name: " + listname + " and id: " + listid + " ?",
          disableClose: true
        }
      });

    dialogRef.afterClosed().subscribe(async result => {
      if (result === true) //delete
      {
        try {
          let res = await this.userService.deleteList(listid);
          if (res) {
            await this.getListsFunction();
          }
        } catch ({message}) {
          alert(message);
        }
      }
    });
  }


  openDialogList(listid: any, listname: any) {
    let dialogRef = this.dialog.open(DialogComponent,
      {data: {title: "Edit list name", name: listname, action: "Update", disableClose: true}});

    dialogRef.afterClosed().subscribe(async result => {
      if (result != true) //closed by x
      {
        try {
          let res = await this.userService.updateListName(listid, result, formatDate(Date.now(), 'yyyy-MM-dd', 'en-GR'));
          if (res) {
            await this.getListsFunction();
          }
        } catch ({message}) {
          alert(message);
        }
      }
    })
  }

  openDialogAddList() {
    let dialogRef = this.dialog.open(DialogComponent,
      {data: {title: "Enter new list name", action: "Add", disableClose: true}});

    dialogRef.afterClosed().subscribe(async result => {
      if (result != true) //closed by x
      {
        try {
          let res = await this.userService.addList(result)
          if (res) {
            await this.getListsFunction();
          }
        } catch ({message}) {
          alert(message);
        }
      }
    })
  }


  async getListsFunction(): Promise<any> {
    try {
      const lists = await this.userService.getLists();
      if (lists) {
        for (const list of lists) {
          if (list.dateModified === null)
            list.dateModified = "-";
          else
            list.dateModified = formatDate(list.dateModified, 'dd-MM-yyyy', 'en-US');
          list.dateCreated = formatDate(list.dateCreated, 'dd-MM-yyyy', 'en-US');
        }
        this.listSource = new MatTableDataSource<ListElement>(lists);
        this.cardSource = this.listSource.data;
      }
    } catch ({message}) {
      alert(message);
    }
  }


  async getRecord(row: any): Promise<any> {
    try {
      localStorage.setItem("currentListId", row.listid);
      localStorage.setItem("currentListName", row.listname);
      // @ts-ignore
      if (localStorage.getItem("role") == 1)
        await this.router.navigate(['home/admin/items']);
      else
        await this.router.navigate(['home/user/items']);

    } catch (e) {}
  }

  getRecordCard(list:any){
    console.log(list);
  }

  search($event: KeyboardEvent) {
    // @ts-ignore
    this.listSource.filter = $event.target.value.toLowerCase().trim();
  }
}


export interface ListElement {
  listid: number;
  listname: string;
  dateCreated: string;
  dateModified: string;
}


