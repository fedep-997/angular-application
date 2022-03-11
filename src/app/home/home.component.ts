import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServizioService } from '../servizi/servizio.service';
import { Un_post_tipo } from '../banca_interna/interfacciapost/Unpostfattocome';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private servizi: ServizioService, private rotta: Router) {}

  titolopagina: string = 'home';

  // impostazioni paginatore
  page: number = 1;
  pageSize: number = 10;

  accesso = sessionStorage.getItem('utente') || localStorage.getItem('utente');
  pubblicazioni: Un_post_tipo[] = [];


  ngOnInit(): void {
    // get "pubblicazioni" (non li ho chiamati post per non fare confusione)
    this.servizi.leggi_post().subscribe((c) => (this.pubblicazioni = c));
  }

  esci() {
    // logica di logout
    sessionStorage.clear();
    localStorage.clear();
    this.servizi.impostaGuardia(false);
    this.rotta.navigateByUrl('/accedi');
  }
}
