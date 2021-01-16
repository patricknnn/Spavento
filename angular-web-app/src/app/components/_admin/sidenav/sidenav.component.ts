import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Sidenavlink } from 'src/app/models/sidenavlink';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  public navlinks: Sidenavlink[];
  public simplebarOptions: object;

  constructor(private router: Router) {
    this.navlinks = [
      new Sidenavlink("Dashboard", "dashboard", "/admin/dashboard"),
      new Sidenavlink("Algemeen", "photo_filter", "/admin/general"),
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
        new Sidenavlink("404", "explore_off", "/admin/page-not-found")
      ]),
      new Sidenavlink("Portfolio", "collections", "", [
        new Sidenavlink("Overzicht", "library_books", "/admin/portfolio-overview"),
        new Sidenavlink("Toevoegen", "library_add", "/admin/portfolio-add"),
      ]),
      new Sidenavlink("Nieuws", "library_books", "", [
        new Sidenavlink("Overzicht", "library_books", "/admin/news-overview"),
        new Sidenavlink("Toevoegen", "library_add", "/admin/news-add"),
      ]),
    ];
    this.simplebarOptions = { autoHide: true };
  }

  ngOnInit(): void {
  }

  goToHome(): void {
    this.router.navigate(['/home']).then(() => {
      window.location.reload();
    });
  }

}
