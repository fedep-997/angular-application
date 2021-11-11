import { Component, Input, Output, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { ServizioService } from '../servizi/servizio.service';
import { Utente_tipo } from '../banca_interna/struttura_utente/Utente';

@Component({
  selector: 'app-registrazione',
  templateUrl: './registrazione.component.html',
  styleUrls: ['./registrazione.component.css']
})

export class RegistrazioneComponent implements OnInit {
  
  titolopagina: string = 'BENVENUTO'

  utenti: Utente_tipo[] = [];

  constructor(private servizi: ServizioService) {}

  ngOnInit(): void {
    // controlla gli utenti che esistono già
    this.servizi.acquisizione_utenti().subscribe((c) => (this.utenti = c))
}

  // Validazione form (?)
  validazione(a: NgForm) {
    var ut = a.form.value
    var b = this.utenti;
    var uguali = false;

    for (var i = 0; i < b.length; i++) {
      if ((b[i].id == ut.username)||(b[i].email == ut.email)) {
        uguali = true;
      }
    }
    // non è stato trovato un utente con credenziali uguali
    if (!uguali) {this.servizi.registraUnUtente(ut.username, ut.email, ut.password).subscribe(data => {})} else {console.log('Non va bene')}
  }
}
