import { FirebaseEntity } from "./firebaseentity";
import { Service } from "./service"

export class ServiceContent extends FirebaseEntity {
    title?: string;
    subTitle?: string;
    text?: string;
    services?: Service[];
    active?: boolean;
}