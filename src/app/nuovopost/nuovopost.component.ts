import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Un_post_tipo } from '../banca_interna/interfacciapost/Unpostfattocome';
import { ServizioService } from '../servizi/servizio.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nuovopost',
  templateUrl: './nuovopost.component.html',
  styleUrls: ['./nuovopost.component.css']
})

export class NuovopostComponent implements OnInit {

  titolopagina: string = "nuovo post";
  accesso = sessionStorage.getItem('utente') || localStorage.getItem('utente');

  pubblicazioni: Un_post_tipo[] = [];
  acc = sessionStorage.getItem('utente') || localStorage.getItem('utente') || '';

  constructor(private servizi: ServizioService,
              private rotta: Router) {}

  ngOnInit(): void {}

  pubblicazione(b: NgForm): void {
    this.servizi.postaUnPost(this.acc, b.form.value.titolopost, b.form.value.testo).subscribe(data => {})
    this.servizi.leggi_post().subscribe(a => (this.pubblicazioni = a))
    this.rotta.navigateByUrl('/home')
  }
}
