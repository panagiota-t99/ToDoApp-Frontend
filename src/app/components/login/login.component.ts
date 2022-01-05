import {Component, OnInit} from '@angular/core';
import {User} from "../../models/Users";
import {FormControl, Validators} from "@angular/forms";
import {UserService} from '../../services/user.service';
import {Router} from "@angular/router";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginUser: User = {};
  hide = true;

  username = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);

  constructor(private router: Router, private userService: UserService) {
  }

  ngOnInit(): void {
  }


  async loginFunction(): Promise<any> {
    if (this.username.status == "VALID" && this.password.status == "VALID") {
      try {
        const token = await this.userService.login(this.username.value, this.password.value);
        if (token) {
          localStorage.setItem("token", token.accessToken);
          await this.getRole();
        }
      } catch ({message}) {
        alert(message);
      }
    } else
      alert("Please fill in the form!");
  }


  private async getRole() {
    const role = await this.userService.role();
    console.log(role[0].roleid);
    localStorage.setItem("role", role[0].roleid);
    localStorage.setItem("id", role[0].userid);
    if (role[0].roleid == 1)
      await this.router.navigate(['home/admin']);
    else
      await this.router.navigate(['home/user']);
  }
}
