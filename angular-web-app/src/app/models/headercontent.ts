import { FirebaseEntity } from "./firebaseentity";

export class HeaderContent extends FirebaseEntity {
    small?: boolean;
    typing?: boolean;
    paralax?: boolean;
    defaultTitle?: string;
    defaultSubtitle?: string;
    defaultImage?: string;
}