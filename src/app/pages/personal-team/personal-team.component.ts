import { Component, Input } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Subscription, delay } from 'rxjs';
import { AuthorType, TeamRoles } from 'src/app/app.module';
import { InfoPostModel } from 'src/app/models/infoPost.model';
import { TeamClubModel } from 'src/app/models/teamClub.model';
import { TeamRequestModel } from 'src/app/models/teamRequest.model';
import { InfoService } from 'src/app/service/info.service';
import { TeamService } from 'src/app/service/team.service';

@Component({
  selector: 'personal-team',
  templateUrl: './personal-team.component.html',
  styleUrls: ['./personal-team.component.css'],
})
export class PersonalTeamComponent {
  infos: InfoPostModel[] = [];
  requests: TeamRequestModel[] = [];
  teamId!: string;
  team!: TeamClubModel;
  show: boolean = false;
  subscription!: Subscription;
  TeamRole: TeamRoles = TeamRoles.Member;
  requestVisible: boolean = false;
  isVisibleInfo: boolean = false;

  infoForm!: UntypedFormGroup;

  optionList = [
    { label: 'Участник', value: TeamRoles.Member },
    { label: 'Заместитель', value: TeamRoles.DeputyCommander },
  ];
  selectedValue = { label: 'Участник', value: TeamRoles.Member };

  constructor(
    private teamService: TeamService,
    private message: NzMessageService,
    private activateRoute: ActivatedRoute,
    private infoService: InfoService,
    private ufb: UntypedFormBuilder
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

    this.infoForm = this.ufb.group({
      text: [null, [Validators.required, Validators.maxLength(2000)]],
      authorType: [AuthorType.Team],
      authorId: [this.teamId],
    });

    this.teamService.getTeam(this.teamId).subscribe({
      next: (response) => {
        if (response != null) {
          this.team = response;
          this.infoService
            .getAllInfos({
              authorId: this.teamId,
              authorType: AuthorType.Team,
            })
            .subscribe({
              next: (infoPosts) => {
                this.infos = infoPosts;
              },
            });
          this.show = true;
        }
      },
      error: (err) => {
        this.message.error('Сервер недоступен');
        console.log(err);
      },
    });
  }

  CreateInfoPost() {
    if (this.infoForm.valid) {
      this.infoService.addInfo(this.infoForm.value).subscribe({
        next: (res) => {
          this.isVisibleInfo = false;
          window.location.reload();
        },
        error: (err) => {
          this.createMessage();
          console.log(err);
        },
      });
    } else {
      Object.values(this.infoForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  NotMember() {
    if (this.TeamRole != null && this.TeamRole != TeamRoles.Member) return true;
    else return false;
  }

  IsCommander() {
    if (this.TeamRole == TeamRoles.Commander) return true;
    else return false;
  }

  showInfoModal(): void {
    this.isVisibleInfo = true;
  }

  handleInfoCancel(): void {
    this.isVisibleInfo = false;
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

  createMessage(): void {
    this.message.error(
      'Что-то пошло не так. Проверьте введенные данные или попробуйте позже'
    );
  }
}
