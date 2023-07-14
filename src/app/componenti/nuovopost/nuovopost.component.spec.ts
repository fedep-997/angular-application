import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuovopostComponent } from './nuovopost.component';

describe('NuovopostComponent', () => {
  let component: NuovopostComponent;
  let fixture: ComponentFixture<NuovopostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuovopostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NuovopostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
