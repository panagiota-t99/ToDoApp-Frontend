import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {UserService} from "../../services/user.service";
import {MatDialog} from "@angular/material/dialog";
import {DialogUserComponent} from "../dialog-user/dialog-user.component";
import {DialogDeleteComponent} from "../dialog-delete/dialog-delete.component";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  displayedColumnsUsers: string[] = ['id', 'firstname', 'lastname', 'email', 'username', 'roleid', 'action'];
  userSource: any;
  cardSource: any;
  userid: any;

  constructor(private userService: UserService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getUsers();
    this.userid = localStorage.getItem("id");
  }

  private async getUsers() {
    try {
      const users = await this.userService.getUsers();
      if (users) {
        for (const user of users) {
          if (user.roleid == 1)
            user.roleid = "Admin";
          else
            user.roleid = "User";
        }
      }
      this.userSource = new MatTableDataSource<UserElement>(users);
      this.cardSource = this.userSource.data;
    } catch ({message}) {
      alert(message);
    }
  }


  editUserDialog(userid: any, firstname: any, lastname: any, email: any, username: any, roleid: any) {
    if (roleid == 'Admin')
      roleid = 0;
    else
      roleid = 1;

    let dialogRef = this.dialog.open(DialogUserComponent,
      {data: {firstname: firstname, lastname: lastname, email: email, username: username, roleid: roleid}});

    dialogRef.afterClosed().subscribe(async result => {
      if (result != true) {
        try {
          if (result[1] == 'Admin')
            roleid = 1;
          else
            roleid = 2;

          let res = await this.userService.updateUser(result[0].firstname, result[0].lastname,
            result[0].email, result[0].username, roleid, userid);
          if (res) {
            await this.getUsers();
          }
        } catch ({message}) {
          alert(message);
        }
      }
    });
  }


  deleteUserDialog(id: number) {
    let dialogRef = this.dialog.open(DialogDeleteComponent,
      {data: {title: "Delete user", text: "Are you sure you want to delete user with id: " + id + "?"}});

    dialogRef.afterClosed().subscribe(async result => {
      if (result === true) //delete
      {
        try {
          let res = await this.userService.deleteUser(id);
          if (res) {
            await this.getUsers();
          }
        } catch ({message}) {
          alert(message);
        }
      }
    });
  }

}

export interface UserElement {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  username: string;
  roleid: any;
}
