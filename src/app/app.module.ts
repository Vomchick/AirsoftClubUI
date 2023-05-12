import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
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

export function tokenGetter() {
  return localStorage.getItem(access_token_key);
}

registerLocaleData(en);

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

    JwtModule.forRoot({
      config: {
        tokenGetter,
        allowedDomains: ['localhost:7245'],
      },
    }),
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
    { provide: auth_api_url, useValue: 'https://localhost:7245/' },
    { provide: cards_api_url, useValue: 'https://localhost:7245/' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
