import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ServizioService } from '../servizi/servizio.service';
import { Utente } from '../interfacce/utente/Utente';

@Component({
  selector: 'app-registrazione',
  templateUrl: './registrazione.component.html',
  styleUrls: ['./registrazione.component.css'],
})
export class RegistrazioneComponent implements OnInit {

  utenti: Utente[] = [];

  validazione(a: NgForm) {
    var ut = a.form.value;
    var uguali = false;

    for (var i of this.utenti) {
      if (i.id == ut.username || i.email == ut.email) {
        uguali = true;
      }
    }
    // non è stato trovato un utente con credenziali uguali
    if (!uguali) {
      this.servizi
        .registrareUtente(ut.username, ut.email, ut.password)
        .subscribe(() => {});
        a.form.reset()
    } else {
      console.log('Non va bene');
    }
  }
  
  constructor(private servizi: ServizioService) {}
  ngOnInit(): void {
    this.servizi.get_utenti().subscribe((c) => (this.utenti = c));
  }
  
  // Validazione form (?)
}
