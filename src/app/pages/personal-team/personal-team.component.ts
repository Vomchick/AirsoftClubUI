import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Subscription } from 'rxjs';
import { InfoModel } from 'src/app/models/info.model';
import { TeamClubModel } from 'src/app/models/teamClub.model';
import { TeamService } from 'src/app/service/team.service';

@Component({
  selector: 'personal-team',
  templateUrl: './personal-team.component.html',
  styleUrls: ['./personal-team.component.css'],
})
export class PersonalTeamComponent {
  infos: InfoModel[] = [];
  team!: TeamClubModel;
  show: boolean = false;
  subscription!: Subscription;

  constructor(
    private teamService: TeamService,
    private message: NzMessageService,
    private activateRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.subscription = this.activateRoute.params.subscribe(
      (params) => (this.team = params['team'])
    );
    /*this.teamService.getTeam().subscribe({
      next: (response) => {
        if (response != null) {
          this.team = response;
          this.show = true;
        }
      },
      error: (err) => {
        this.message.error('Сервер недоступен');
        console.log(err);
      },
    });*/
  }
}
