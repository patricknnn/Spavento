import { FirebaseEntity } from "./firebaseentity";

export class PageNotFoundContent extends FirebaseEntity {
    title?: string;
    subTitle?: string;
    text?: string;
    btnHomeText?: string;
    btnHomeLink?: string;
    btnBackText?: string;
}