import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ServizioService } from '../../servizi/servizio.service';
import { Utente } from '../../interfacce/utente/Utente';
import { Router } from '@angular/router';


@Component({
  selector: 'app-accedi',
  templateUrl: './accedi.component.html',
  styleUrls: ['./accedi.component.css'],
})
export class AccediComponent implements OnInit {
  u: object = {
    n: '',
    p: '',
    r: undefined
  };

  private utenti: Utente[] = [];
  constructor(private servizi: ServizioService, private rotta: Router) {}
  accedi(ff: NgForm): void {
    var credenziali = ff.form.value;
    this.u = {n: credenziali.username, p: credenziali.password, r: credenziali.ricorda}
    var accesso = this.servizi.login(
      this.u,
      this.utenti
    );
    if (accesso) this.rotta.navigateByUrl('/home');
  }

  ngOnInit(): void {
    this.servizi.get_utenti().subscribe((c) => (this.utenti = c));
  }
}
