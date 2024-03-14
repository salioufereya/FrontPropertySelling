import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { AlertifyService } from '../../services/alertify.service';

@Component({
  selector: 'app-user-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './user-register.component.html',
  styleUrl: './user-register.component.css',
})
export class UserRegisterComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private alertify: AlertifyService
  ) {}
  registerForm!: FormGroup;
  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      confirmPassword: ['', [Validators.required]],
      mobile: ['', [Validators.required]],
    });
    this.registerForm.setValidators(this.passwordMatchingValidator);
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
    console.log(this.registerForm.value);
    this.authService.registerUser(this.registerForm.value).subscribe(
      (user) => {
        this.onReset();
        this.alertify.success('User registred');
        console.log(user);
      }
    );
  }

  onReset(): void {
    this.registerForm.reset();
  }

  // Getters
  get username() {
    return this.registerForm.get('username');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }

  get mobile() {
    return this.registerForm.get('mobile');
  }
}
