import { FirebaseEntity } from "./firebaseentity";
import { Painting } from "./painting";

export class FeaturedContent extends FirebaseEntity {
    title?: string;
    subTitle?: string;
    text?: string;
    maxHeight?: string;
    painting?: Painting;
    active?: boolean
}