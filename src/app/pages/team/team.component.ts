import { Component } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CreateRequestModel } from 'src/app/models/createRequest.model';
import { TeamClubModel } from 'src/app/models/teamClub.model';
import { TeamRequestModel } from 'src/app/models/teamRequest.model';
import { TeamService } from 'src/app/service/team.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css'],
})
export class TeamComponent {
  personalTeam!: TeamClubModel;
  teams: TeamClubModel[] = [];
  isVisible = false;
  teamForm!: UntypedFormGroup;
  show: boolean = false;
  requestVisible: boolean = false;
  requestDescription: string = '';

  constructor(
    private teamService: TeamService,
    private ufb: UntypedFormBuilder,
    private message: NzMessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.teamService.getPersonalTeam().subscribe({
      next: (response) => {
        if (response != null) {
          this.personalTeam = response;
          this.openTeam(this.personalTeam.id);
        }
      },
    });
    this.teamService.getAllTeams().subscribe({
      next: (response) => {
        if (response != null) {
          this.teams = response;
        }

        this.show = true;
      },
      error: (err) => {
        this.message.error('Сервер недоступен');
        console.log(err);
      },
    });

    this.teamForm = this.ufb.group({
      name: [null, [Validators.required, Validators.maxLength(128)]],
      description: [null, [Validators.maxLength(2000)]],
    });
  }

  CreateRequest(team: TeamClubModel) {
    this.teamService
      .createTeamRequest(
        new CreateRequestModel(team.id, this.requestDescription)
      )
      .subscribe({
        next: () => window.location.reload(),
      });
    this.requestVisible = false;
  }

  openTeam(id: string): void {
    this.router.navigate(['teamInfo', id]);
  }

  gotPersonalTeam(): boolean {
    return !!this.personalTeam;
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  CreateTeam() {
    if (this.teamForm.valid) {
      this.teamService.addTeam(this.teamForm.value).subscribe({
        next: (res) => {
          window.location.reload();
        },
        error: (err) => {
          this.createMessage();
          console.log(err);
        },
      });
    } else {
      Object.values(this.teamForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  createMessage(): void {
    this.message.error(
      'Что-то пошло не так. Проверьте введенные данные или попробуйте позже'
    );
  }
}
