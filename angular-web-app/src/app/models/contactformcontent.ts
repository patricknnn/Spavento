import { FirebaseEntity } from "./firebaseentity";

export class ContactFormContent extends FirebaseEntity {
    title?: string;
    subTitle?: string;
    text?: string;
    active?: boolean;
}