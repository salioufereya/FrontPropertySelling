import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  NgForm,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { UserForLogin } from '../../models/user';

@Component({
  selector: 'app-user-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.css',
})
export class UserLoginComponent {
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}
  loginForm!: FormGroup;
  loggedinUser!: string;
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });
    this.loginForm.setValidators(this.passwordMatchingValidator);
  }

  passwordMatchingValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const password = control.get('password');
      const confirmPassword = control.get('confirmPassword');
      return password &&
        confirmPassword &&
        password.value === confirmPassword.value
        ? null
        : { notmatched: true };
    };
  }

  onSubmit(): void {
    this.authService.authUser(this.loginForm.value).subscribe(
      (response: UserForLogin) => {
      console.log(response);
        const user = response;
        localStorage.setItem('token', user.token);
        localStorage.setItem('user', user.userName);
        this.router.navigate(['/']); //
      }
    );
  }

  // Getters
  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }
}
