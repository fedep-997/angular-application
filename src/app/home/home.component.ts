import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServizioService } from '../servizi/servizio.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  
  loggato = (sessionStorage || localStorage).getItem('utente')

  esci() {
    // logica di logout
    (sessionStorage && localStorage).clear();
    this.servizi.impostareGuardia(false);
    this.rotta.navigateByUrl('/accedi');
  }

  constructor(private servizi: ServizioService, private rotta: Router) {}
  ngOnInit(): void {}
}
