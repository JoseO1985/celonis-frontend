import { Gender } from './enums/gender';

export interface Hero {
  nameLabel: string,
  genderLabel: Gender,
  citizenshipLabel: string,
  skillsLabel: string,
  occupationLabel: string,
  memberOfLabel: string,
  creatorLabel: string
}
