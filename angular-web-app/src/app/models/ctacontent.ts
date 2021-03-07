import { FirebaseEntity } from "./firebaseentity";

export class CtaContent extends FirebaseEntity {
    title?: string;
    subTitle?: string;
    text?: string;
    btnText?: string;
    btnLink?: string;
    image?: string;
    active?: boolean;
}