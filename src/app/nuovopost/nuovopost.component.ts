import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Post } from '../interfacce/post/Post';
import { ServizioService } from '../servizi/servizio.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nuovopost',
  templateUrl: './nuovopost.component.html',
  styleUrls: ['./nuovopost.component.css'],
})
export class NuovopostComponent implements OnInit {
  accesso = sessionStorage.getItem('utente') || localStorage.getItem('utente');

  pubblicazioni: Post[] = [];
  acc =
    sessionStorage.getItem('utente') || localStorage.getItem('utente') || '';
  pubblicazione(b: NgForm): void {
    this.servizi
      .postarePost(this.acc, b.form.value.titolopost, b.form.value.testo)
      .subscribe(() => {});
    this.rotta.navigateByUrl('/home');
  }

  constructor(private servizi: ServizioService, private rotta: Router) {}
  ngOnInit(): void {}
}
