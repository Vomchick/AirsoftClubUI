import { PickUp } from '../app.module';

export interface SoloRegistrationModel {
  needARent: boolean;
  pickUp: PickUp;
  gameId: string;
}
