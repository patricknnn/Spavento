import { FirebaseEntity } from "./firebaseentity";

export class NewsItem extends FirebaseEntity {
  title: string;
  author: string;
  category: string;
  text: string;
  image: string;
  date: number;
  location: string;
  active: boolean;
}