import { Component, Input, OnInit } from '@angular/core';
import { AccountModel } from 'src/app/models/account.model';

@Component({
  selector: 'bio',
  templateUrl: './bio.component.html',
  styleUrls: ['./bio.component.css'],
})
export class BioComponent {
  @Input() account!: AccountModel;

  //constructor(private account: AccountModel) {}

  haveTeam(): boolean{
    if(this.account.teamName != null)
      return true;
    else
      return false;
  }
}
