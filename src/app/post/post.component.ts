import { Component, Input, NgModule, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ServizioService } from '../servizi/servizio.service';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
     
  quelloDaLeggere: any;
  risultato: any;

  constructor(private servizi: ServizioService) {}

  ngOnInit(): void {
    // Il parametro del post da leggere viene passato attraverso lo storage
    this.quelloDaLeggere = sessionStorage.getItem('postinlettura')
    // Orribile
    this.risultato = this.quelloDaLeggere[5]
  }
}
