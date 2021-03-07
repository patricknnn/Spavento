import { FirebaseEntity } from "./firebaseentity";

export class ContactForm extends FirebaseEntity {
  name: string;
  email: string;
  subject: string;
  text: string;
}