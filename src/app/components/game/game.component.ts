import { Component, Inject, Input, LOCALE_ID, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { GameType, PickUp, TeamRoles } from 'src/app/app.module';
import { GameModel } from 'src/app/models/game.model';
import { GameService } from 'src/app/service/game.service';
import { ru_RU, NzI18nService, es_ES } from 'ng-zorro-antd/i18n';
import { differenceInCalendarDays } from 'date-fns';
import { DisabledTimeFn } from 'ng-zorro-antd/date-picker';
import { TeamClubModel } from 'src/app/models/teamClub.model';
import { TeamRegistrationModel } from 'src/app/models/teamRegistration.model';
import { SoloRegistrationModel } from 'src/app/models/soloRegistration.model';
import { RegistrationService } from 'src/app/service/registration.service';

@Component({
  selector: 'game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent implements OnInit {
  @Input() game!: GameModel;
  @Input() CanChange: boolean = false;
  @Input() TeamRights: TeamRoles = TeamRoles.Member;
  @Input() PersonalTeam!: TeamClubModel;
  @Input() teamRegistration!: TeamRegistrationModel | null;
  @Input() soloRegistration!: SoloRegistrationModel | null;
  @Input() maxPeopleCount!: number;
  today = new Date();
  startDt!: Date;

  isVisible = false;
  soloRegisterVisible = false;
  teamRegisterVisible = false;

  teamRegisterForm!: UntypedFormGroup;
  gameForm!: UntypedFormGroup;
  soloRegisterForm!: UntypedFormGroup;

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

  optionList = [
    { label: 'На машине', value: PickUp.GetByCar },
    { label: 'На машине, есть место', value: PickUp.GetByCarHaveSpace },
    { label: 'Нужно подвезти', value: PickUp.NeedARide },
    { label: 'Общественным транспортом', value: PickUp.PublicTransport },
  ];
  // Can not select days before today and today

  constructor(
    private gameService: GameService,
    private ufb: UntypedFormBuilder,
    private message: NzMessageService,
    private i18n: NzI18nService,
    private registrationService: RegistrationService,
    @Inject(LOCALE_ID) private locale: string
  ) {}

  ngOnInit(): void {
    this.gameForm = this.ufb.group({
      name: [this.game.name, [Validators.required, Validators.maxLength(128)]],
      text: [this.game.text, [Validators.required, Validators.maxLength(2000)]],
      defaultPrice: [this.game.defaultPrice, [Validators.required]],
      rentalPrice: [this.game.rentalPrice],
      startDt: [new Date(this.game.startDt), [Validators.required]],
      gameType: [this.game.gameType, [Validators.required]],
      //image: [this.account.imageFile, []],
    });

    if (this.soloRegistration != null) {
      this.soloRegisterForm = this.ufb.group({
        needARent: [this.soloRegistration.needARent, Validators.required],
        pickUp: [this.soloRegistration.pickUp, Validators.required],
      });
    } else {
      this.soloRegisterForm = this.ufb.group({
        needARent: [false, Validators.required],
        pickUp: [null, Validators.required],
      });
    }
    debugger;
    if (this.teamRegistration != null) {
      this.teamRegisterForm = this.ufb.group({
        peopleCount: [this.teamRegistration.peopleCount, Validators.required],
      });
    } else {
      this.teamRegisterForm = this.ufb.group({
        peopleCount: [1, Validators.required],
      });
    }

    this.startDt = new Date(this.game.startDt);
    this.i18n.setLocale(ru_RU);
  }

  SoloRegistration() {
    if (this.soloRegisterForm.valid && this.soloRegistration != null) {
      this.registrationService
        .updateSoloRegistration(this.game.id, this.soloRegisterForm.value)
        .subscribe({
          next: () => {
            this.soloRegisterVisible = false;
            window.location.reload();
          },
          error: (err) => {
            this.createMessage();
            console.log(err);
          },
        });
    } else if (this.soloRegisterForm.valid && this.soloRegistration == null) {
      this.registrationService
        .addSoloRegistration(this.game.id, this.soloRegisterForm.value)
        .subscribe({
          next: () => {
            this.soloRegisterVisible = false;
            window.location.reload();
          },
          error: (err) => {
            this.createMessage();
            console.log(err);
          },
        });
    } else {
      Object.values(this.soloRegisterForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  TeamRegistration() {
    if (this.teamRegisterForm.valid && this.teamRegistration != null) {
      this.registrationService
        .updateTeamRegistration(this.game.id, this.teamRegisterForm.value)
        .subscribe({
          next: () => {
            this.teamRegisterVisible = false;
            window.location.reload();
          },
          error: (err) => {
            this.createMessage();
            console.log(err);
          },
        });
    } else if (this.teamRegisterForm.valid && this.teamRegistration == null) {
      this.registrationService
        .addTeamRegistration(this.game.id, this.teamRegisterForm.value)
        .subscribe({
          next: () => {
            this.teamRegisterVisible = false;
            window.location.reload();
          },
          error: (err) => {
            this.createMessage();
            console.log(err);
          },
        });
    } else {
      Object.values(this.teamRegisterForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  CanChangeTeam(): boolean {
    if (this.TeamRights != TeamRoles.Member) return true;
    else return false;
  }

  range(start: number, end: number): number[] {
    const result: number[] = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  }

  UpdateGame() {
    //debugger;
    if (this.gameForm.valid) {
      this.gameService.updateGame(this.game.id, this.gameForm.value).subscribe({
        next: () => {
          this.isVisible = false;
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

  deleteGame() {
    this.gameService.deleteGame(this.game.id).subscribe({
      next: () => {
        window.location.reload();
      },
      error: (err) => {
        this.createMessage();
        console.log(err);
      },
    });
  }

  createMessage(): void {
    this.message.error(
      'Что-то пошло не так. Проверьте введенные данные или попробуйте позже'
    );
  }

  ConvertGameType(type: GameType): string {
    switch (type) {
      case GameType.CloseSeason: {
        return 'Конец сезона';
      }
      case GameType.SpeedSoft: {
        return 'Спидсофт';
      }
      case GameType.OpenSeason: {
        return 'Открытие сезона';
      }
      case GameType.PistolGame: {
        return 'Пистолетка';
      }
      case GameType.SundayGame: {
        return 'Воскреска';
      }
      case GameType.StalkerStrike: {
        return 'Сталкерстрайк';
      }
      case GameType.StoryGame: {
        return 'Сюжетка';
      }
    }
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleCancel(): void {
    this.isVisible = false;
  }
}
