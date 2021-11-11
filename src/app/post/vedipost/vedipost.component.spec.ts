import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VedipostComponent } from './vedipost.component';

describe('VedipostComponent', () => {
  let component: VedipostComponent;
  let fixture: ComponentFixture<VedipostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VedipostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VedipostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
