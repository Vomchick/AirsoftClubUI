import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Observable, delay } from 'rxjs';
import { InfoPostModel } from 'src/app/models/infoPost.model';
import { InfoService } from 'src/app/service/info.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css'],
})
export class NewsComponent implements OnInit {
  infos: InfoPostModel[] = [];
  show: boolean = false;

  constructor(
    private infoService: InfoService,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.infoService.getNews().subscribe({
      next: (response) => {
        if (response != null) {
          this.infos = response;
        }
        this.show = true;
      },
      error: (err) => {
        this.message.error('Сервер недоступен');
        console.log(err);
      },
    });
  }

  createMessage(): void {
    this.message.error(
      'Что-то пошло не так. Проверьте введенные данные или попробуйте позже'
    );
  }

  sortInfos(infos: InfoPostModel[]) {
    return infos.sort((a: InfoPostModel, b: InfoPostModel) => {
      return a.creationDt.getTime() - b.creationDt.getTime();
    });
  }
}
