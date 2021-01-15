import { Component, OnInit } from '@angular/core';
import { Sidenavlink } from 'src/app/models/sidenavlink';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  public navlinks: Sidenavlink[];
  public simplebarOptions: object;

  constructor() {
    this.navlinks = [
      new Sidenavlink("Dashboard", "dashboard", "/admin/dashboard"),
      new Sidenavlink("Layout", "view_sidebar", "", [
        new Sidenavlink("Navigatie", "explore", "/admin/layout-navigation"),
        new Sidenavlink("Header", "panorama", "/admin/layout-header"),
        new Sidenavlink("Footer", "copyright", "/admin/layout-footer"),
      ]),
      new Sidenavlink("Pagina's", "web", "", [
        new Sidenavlink("Home", "home", "/admin/page-home"),
        new Sidenavlink("Portfolio", "collections", "/admin/page-portfolio"),
        new Sidenavlink("Nieuws", "library_books", "/admin/page-news"),
        new Sidenavlink("Contact", "perm_contact_calendar", "/admin/page-contact"),
      ]),
      new Sidenavlink("Portfolio", "collections", "", [
        new Sidenavlink("Overzicht", "library_books", "/admin/portfolio-overview"),
        new Sidenavlink("Toevoegen", "library_add", "/admin/portfolio-add"),
      ]),

    ];
    this.simplebarOptions = { autoHide: true };
  }

  ngOnInit(): void {
  }

}
