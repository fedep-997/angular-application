import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ServizioService } from '../servizi/servizio.service';
import { Utente_tipo } from '../banca_interna/struttura_utente/Utente';

@Component({
  selector: 'app-accedi',
  templateUrl: './accedi.component.html',
  styleUrls: ['./accedi.component.css'],

})
export class AccediComponent implements OnInit {
  titolopagina: string = "PICCOLO SOCIAL NETWORK";
  
  vabene: boolean = false;
  utenti: Utente_tipo[] = [];

  accesso: string = ''
  mail: string = ''

  constructor(private servizi: ServizioService) { }

  ngOnInit(): void {
    // la lista degli utenti viene confrontata con le informazioni in ingresso
    this.servizi.acquisizione_utenti().subscribe((c) => (this.utenti = c));
  }

  accedi(a: NgForm): void {
    var acc = a.form.value
    var i = 0;

    //logica di accesso
    this.vabene = false;
    for (i = 0; i < this.utenti.length; i++) {
      if ((acc.username == this.utenti[i].id) && (acc.password == this.utenti[i].password)) {
        this.accesso = this.utenti[i].id;
        this.mail = this.utenti[i].email;
        this.vabene = true;
      }
    }
    if (this.vabene) {
      // operazioni di accesso
      this.servizi.impostaGuardia(true)
      // in base al valore di "Ricorda Questo Accesso", i dati sono memorizzati in localStorage o in sessionStorage
      if (acc.check) {
        this.servizi.accessoRicorda(this.accesso, this.mail, '/home')
      } else {
        this.servizi.accessoDimentica(this.accesso, this.mail, '/home')
      }
    } 
  }

}
