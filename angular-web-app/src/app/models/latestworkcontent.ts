import { FirebaseEntity } from "./firebaseentity";

export class LatestWorkContent extends FirebaseEntity {
    title?: string;
    subTitle?: string;
    text?: string;
    link?: string;
    amount?: number;
    active?: boolean;
}