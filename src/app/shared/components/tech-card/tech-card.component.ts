import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Technology } from '@models/technology.model';

@Component({
  selector: 'app-tech-card',
  templateUrl: './tech-card.component.html',
  styleUrls: ['./tech-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TechCardComponent implements OnInit {
  @Input() technology: Technology;
  constructor() { }

  ngOnInit(): void {
  }
}
