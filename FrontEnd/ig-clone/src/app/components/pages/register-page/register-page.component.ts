import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css'],
})
export class RegisterPageComponent implements OnInit {
  registerForm = this.fb.group({
    userName: [null, Validators.required],
    password: [null, [Validators.required, this.checkPassword]],
    confirmPass: [null, [Validators.required, this.passwordMatcher.bind(this)]],
    names: [null, Validators.required],
    lastNames: [null, Validators.required],
    email: [null, [Validators.email, Validators.required]],
  });
  loading = false;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private _snackBar: MatSnackBar
  ) {}

  get f() { return this.registerForm.controls; }

  ngOnInit(): void {}

  onSubmit() {
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;
    let user = new User();
    user.username = this.f.userName.value;
    user.first_name = this.f.names.value;
    user.last_name = this.f.lastNames.value;
    user.email = this.f.email.value;
    user.password = this.f.password.value;
    user.is_active = true;
    user.is_superuser = false;
    user.last_login = null;
    user.groups = [];
    user.user_permissions = []
    user.date_joined = "";
    
    console.log(user);

    this.authenticationService.registerNewUser(user).subscribe(data=>{
      this._snackBar.open('Usuario registrado.','OK');
      this.loading = false;
      this.router.navigate(['/login']);
    }, 
    err=>{
      this._snackBar.open('Ocurrio un error en el registro del nuevo usuario','OK');
      this.loading = false;
      console.log(err);
    });
  }

  getErrorPassword() {
    return this.registerForm.get('password')?.hasError('required')
      ? '* Este campo es requerido(al menos 8 caracteres, al menos una mayuscula y un numero)'
      : this.registerForm.get('password')?.hasError('requirements')
      ? 'Contrasena necesita tener al menos 8 caracteres, al menos una mayuscula y un numero'
      : '';
  }

  checkPassword(control: FormControl) {
    let enteredPassword = control.value;
    let passwordCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
    return !passwordCheck.test(enteredPassword) && enteredPassword
      ? { requirements: true }
      : null;
  }

  // confirm new password validator
  passwordMatcher(control: FormControl) {
    if (
      this.registerForm &&
      control.value !== this.registerForm.controls.password.value
    ) {
      return { passwordNotMatch: true };
    }
    return null;
  }
}
