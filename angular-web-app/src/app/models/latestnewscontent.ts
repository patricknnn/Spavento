import { FirebaseEntity } from "./firebaseentity";

export class LatestNewsContent extends FirebaseEntity {
    title?: string;
    subTitle?: string;
    text?: string;
    link?: string;
    amount?: number;
    active?: boolean;
}