import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-home-navigation-admin',
  templateUrl: './home-navigation-admin.component.html',
  styleUrls: ['./home-navigation-admin.component.scss']
})
export class HomeNavigationAdminComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  async logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("currentListId");
    localStorage.removeItem("currentListName");
    localStorage.removeItem("role");
    localStorage.removeItem("id");
    await this.router.navigate(['/']);
  }
}
