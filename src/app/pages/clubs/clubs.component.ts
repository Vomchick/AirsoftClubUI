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
import { TeamRegistrationModel } from 'src/app/models/teamRegistration.model';
import { SoloRegistrationModel } from 'src/app/models/soloRegistration.model';

//const ngClubLiteral =
//    '<svg x="0px" y="0px" viewBox="0 0 1000 1000" enable-background="new 0 0 1000 1000" xml:space="preserve" > <g> <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"> <path d="M8306.8,4989.4c-70.8-36.4-107.2-113-128.3-262.3c-32.5-233.6-212.5-580.2-484.4-932.5l-139.8-180l-1457.1-999.5l-1457.1-997.6l-114.9-9.6c-63.2-5.7-147.4-28.7-189.6-49.8c-107.2-55.5-1633.2-1106.7-1706-1175.6l-59.3-57.4l-63.2,44C2444,417,2298.5,621.9,2298.5,666c0,28.7,36.4,38.3,201.1,53.6c183.8,15.3,363.8,80.4,409.7,143.6c72.8,99.6,42.1,224-67,281.5c-63.2,34.5-68.9,34.5-203,0c-210.6-53.6-373.4-61.3-501.7-21.1c-120.6,38.3-252.7,143.6-319.8,254.7c-97.6,162.7-187.6,206.8-300.6,149.4c-166.6-86.2-130.2-283.4,99.6-524.6c53.6-57.4,134-124.5,178.1-151.3c63.2-36.4,82.3-59.4,82.3-97.6c1.9-203,208.7-562.9,400.2-695l93.8-65.1l11.5-268.1c30.6-593.6-82.3-848.2-597.4-1363.3c-235.5-237.4-499.7-444.2-894.2-706.5c-178.1-118.7-360-245.1-402.1-281.4c-116.8-99.6-185.7-241.3-187.6-377.2c-1.9-206.8,42.1-264.2,674-917.1c624.2-643.3,764-767.8,915.2-825.2c191.5-70.9,335.1-38.3,601.2,135.9c637.6,419.3,1020.5,865.4,1194.8,1393.9l53.6,160.8l203,93.8c589.7,277.6,823.3,398.2,890.3,457.6c141.7,124.5,250.8,344.6,300.6,610.8c34.5,180,28.7,626.1-9.6,840.6c-17.2,99.6-24.9,187.6-17.2,193.4c61.3,57.4,2025.8,1393.9,2715.1,1847.7c656.7,434.6,779.3,541.9,894.2,775.5c103.4,212.5,137.9,396.3,124.4,668.2c-9.6,197.2-44,411.7-80.4,501.7c-17.2,42.1,145.5,70.8,488.2,88.1c315.9,15.3,373.4,34.5,423.1,149.3c38.3,88.1,36.4,143.6-13.4,241.3c-28.7,57.4-922.9,1349.9-1007.1,1459c-63.2,78.5-180,147.4-248.9,147.4C8377.7,5018.1,8335.5,5006.6,8306.8,4989.4z M8858.3,3894.2c283.4-407.8,323.6-472.9,287.2-476.8c-423.1-49.8-639.5-99.6-869.3-197.2c-183.8-78.5-243.2-114.9-855.9-534.2c-1300.1-888.4-2268.9-1533.7-2303.4-1533.7c-7.7,0-47.9,44-88.1,97.7c-61.3,82.3-68.9,101.5-47.9,122.5c15.3,13.4,647.2,448,1405.4,966.9c758.2,518.9,1399.6,961.2,1424.5,984.2c137.8,122.5,482.5,628,608.9,888.4c45.9,99.6,91.9,174.2,97.6,166.6C8525.1,4370.9,8678.3,4152.6,8858.3,3894.2z M8412.1,2708.9c90-404,40.2-702.7-149.3-921c-46-53.6-371.5-281.5-926.7-652.9C5745,72.4,3887.7-1208.5,3734.5-1350.2c-126.4-116.8-216.4-273.8-256.6-448c-17.2-67-42.1-319.8-59.4-562.9c-34.5-490.2-70.8-683.6-170.4-899.9c-91.9-199.1-189.6-338.9-356.1-515.1c-252.7-264.2-716.1-605-823.3-605c-34.5,0-90,28.7-147.4,72.8c-132.1,105.3-1156.5,1158.4-1200.5,1235c-36.4,63.2-36.4,68.9-5.8,114.9c17.2,26.8,180,147.5,361.9,268.1c591.6,390.6,953.5,700.8,1294.3,1114.4c174.2,208.7,266.2,371.5,335.1,595.5c59.4,185.7,91.9,517,70.8,716.1c-13.4,122.6-11.5,155.1,21.1,222.1c19.2,42.1,59.4,99.6,88.1,126.4c61.3,57.4,1589.2,1112.4,1639,1131.6c24.9,9.6,76.6-45.9,224-247c105.3-141.7,206.8-264.2,225.9-270c86.2-34.5,155.1-11.5,360,118.7c321.7,203,1280.9,844.4,2083.2,1393.9c677.8,463.4,921,624.2,953.5,626.1C8377.7,2837.2,8396.8,2779.8,8412.1,2708.9z M4757-1225.8c32.6-275.7,7.7-587.8-59.4-781.2c-61.3-172.3-99.6-202.9-472.9-382.9c-442.3-214.4-432.7-210.6-423.2-130.2c5.7,34.5,13.4,172.3,21.1,308.2c5.7,134,17.2,243.2,23,243.2c5.8,0,57.4-23,116.8-51.7c95.7-47.9,128.3-51.7,312.1-53.6c189.6,0,206.8,3.8,252.7,46c91.9,86.2,82.3,235.5-19.2,300.6c-34.5,24.9-95.7,34.5-203,38.3c-114.9,1.9-164.6,11.5-201,38.3c-26.8,21.1-45.9,46-44,55.5c5.7,23,631.9,465.3,662.5,467.2C4734-1126.2,4749.3-1172.2,4757-1225.8z" /> </g> </g> </svg>';

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
    private router: Router,
    private iconService: NzIconService
  ) {
    //this.iconService.addIconLiteral('ngClub', ngClubLiteral);
  }

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
