import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzCardModule } from 'ng-zorro-antd/card';
import { RouterModule } from '@angular/router';
import { RegisterComponent } from './register.component';
import { NzMessageModule } from 'ng-zorro-antd/message';

@NgModule({
  declarations: [RegisterComponent],
  imports: [
    CommonModule,
    FormsModule,
    NzFormModule,
    NzIconModule,
    NzButtonModule,
    NzTypographyModule,
    NzInputModule,
    ReactiveFormsModule,
    NzCardModule,
    RouterModule,
    NzMessageModule,
  ],
})
export class RegisterModule {}
