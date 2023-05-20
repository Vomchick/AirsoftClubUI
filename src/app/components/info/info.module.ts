import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfoComponent } from './info.component';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';

@NgModule({
  declarations: [InfoComponent],
  imports: [CommonModule, NzCardModule, NzGridModule],
  exports: [InfoComponent],
})
export class InfoModule {}
