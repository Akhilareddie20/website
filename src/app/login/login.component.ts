import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoginMode = true;
  loginForm: FormGroup;
  registerForm: FormGroup;

  passwordCriteria = {
    minLength: false,
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumber: false,
    hasSpecialChar: false
  };

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.registerForm.get('password')?.valueChanges.subscribe(value => {
      this.passwordCriteria.minLength = value.length >= 12;
      this.passwordCriteria.hasUpperCase = /[A-Z]/.test(value);
      this.passwordCriteria.hasLowerCase = /[a-z]/.test(value);
      this.passwordCriteria.hasNumber = /\d/.test(value);
      this.passwordCriteria.hasSpecialChar = /[\W_]/.test(value);
    });
  }
  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
  }
  onLogin() {
    if (this.loginForm.invalid) return;
    const { email, password } = this.loginForm.value;
    this.auth.getAllUsers().subscribe(users => {
      const matched = users.find((u: any) => u.email === email && u.password === password);
      if (matched) {
        alert('✅ Login successful');
        this.router.navigate(['/desktop']);
       
        this.auth.setUserEmail(email);
        alert(email);
        
      } else {
        alert('❌ Invalid credentials');
      }
    });
  }
  onRegister() {
    if (this.registerForm.invalid) return;
    this.auth.register(this.registerForm.value).subscribe(() => {
      alert('✅ Registered successfully');
      this.toggleMode();
    });
  }
}
