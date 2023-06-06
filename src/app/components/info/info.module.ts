import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfoComponent } from './info.component';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';

@NgModule({
  declarations: [InfoComponent],
  imports: [
    CommonModule,
    NzCardModule,
    NzGridModule,
    FormsModule,
    ReactiveFormsModule,
    NzFormModule,
    NzButtonModule,
    NzInputModule,
    NzMessageModule,
    NzModalModule,
    NzIconModule,
    NzAvatarModule,
    NzPopconfirmModule,
  ],
  exports: [InfoComponent],
})
export class InfoModule {}
