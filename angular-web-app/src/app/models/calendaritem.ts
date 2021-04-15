import { FirebaseEntity } from "./firebaseentity";

export class CalendarItem extends FirebaseEntity {
  title: string;
  author: string;
  description: string;
  location: string;
  dateStart: string;
  dateEnd: string;
  timeStart: number;
  timeEnd: number;
  active: boolean;
}