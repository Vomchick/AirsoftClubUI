import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzBackTopModule } from 'ng-zorro-antd/back-top';
import { NewsComponent } from './news.component';
import { InfoModule } from 'src/app/components/info/info.module';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzGridModule } from 'ng-zorro-antd/grid';

@NgModule({
  declarations: [NewsComponent],
  imports: [
    CommonModule,
    NzBackTopModule,
    InfoModule,
    NzEmptyModule,
    NzDividerModule,
    NzGridModule,
  ],
})
export class NewsModule {}
