import { Component } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { TeamClubModel } from 'src/app/models/teamClub.model';
import { ClubService } from 'src/app/service/club.service';
import { NzIconService } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-clubs',
  templateUrl: './clubs.component.html',
  styleUrls: ['./clubs.component.css'],
})
export class ClubsComponent {
  personalClub!: TeamClubModel;
  mineClubs: TeamClubModel[] = [];
  clubs: TeamClubModel[] = [];
  isVisible = false;
  clubForm!: UntypedFormGroup;
  show: boolean = false;

  constructor(
    private clubService: ClubService,
    private ufb: UntypedFormBuilder,
    private message: NzMessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.clubService.getAllClubs().subscribe({
      next: (response) => {
        if (response != null) {
          this.clubs = response;
        }
        this.clubService.getPersonalClub().subscribe({
          next: (response) => {
            if (response != null) {
              this.personalClub = response;
            }
          },
        });
        this.clubService.getMyClubs().subscribe({
          next: (response) => {
            if (response != null) {
              this.mineClubs = response;
            }
          },
        });
        this.show = true;
      },
      error: (err) => {
        this.message.error('Сервер недоступен');
        console.log(err);
      },
    });

    this.clubForm = this.ufb.group({
      name: [null, [Validators.required, Validators.maxLength(128)]],
      description: [null, [Validators.maxLength(2000)]],
    });
  }

  LeaveClub(club: TeamClubModel) {
    this.clubService.leaveTheClub(club).subscribe({
      next: () => {
        window.location.reload();
      },
    });
  }

  JoinClub(club: TeamClubModel) {
    this.clubService.joinTheClub(club).subscribe({
      next: () => {
        window.location.reload();
      },
    });
  }

  openClub(id: string): void {
    this.router.navigate(['clubInfo', id]);
  }

  gotPersonalClub(): boolean {
    return !!this.personalClub;
  }

  gotMineClubs(): boolean {
    return this.mineClubs.length > 0;
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  CreateClub() {
    if (this.clubForm.valid) {
      this.clubService.addClub(this.clubForm.value).subscribe({
        next: (res) => {
          window.location.reload();
        },
        error: (err) => {
          this.createMessage();
          console.log(err);
        },
      });
    } else {
      Object.values(this.clubForm.controls).forEach((control) => {
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
