import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClubsComponent } from './clubs.component';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { BioModule } from 'src/app/components/bio/bio.module';
import { InfoModule } from 'src/app/components/info/info.module';
import { ClubInfoComponent } from '../club-info/club-info.component';
import { FieldModule } from 'src/app/components/field/field.module';
import { NzBackTopModule } from 'ng-zorro-antd/back-top';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { GameModule } from 'src/app/components/game/game.module';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';

@NgModule({
  declarations: [ClubsComponent, ClubInfoComponent],
  imports: [
    CommonModule,
    NzCardModule,
    NzAvatarModule,
    NzGridModule,
    FormsModule,
    ReactiveFormsModule,
    NzFormModule,
    NzButtonModule,
    NzInputModule,
    NzMessageModule,
    NzSelectModule,
    NzModalModule,
    NzUploadModule,
    NzIconModule,
    NzDividerModule,
    BioModule,
    InfoModule,
    FieldModule,
    NzBackTopModule,
    NzRadioModule,
    GameModule,
    NzDatePickerModule,
    NzPopoverModule,
    NzTimePickerModule,
    NzInputNumberModule,
  ],
})
export class ClubsModule {}
