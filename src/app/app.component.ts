import { Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { LoginComponent } from './pages/login/login.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  faBars = faBars;

  doStuffSubscription: Observable<boolean> | any;

  isLoggedIn: boolean = false;

  options: FormGroup;

  constructor(fb: FormBuilder) {
    this.options = fb.group({
      bottom: 0,
      fixed: false,
      top: 0,
    });
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
