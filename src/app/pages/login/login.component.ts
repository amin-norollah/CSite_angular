import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

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

  constructor(private router: Router) {}

  submit() {
    if (this.form.valid) {
      //this.submitEM.emit(this.form.value);
      this.isLoggedIn.emit(true);
      this.router.navigate(['/login']);
    }
  }
  @Input() error: string | null = null;

  @Output() isLoggedIn = new EventEmitter<boolean>();
}
