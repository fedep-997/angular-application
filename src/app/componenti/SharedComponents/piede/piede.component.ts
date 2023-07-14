import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-piede',
  templateUrl: './piede.component.html',
  styleUrls: ['./piede.component.css'],
})
export class PiedeComponent {
  @Input()
  piede: string[] = ['', ''];
}
