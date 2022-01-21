import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  fname = new FormControl('', [Validators.required]);
  lname = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required, Validators.email]);
  username = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required, Validators.minLength(5)]);

  public userForm: any;
  private formBuilder!: FormBuilder;

  constructor(private router: Router, private userService: UserService) {
  }

  ngOnInit(): void {
  }


  async registerFunction() {
    if (this.fname.status == "VALID" && this.lname.status == "VALID" &&
      this.email.status == "VALID" && this.username.status == "VALID" && this.password.status == "VALID") {
      try {
        const token = await this.userService.register(this.fname.value, this.lname.value, this.email.value, this.username.value, this.password.value);
        if (token) {
          console.log(token);
          localStorage.setItem("token", token.accessToken);

          const role = await this.userService.role();
          localStorage.setItem("role", role[0].roleid)
          localStorage.setItem("role", role[0].userid)

          if (role[0].roleid == 1)
            await this.router.navigate(['home/admin']);
          else
            await this.router.navigate(['home/user']);
        }
      } catch ({message}) {
        alert(message);
      }
    } else
      alert("Please fill out the form!")
  }

}
