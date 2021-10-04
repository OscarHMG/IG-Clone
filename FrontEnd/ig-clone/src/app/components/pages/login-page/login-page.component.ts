import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent /*implements OnInit*/ {
  myControl = new FormControl();
  options: Array<User> = [];
  loginForm = this.fb.group({
    userName: [null, Validators.required],
    password: [null, Validators.required]
  });
  loading = false;
  submitted = false;
  returnUrl!: string;
  numLogs: any;
  numMaxLogs: any;
  showPassword: boolean;
  typeInput: string;
  hasUnitNumber = false;
  iconPassword: string;

constructor(
  private fb: FormBuilder,
  private route: ActivatedRoute,
  private router: Router,
  private authenticationService: AuthenticationService,
  private userService: UserService
) {
  this.typeInput = 'password';
  this.showPassword = false;
  this.iconPassword = 'visibility'; 
  // redirect to home if already logged in
  if (this.authenticationService.currentUserValue) {
    this.router.navigate(['/']);
  }
}

get f() { return this.loginForm.controls; }

ngOnInit() {
  // get return url from route parameters or default to '/'
  this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  this.getAllUsers();
}

showPwd(){
  console.log(this.showPassword);
  this.showPassword = !this.showPassword;
  if(this.showPassword){
    this.typeInput = 'text';
    this.iconPassword = 'visibility_off';
  } else {
    this.typeInput = 'password';
    this.iconPassword = 'visibility'; 
  }
}

onSubmit() {
  

  // stop here if form is invalid
  if (this.loginForm.invalid) {
      return;
  }

  this.loading = true;
  this.authenticationService.login(this.f.userName.value, this.f.password.value)
      .pipe(first())
      .subscribe(
          data => {
            this.router.navigate(['/']);
          },
          error => {
              //this.alertService.snack("Error de usuario y/o contraseña");
              this.loading = false;
          });
}


getAllUsers(){
  this.userService.getAllUsers().subscribe(data=>{
    this.options = data;
  });
}


getUser(userSelected: User){
  console.log(userSelected.username);
  this.router.navigate(['/profile'], { queryParams: { user: userSelected.id } });
}




}
