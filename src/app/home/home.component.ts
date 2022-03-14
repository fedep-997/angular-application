import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServizioService } from '../servizi/servizio.service';
import { Un_post_tipo } from '../interfacce/interfacciapost/Unpostfattocome';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  
  titolopagina: string = 'home';
  accesso = sessionStorage.getItem('utente') || localStorage.getItem('utente');

  esci() {
    // logica di logout
    sessionStorage.clear();
    localStorage.clear();
    this.servizi.impostaGuardia(false);
    this.rotta.navigateByUrl('/accedi');
  }

  constructor(private servizi: ServizioService, private rotta: Router) {}
  ngOnInit(): void {}
}
