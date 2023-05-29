import { Component } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Subscription, delay } from 'rxjs';
import { FieldModel } from 'src/app/models/field.model';
import { InfoModel } from 'src/app/models/info.model';
import { TeamClubModel } from 'src/app/models/teamClub.model';
import { ClubService } from 'src/app/service/club.service';
import { FieldService } from 'src/app/service/field.service';

@Component({
  selector: 'app-club-info',
  templateUrl: './club-info.component.html',
  styleUrls: ['./club-info.component.css'],
})
export class ClubInfoComponent {
  infos: InfoModel[] = [];
  fields: FieldModel[] = [];
  clubId!: string;
  club!: TeamClubModel;
  show: boolean = false;
  subscription!: Subscription;
  CanChange: boolean = false;
  isVisibleField: boolean = false;

  fieldForm!: UntypedFormGroup;

  constructor(
    private clubService: ClubService,
    private message: NzMessageService,
    private activateRoute: ActivatedRoute,
    private fieldService: FieldService,
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
          this.show = true;
        }
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
    });
  }

  showFieldModal(): void {
    this.isVisibleField = true;
  }

  handleFieldCancel(): void {
    this.isVisibleField = false;
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

  createMessage(): void {
    this.message.error(
      'Что-то пошло не так. Проверьте введенные данные или попробуйте позже'
    );
  }
}
