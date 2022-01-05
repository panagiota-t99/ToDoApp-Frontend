import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {UserService} from "../../services/user.service";
import {formatDate} from "@angular/common";

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss']
})
export class LogsComponent implements OnInit {

  displayedColumnsLogs!: string[];
  logSource: any;

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    let role = localStorage.getItem("role")
    if (role === '1')
      this.displayedColumnsLogs = ['logid', 'firstname', 'lastname', 'action', 'message', 'dateCreated'];
    else
      this.displayedColumnsLogs = ['logid', 'action', 'message', 'dateCreated'];

    this.getLogs(role);
  }

  async getLogs(role: any) {
    try {
      const logs = await this.userService.getLogs(role);
      if (logs) {
        for (const log of logs) {
          log.dateCreated = formatDate(log.dateCreated, 'dd-MM-yyyy hh:mm:ss', 'en-US');
        }
        this.logSource = new MatTableDataSource<LogElement>(logs);
      }
    } catch ({message}) {
      alert(message);
    }
  }

}

export interface LogElement {
  logid: number,
  firstname: string;
  lastname: string;
  action: string;
  message: string;
  dateCreated: string
}
