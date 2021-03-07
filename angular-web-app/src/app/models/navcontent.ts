import { FirebaseEntity } from "./firebaseentity";
import { NavLink } from "./navlink";

export class NavContent extends FirebaseEntity {
  brandImage?: string;
  brandName?: string;
  navLinks?: NavLink[];
}