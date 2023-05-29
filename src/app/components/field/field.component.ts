import { Component, Input, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { FieldModel } from 'src/app/models/field.model';
import { FieldService } from 'src/app/service/field.service';

@Component({
  selector: 'field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.css'],
})
export class FieldComponent implements OnInit {
  @Input() field!: FieldModel;
  @Input() CanChange: boolean = false;

  isVisible = false;

  fieldForm!: UntypedFormGroup;

  radioOptions = [
    { label: 'Открытый', value: 'false', checked: true },
    { label: 'Крытый', value: 'true' },
  ];

  constructor(
    private fieldService: FieldService,
    private ufb: UntypedFormBuilder,
    private message: NzMessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fieldForm = this.ufb.group({
      name: [this.field.name, [Validators.required, Validators.maxLength(128)]],
      text: [
        this.field.text,
        [Validators.required, Validators.maxLength(2000)],
      ],
      isCovered: [this.field.isCovered, [Validators.required]],
      address: [this.field.address, [Validators.required]],
      gps: [this.field.gps],
      //image: [this.account.imageFile, []],
    });
  }

  UpdateField() {
    //debugger;
    if (this.fieldForm.valid) {
      this.fieldService
        .updateField(this.field.id, this.fieldForm.value)
        .subscribe({
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
      Object.values(this.fieldForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  deleteField() {
    this.fieldService.deleteField(this.field.id).subscribe({
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
