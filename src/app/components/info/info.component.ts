import { Component, Input } from '@angular/core';
import { InfoModel } from 'src/app/models/info.model';

@Component({
  selector: 'info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css'],
})
export class InfoComponent {
  @Input() info!: InfoModel;
}
