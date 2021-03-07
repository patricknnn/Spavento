import { FirebaseEntity } from "./firebaseentity";

export class FeaturedContent extends FirebaseEntity {
    title?: string;
    subTitle?: string;
    text?: string;
    maxHeight?: string;
    paintingId?: string;
    active?: boolean
}