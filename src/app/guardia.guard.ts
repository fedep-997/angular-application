import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ServizioService } from './servizi/servizio.service';

@Injectable({
  providedIn: 'root'
})
export class GuardiaGuard implements CanActivate {
  st: any;
  constructor(private servizi: ServizioService) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    this.servizi.statodiaccesso.subscribe(c => this.st = c)
    return this.st
  }
}
