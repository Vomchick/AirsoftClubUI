import { Component } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DisabledTimeFn } from 'ng-zorro-antd/date-picker';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Subscription, delay } from 'rxjs';
import { FieldModel } from 'src/app/models/field.model';
import { GameModel } from 'src/app/models/game.model';
import { InfoModel } from 'src/app/models/info.model';
import { TeamClubModel } from 'src/app/models/teamClub.model';
import { ClubService } from 'src/app/service/club.service';
import { FieldService } from 'src/app/service/field.service';
import { GameService } from 'src/app/service/game.service';
import { differenceInCalendarDays } from 'date-fns';
import { TeamService } from 'src/app/service/team.service';
import { TeamRoles } from 'src/app/app.module';
import { SoloRegistrationModel } from 'src/app/models/soloRegistration.model';
import { TeamRegistrationModel } from 'src/app/models/teamRegistration.model';
import { RegistrationService } from 'src/app/service/registration.service';
@Component({
  selector: 'app-club-info',
  templateUrl: './club-info.component.html',
  styleUrls: ['./club-info.component.css'],
})
export class ClubInfoComponent {
  infos: InfoModel[] = [];
  fields: FieldModel[] = [];
  games: GameModel[] = [];
  clubId!: string;
  club!: TeamClubModel;
  show: boolean = false;
  subscription!: Subscription;
  CanChange: boolean = false;
  isVisibleField: boolean = false;
  isVisibleGame: boolean = false;
  today = new Date();
  soloRegistrations: SoloRegistrationModel[] = [];
  teamRegistrations: TeamRegistrationModel[] = [];

  TeamRights: TeamRoles = TeamRoles.Member;
  PersonalTeam!: TeamClubModel;
  maxPeopleCount: number = 1;

  fieldForm!: UntypedFormGroup;
  gameForm!: UntypedFormGroup;

  disabledDate = (current: Date): boolean =>
    differenceInCalendarDays(current, this.today) < 0;

  disabledDateTime: DisabledTimeFn = (current) => ({
    nzDisabledHours: () =>
      differenceInCalendarDays(current as Date, this.today) == 0
        ? this.range(0, this.today.getHours())
        : [],
    nzDisabledMinutes: () => [],
    nzDisabledSeconds: () => [],
  });

  timeOptions = {
    nzHideDisabledOptions: true,
    nzFormat: 'HH:mm',
  };
  constructor(
    private clubService: ClubService,
    private message: NzMessageService,
    private activateRoute: ActivatedRoute,
    private fieldService: FieldService,
    private teamService: TeamService,
    private gameService: GameService,
    private registrationService: RegistrationService,
    private ufb: UntypedFormBuilder
  ) {}

  ngOnInit(): void {
    this.fieldForm = this.ufb.group({
      name: [null, [Validators.required, Validators.maxLength(128)]],
      text: [null, [Validators.required, Validators.maxLength(2000)]],
      isCovered: [null, [Validators.required]],
      address: [null, [Validators.required]],
      gps: [null],
      //image: [this.account.imageFile, []],
    });

    this.gameForm = this.ufb.group({
      name: [null, [Validators.required, Validators.maxLength(128)]],
      text: [null, [Validators.required, Validators.maxLength(2000)]],
      defaultPrice: [null, [Validators.required]],
      rentalPrice: [null],
      startDt: [null, [Validators.required]],
      gameType: [null, [Validators.required]],
      //image: [this.account.imageFile, []],
    });

    this.subscription = this.activateRoute.params.subscribe(
      (params) => (this.clubId = params['id'])
    );
    this.clubService.getRights(this.clubId).subscribe({
      next: (res) => {
        this.CanChange = res;
      },
    });
    this.clubService.getClub(this.clubId).subscribe({
      next: (response) => {
        if (response != null) {
          this.club = response;

          this.teamService.getPersonalTeam().subscribe({
            next: (res) => {
              this.PersonalTeam = res;
              if (res != null) {
                this.registrationService.getAllTeamRegistrations().subscribe({
                  next: (register) => {
                    this.teamRegistrations = register;
                  },
                });
                this.teamService.getRights(res.id).subscribe({
                  next: (rights) => {
                    this.TeamRights = rights;
                  },
                });
                this.teamService.getPeopleCount(res.id).subscribe({
                  next: (count) => {
                    this.maxPeopleCount = count;
                  },
                });
              }
              this.registrationService.getAllSoloRegistrations().subscribe({
                next: (res) => {
                  this.soloRegistrations = res;
                  this.show = true;
                },
                error: (err) => {
                  this.message.error('Сервер недоступен');
                  console.log(err);
                },
              });
            },
            error: (err) => {
              this.message.error('Сервер недоступен');
              console.log(err);
            },
          });

          this.fieldService.getAllFields(this.clubId).subscribe({
            next: (res) => {
              this.fields = res;
            },
            error: (err) => {
              this.message.error('Сервер недоступен');
              console.log(err);
            },
          });
          this.gameService.getAllGames(this.clubId).subscribe({
            next: (res) => {
              this.games = res;
            },
            error: (err) => {
              this.message.error('Сервер недоступен');
              console.log(err);
            },
          });
        }
      },
      error: (err) => {
        this.message.error('Сервер недоступен');
        console.log(err);
      },
    });
  }

  GetSoloRegistration(gameId: string) {
    if (this.soloRegistrations != null)
      for (let index = 0; index < this.soloRegistrations.length; index++) {
        if (this.soloRegistrations[index].gameId == gameId)
          return this.soloRegistrations[index];
      }
    return null;
  }

  GetTeamRegistration(gameId: string) {
    if (this.teamRegistrations != null)
      for (let index = 0; index < this.teamRegistrations.length; index++) {
        if (this.teamRegistrations[index].gameId == gameId)
          return this.teamRegistrations[index];
      }
    return null;
  }

  range(start: number, end: number): number[] {
    const result: number[] = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  }

  showFieldModal(): void {
    this.isVisibleField = true;
  }

  handleFieldCancel(): void {
    this.isVisibleField = false;
  }

  showGameModal(): void {
    this.isVisibleGame = true;
  }

  handleGameCancel(): void {
    this.isVisibleGame = false;
  }

  CreateField() {
    if (this.fieldForm.valid) {
      this.fieldService.addField(this.clubId, this.fieldForm.value).subscribe({
        next: () => {
          this.isVisibleField = false;
          window.location.reload();
        },
        error: (err) => {
          this.createMessage();
          console.log(err);
        },
      });
    } else {
      Object.values(this.fieldForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  CreateGame() {
    //debugger;
    if (this.gameForm.valid) {
      this.gameService.addGame(this.clubId, this.gameForm.value).subscribe({
        next: () => {
          this.isVisibleGame = false;
          window.location.reload();
        },
        error: (err) => {
          this.createMessage();
          console.log(err);
        },
      });
    } else {
      Object.values(this.gameForm.controls).forEach((control) => {
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
