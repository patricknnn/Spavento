import { FirebaseEntity } from "./firebaseentity";

export class GeneralContent extends FirebaseEntity {
    formStyle?: string;
    formColor?: string;
    cardElevation?: string;
    paintingCategories?: string[];
    paintingStates?: string[];
    paintingPaints?: string[];
    paintingMaterials?: string[];
    newsCategories?: string[];
    contactformCategories?: string[];
    pageSizeOptions?: number[];
    pageSizeDefault?: number;
}