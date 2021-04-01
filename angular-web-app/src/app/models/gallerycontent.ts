import { FirebaseEntity } from "./firebaseentity";

export class GalleryContent extends FirebaseEntity {
  title?: string;
  subTitle?: string;
  text?: string;
  filterCategoriesActive?: boolean;
  filterPaintsActive?: boolean;
  filterMaterialsActive?: boolean;
  filterStatesActive?: boolean;
}