import { FirebaseEntity } from "./firebaseentity";

export class Painting extends FirebaseEntity {
  artist: string;
  title: string;
  description: string;
  thumbnail: string;
  images: string[];
  paint: string;
  material: string;
  status: string;
  price: string;
  category: string;
  length: number;
  width: number;
  active: boolean;
}
