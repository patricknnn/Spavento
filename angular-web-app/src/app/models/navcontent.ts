import { NavLink } from "./navlink";

export class NavContent {
  constructor(
    public brandImage: string,
    public brandName: string,
    public navLinks: NavLink[],
  ) {
  }
}