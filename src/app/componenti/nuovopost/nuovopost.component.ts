import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Post } from '../../interfacce/post/Post';
import { ServizioService } from '../../servizi/servizio.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nuovopost',
  templateUrl: './nuovopost.component.html',
  styleUrls: ['./nuovopost.component.css'],
})
export class NuovopostComponent {

  pubblicazioni: Post[] = [];
  acc = sessionStorage.getItem('utente') || localStorage.getItem('utente') || '';
  informazioni = {}

  pubblicazione(f: NgForm): void {
    var ff = f.form.value
    if (ff.titolopost) {
      this.servizi
      .postarePost(this.acc, ff.form.value.titolopost, ff.form.value.testo)
      .subscribe(() => {
        window.location.reload()
      });
      this.rotta.navigateByUrl('/home');
    }
  }
  
  constructor(
    private servizi: ServizioService,
    private rotta: Router,
  ) {}
}
