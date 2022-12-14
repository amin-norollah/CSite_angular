import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { LoginComponent } from './pages/login/login.component';
import { AuthService } from './shared/services/auth.service';

import {
  faHome,
  faBars,
  faCar,
  faUser,
  faCartShopping,
  faSignOut,
} from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
  faBars = faBars;
  faHome = faHome;
  faCar = faCar;
  faUser = faUser;
  faCartShopping = faCartShopping;
  faSignOut = faSignOut;

  doStuffSubscription: Observable<boolean> | any;

  currentRoute: string = '';
  isLoggedIn: boolean = false;

  options: FormGroup;

  constructor(
    fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.options = fb.group({
      bottom: 0,
      fixed: false,
      top: 0,
    });

    //check authorization
    this.CheckAuthentication(this.authService.isAuthenticated());

    //check authorization periodically
    setInterval(() => {
      this.CheckAuthentication(this.authService.isAuthenticated());
    }, 30 * 1000);
  }
  ngOnInit(): void {
    this.currentRoute = window.location.pathname;
  }

  // check authentication
  CheckAuthentication(auth: boolean) {
    this.isLoggedIn = auth;
    if (!auth) this.authService.Logout();
  }

  //******************************************************/
  // output handler
  // connection between app-outlet and children components
  onActivate(component: any) {
    if (component instanceof LoginComponent) {
      this.doStuffSubscription = component.isLoggedIn.subscribe(
        (x) => (this.isLoggedIn = x)
      );
    }
  }

  // unsubscribe when the component closed
  onDeactivate() {
    if (this.isLoggedIn) this.doStuffSubscription.unsubscribe();
  }
}
