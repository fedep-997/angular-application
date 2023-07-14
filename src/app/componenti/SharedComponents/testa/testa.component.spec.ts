import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestaComponent } from './testa.component';

describe('TestaComponent', () => {
  let component: TestaComponent;
  let fixture: ComponentFixture<TestaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
