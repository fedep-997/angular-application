import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ServizioService } from '../../servizi/servizio.service';
import { Utente } from '../../interfacce/utente/Utente';


@Component({
  selector: 'app-registrazione',
  templateUrl: './registrazione.component.html',
  styleUrls: ['./registrazione.component.css'],
})
export class RegistrazioneComponent {

  constructor(private servizi: ServizioService) {}
  
  validazione(a: NgForm) {
    var ut = a.form.value;
    var uguali = false;
    var utenti: Utente[] = [];
    this.servizi.get_utenti().subscribe(c => utenti = c)
    for (var i of utenti) {
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
      console.log('No');
    }
  }
}
