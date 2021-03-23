import { FirebaseEntity } from "./firebaseentity";

export class File extends FirebaseEntity {
  name: string;
  url: string;
  file: File;
}