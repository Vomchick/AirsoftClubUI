import { Component, OnInit } from '@angular/core';
import { AccountModel } from 'src/app/models/account.model';
import { InfoModel } from 'src/app/models/info.model';
import { AccountService } from 'src/app/service/account.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent implements OnInit {
  infos: InfoModel[] = [];
  account!: AccountModel;

  constructor(private accService: AccountService) {}

  ngOnInit(): void {
    this.accService.getAccount().subscribe((response) => {
      this.account = response;
      this.translateRoles();
    });
  }

  translateRoles(): void {
    switch (this.account.gameRole) {
      case 'Stormtrooper': {
        this.account.gameRole = 'Штурмовик';
        break;
      }
      case 'Sniper': {
        this.account.gameRole = 'Снайпер';
        break;
      }
      case 'Marksman': {
        this.account.gameRole = 'Марксман';
        break;
      }
      case 'MachineGunner': {
        this.account.gameRole = 'Пулеметчик';
        break;
      }
    }

    switch (this.account.teamRole) {
      case 'Commander': {
        this.account.teamRole = 'Командир';
        break;
      }
      case 'DeputyCommander': {
        this.account.teamRole = 'Зам Командира';
        break;
      }
      case 'Member': {
        this.account.teamRole = 'Участник';
        break;
      }
      default:
        break;
    }
  }
}
