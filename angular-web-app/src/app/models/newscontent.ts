import { FirebaseEntity } from "./firebaseentity";

export class NewsContent extends FirebaseEntity {
    title?: string;
    subTitle?: string;
    text?: string;
}