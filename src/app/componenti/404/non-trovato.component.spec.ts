import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NonTrovatoComponent } from './non-trovato.component';

describe('NonTrovatoComponent', () => {
  let component: NonTrovatoComponent;
  let fixture: ComponentFixture<NonTrovatoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NonTrovatoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NonTrovatoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
