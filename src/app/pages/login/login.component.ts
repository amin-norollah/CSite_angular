import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private router: Router, private authService: AuthService) {}

  async submit() {
    //send an authentication request
    if (this.form.valid) {
      await this.authService
        .LoginByPassword(
          this.form.controls['username'].value,
          this.form.controls['password'].value
        )
        .then(() => {
          this.isLoggedIn.emit(true);
          this.router.navigate(['/dashboard']);
        })
        .catch(() => {
          this.isLoggedIn.emit(false);
          this.router.navigate(['/login']);
        });
    }
  }
  @Input() error: string | null = null;

  @Output() isLoggedIn = new EventEmitter<boolean>();
}
