import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { ru_RU } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import '@angular/common/locales/global/ru';
import ru from '@angular/common/locales/ru';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IconsProviderModule } from './icons-provider.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { JwtModule } from '@auth0/angular-jwt';
import { access_token_key } from './service/auth.service';
import { auth_api_url, cards_api_url } from './app-injection-tokens';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzBadgeModule } from 'ng-zorro-antd/badge';

export function tokenGetter() {
  return localStorage.getItem(access_token_key);
}

export const enum TeamRoles {
  Commander,
  DeputyCommander,
  Member,
}

export const enum GameType {
  PistolGame,
  SundayGame,
  OpenSeason,
  CloseSeason,
  SpeedSoft,
  StoryGame,
  StalkerStrike,
}

export const enum PickUp {
  PublicTransport,
  NeedARide,
  GetByCar,
  GetByCarHaveSpace,
}

registerLocaleData(ru);

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    IconsProviderModule,
    NzLayoutModule,
    NzMenuModule,
    NzMessageModule,
    NzModalModule,
    NzIconModule,
    NzBadgeModule,

    JwtModule.forRoot({
      config: {
        tokenGetter,
        allowedDomains: ['localhost:7245'],
      },
    }),
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'ru' },
    { provide: auth_api_url, useValue: 'https://localhost:7245/' },
    { provide: cards_api_url, useValue: 'https://localhost:7245/' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
