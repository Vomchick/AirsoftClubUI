import { TeamRoles } from '../app.module';

export interface TeamRequestModel {
  userId: string;
  name: string;
  teamId: string;
  description: string;
  teamRole: TeamRoles;
}
