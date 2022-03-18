import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-testa',
  templateUrl: './testa.component.html',
  styleUrls: ['./testa.component.css'],
})
export class TestaComponent implements OnInit {
  accesso = sessionStorage.getItem('utente') || localStorage.getItem('utente');

  @Input()
  header: string = '';

  constructor(private rotta: Router) {}
  ngOnInit(): void {
    if (this.rotta.url == '/accedi') this.accesso = ''
  }
}
