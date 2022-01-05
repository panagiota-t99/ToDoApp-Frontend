import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatDialog} from "@angular/material/dialog";
import {DialogComponent} from "../dialog/dialog.component";
import {DialogDeleteComponent} from "../dialog-delete/dialog-delete.component";
import {formatDate} from "@angular/common";


@Component({
  selector: 'app-home-items',
  templateUrl: './home-items.component.html',
  styleUrls: ['./home-items.component.scss']
})

export class HomeItemsComponent implements OnInit {
  private listid: any;
  public listname: any;

  displayedColumnsItems: string[] = ['itemname', 'dateCreated', 'dateModified', 'action'];
  itemSource: any;

  constructor(private router: Router, private userService: UserService, public dialog: MatDialog, public deleteDialog: MatDialog) {
  }

  ngOnInit(): void {
    this.listid = localStorage.getItem("currentListId");
    this.listname = localStorage.getItem("currentListName");
    this.getListItems();
  }

  async getListItems(): Promise<any> {
    try {
      const items = await this.userService.getItems(this.listid);
      if (items) {
        for (const item of items) {
          if (item.dateModified === null)
            item.dateModified = "-";
          else
            item.dateModified = formatDate(item.dateModified, 'dd-MM-yyyy', 'en-US');
          item.dateCreated = formatDate(item.dateCreated, 'dd-MM-yyyy', 'en-US');
        }
        this.itemSource = new MatTableDataSource<ItemElement>(items);
      }
    } catch ({message}) {
      alert(message);
    }
  }


  openDialogDeleteItem(itemsid: any, itemname: any) {
    let dialogRef = this.dialog.open(DialogDeleteComponent,
      {
        data: {
          title: "Delete item",
          text: "Are you sure you want to delete the item with name: " + itemname + " from list: " + this.listname + " ?",
          disableClose: true
        }
      });

    dialogRef.afterClosed().subscribe(async result => {
      if (result === true) //delete
      {
        try {
          let res = await this.userService.deleteItem(itemsid);
          if (res) {
            await this.getListItems();
          }
        } catch ({message}) {
          alert(message);
        }
      }
    });
  }


  openDialogItem(itemsid: any, itemname: any) {
    let dialogRef = this.dialog.open(DialogComponent, {data: {title: "Edit item name", name: itemname, action: "Update", disableClose: true}});

    dialogRef.afterClosed().subscribe(async result => {
      if (result != true) //closed by update
      {
        try {
          let res = await this.userService.updateItemName(itemsid, result, formatDate(Date.now(), 'yyyy-MM-dd', 'en-GR'));
          if (res) {
            await this.getListItems();
          }
        } catch ({message}) {
          alert(message);
        }
      }
    })
  }


  openDialogAddItem() {
    let dialogRef = this.dialog.open(DialogComponent, {data: {title: "Enter new item name", action: "Add", disableClose: true}});

    dialogRef.afterClosed().subscribe(async result => {
      if (result != true) //update
      {
        try {
          let res = await this.userService.addItem(this.listid, result);
          if (res) {
            await this.getListItems();
          }
        } catch ({message}) {
          alert(message);
        }
      }
    })
  }


  search($event: KeyboardEvent) {
    // @ts-ignore
    this.itemSource.filter = $event.target.value.toLowerCase().trim();
  }
}

export interface ItemElement {
  itemsid: number;
  itemname: string;
  dateCreated: string;
  dateModified: string;
}
