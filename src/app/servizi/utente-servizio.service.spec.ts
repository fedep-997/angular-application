import { TestBed } from '@angular/core/testing';

import { UtenteServizioService } from './utente-servizio.service';

describe('UtenteServizioService', () => {
  let service: UtenteServizioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UtenteServizioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
