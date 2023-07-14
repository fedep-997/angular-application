import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpzioniComponent } from './opzioni.component';

describe('OpzioniComponent', () => {
  let component: OpzioniComponent;
  let fixture: ComponentFixture<OpzioniComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpzioniComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpzioniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
