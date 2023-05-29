import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Subscription, delay } from 'rxjs';
import { TeamRoles } from 'src/app/app.module';
import { InfoModel } from 'src/app/models/info.model';
import { TeamClubModel } from 'src/app/models/teamClub.model';
import { TeamRequestModel } from 'src/app/models/teamRequest.model';
import { TeamService } from 'src/app/service/team.service';

@Component({
  selector: 'personal-team',
  templateUrl: './personal-team.component.html',
  styleUrls: ['./personal-team.component.css'],
})
export class PersonalTeamComponent {
  infos: InfoModel[] = [];
  requests: TeamRequestModel[] = [];
  teamId!: string;
  team!: TeamClubModel;
  show: boolean = false;
  subscription!: Subscription;
  TeamRole: TeamRoles = TeamRoles.Member;
  requestVisible: boolean = false;

  optionList = [
    { label: 'Участник', value: TeamRoles.Member },
    { label: 'Заместитель', value: TeamRoles.DeputyCommander },
  ];
  selectedValue = { label: 'Участник', value: TeamRoles.Member };

  constructor(
    private teamService: TeamService,
    private message: NzMessageService,
    private activateRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.subscription = this.activateRoute.params.subscribe(
      (params) => (this.teamId = params['id'])
    );
    this.teamService.getRights(this.teamId).subscribe({
      next: (res) => {
        this.TeamRole = res;
        if (this.TeamRole != TeamRoles.Member) {
          this.teamService.getTeamRequests(this.teamId).subscribe({
            next: (res) => {
              this.requests = res;
            },
          });
        }
      },
    });

    this.teamService.getTeam(this.teamId).subscribe({
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
    });
  }

  NotMember() {
    if (this.TeamRole != TeamRoles.Member) return true;
    else return false;
  }

  IsCommander() {
    if (this.TeamRole == TeamRoles.Commander) return true;
    else return false;
  }

  PositiveRequest(request: TeamRequestModel) {
    request.teamRole = this.selectedValue.value;
    this.teamService.positiveTeamRequest(request).subscribe({
      next: () => {
        this.requestVisible = false;
        window.location.reload();
      },
    });
  }

  NegativeRequest(request: TeamRequestModel) {
    this.teamService.negativeTeamRequest(request).subscribe({
      next: () => {
        this.requestVisible = false;
        window.location.reload();
      },
    });
  }
}
