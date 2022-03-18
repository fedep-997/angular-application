import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profilo',
  templateUrl: './profilo.component.html',
  styleUrls: ['./profilo.component.css'],
})
export class ProfiloComponent implements OnInit {
  
  profilo: string = this.rotta.url.slice(9)
  accesso = (sessionStorage || localStorage).getItem('utente');
  
  constructor(private rotta: Router) {}
  ngOnInit(): void {}
}
