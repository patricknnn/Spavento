import { FirebaseEntity } from "./firebaseentity";

export class FooterContent extends FirebaseEntity {
  footerText?: string;
  aboutTitle?: string;
  aboutText?: string;
  socialTitle?: string;
  socialText?: string;
  facebookLink?: string;
  twitterLink?: string;
  instagramLink?: string;
}
