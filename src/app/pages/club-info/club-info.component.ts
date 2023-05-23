import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Subscription } from 'rxjs';
import { InfoModel } from 'src/app/models/info.model';
import { TeamClubModel } from 'src/app/models/teamClub.model';
import { ClubService } from 'src/app/service/club.service';

@Component({
  selector: 'app-club-info',
  templateUrl: './club-info.component.html',
  styleUrls: ['./club-info.component.css'],
})
export class ClubInfoComponent {
  infos: InfoModel[] = [];
  clubId!: string;
  club!: TeamClubModel;
  show: boolean = false;
  subscription!: Subscription;
  isActuallyPersonal: boolean = false;
  CanChange: boolean = false;

  constructor(
    private clubService: ClubService,
    private message: NzMessageService,
    private activateRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.subscription = this.activateRoute.params.subscribe(
      (params) => (this.clubId = params['id'])
    );
    this.clubService.getClub(this.clubId).subscribe({
      next: (response) => {
        if (response != null) {
          this.club = response;
          this.show = true;
        }
        this.clubService.getPersonalClub().subscribe({
          next: (res) => {
            if (res.id == this.club.id) {
              this.isActuallyPersonal = true;
            } else {
              this.isActuallyPersonal = false;
            }
          },
        });
        this.clubService.getRights(this.clubId).subscribe({
          next: (res) => {
            this.CanChange = res;
          },
        });
      },
      error: (err) => {
        this.message.error('Сервер недоступен');
        console.log(err);
      },
    });
  }
}
