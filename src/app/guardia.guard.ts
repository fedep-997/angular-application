import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ServizioService } from './servizi/servizio.service';

@Injectable({
  providedIn: 'root'
})
export class GuardiaGuard implements CanActivate {
  statoAcc: any;
  constructor(private servizi: ServizioService) { }
  canActivate(): boolean {
    this.servizi.statodiaccesso.subscribe(c => this.statoAcc = c)
    return this.statoAcc
  }
}
