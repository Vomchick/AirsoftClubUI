import { AuthorType } from '../app.module';

export interface InfoPostRequestModel {
  text: string;
  authorId: string;
  authorType: AuthorType;
}
