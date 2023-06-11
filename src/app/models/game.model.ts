import { GameType } from '../app.module';

export interface GameModel {
  id: string;
  name: string;
  text: string;
  creationDt: Date;
  rentalPrice: number;
  defaultPrice: number;
  startDt: Date;
  gameType: GameType;
  fieldId: string;
  fieldName: string;
}
