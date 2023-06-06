import { AuthorType } from '../app.module';

export interface InfoPostModel {
  id: string;
  text: string;
  authorName: string;
  authorId: string;
  authorType: AuthorType;
  creationDt: Date;
}
