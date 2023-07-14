import { Component } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { ServizioService } from '../../servizi/servizio.service';
import { Store } from '@ngrx/store';
import { login } from '../accedi/accedi.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {

  constructor(
    private servizi: ServizioService,
    private rotta: Router
  ) {
    rotta.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        if (event.navigationTrigger === 'popstate' && event.url == '/accedi') {
          this.esci();
        }
      }
    });

  }
  esci() {
    this.servizi.logout()
    this.rotta.navigateByUrl('/accedi');
  }
}
