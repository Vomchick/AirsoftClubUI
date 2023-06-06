import { Component, Input, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { InfoPostModel } from 'src/app/models/infoPost.model';
import { InfoService } from 'src/app/service/info.service';

@Component({
  selector: 'info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css'],
})
export class InfoComponent implements OnInit {
  @Input() info!: InfoPostModel;
  @Input() CanChange: boolean = false;

  infoForm!: UntypedFormGroup;

  isVisible: boolean = false;

  constructor(
    private infoService: InfoService,
    private ufb: UntypedFormBuilder,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.infoForm = this.ufb.group({
      text: [this.info.text, [Validators.required, Validators.maxLength(3000)]],
      authorType: [this.info.authorType],
      authorId: [this.info.authorId],
      //image: [this.account.imageFile, []],
    });
  }

  CutPlayerName() {
    return this.info.authorName.substring(0, 1);
  }
  UpdateInfo() {
    //debugger;
    if (this.infoForm.valid) {
      this.infoService.updateInfo(this.info.id, this.infoForm.value).subscribe({
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
      Object.values(this.infoForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  deleteInfo() {
    this.infoService.deleteInfo(this.info.id, this.info).subscribe({
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

  showModal(): void {
    this.isVisible = true;
  }

  handleCancel(): void {
    this.isVisible = false;
  }
}
