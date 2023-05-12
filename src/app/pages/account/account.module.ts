import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountComponent } from './account.component';
import { BioComponent } from 'src/app/components/bio/bio.component';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { InfoComponent } from 'src/app/components/info/info.component';

@NgModule({
  declarations: [AccountComponent, BioComponent, InfoComponent],
  imports: [CommonModule, NzCardModule, NzAvatarModule, NzGridModule],
})
export class AccountModule {}
