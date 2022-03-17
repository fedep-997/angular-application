import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ServizioService } from '../servizi/servizio.service';
import { Utente } from '../interfacce/utente/Utente';

@Component({
  selector: 'app-accedi',
  templateUrl: './accedi.component.html',
  styleUrls: ['./accedi.component.css'],
})
export class AccediComponent implements OnInit {
  accesso: object = {
    username: '',
    mail: '',
  };

  utenti: Utente[] = [];
  vaBene: boolean = false;

  accedi(a: NgForm): void {
    var creds = a.form.value;
    this.servizi.get_utenti().subscribe((c) => (this.utenti = c));
    this.vaBene = false;
    for (var utenteRegistrato of this.utenti) {
      if (
        creds.username == utenteRegistrato.id &&
        creds.password == utenteRegistrato.password
      ) {
        this.accesso = (({ id, email }) => ({ username: id, mail: email }))(
          utenteRegistrato
        );
        this.vaBene = true;
        this.servizi.impostareGuardia(true);
        this.servizi.eseguireAccesso(
          Object.values(this.accesso)[0],
          Object.values(this.accesso)[1],
          creds.check
        );
      }
    }
  }

  constructor(private servizi: ServizioService) {}
  ngOnInit(): void {}
}
