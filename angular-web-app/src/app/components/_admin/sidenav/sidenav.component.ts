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

  constructor(private router: Router) {
    this.navlinks = [
      new Sidenavlink("Dashboard", "dashboard", "/admin/dashboard"),
      new Sidenavlink("Algemeen", "settings_applications", "/admin/general"),
      new Sidenavlink("Beheer", "assignment_turned_in", "", [
        new Sidenavlink("Bestanden", "folder", "/admin/manager-files"),
        new Sidenavlink("Gebruikers", "people", "/admin/manager-users"),
        new Sidenavlink("Berichten", "send", "/admin/manager-messages"),
      ]),
      new Sidenavlink("Layout", "view_sidebar", "", [
        new Sidenavlink("Navigatie", "explore", "/admin/layout-navigation"),
        new Sidenavlink("Header", "vrpano", "/admin/layout-header"),
        new Sidenavlink("Footer", "copyright", "/admin/layout-footer"),
      ]),
      new Sidenavlink("Teksten", "wysiwyg", "", [
        new Sidenavlink("Home", "home", "/admin/page-home"),
        new Sidenavlink("Portfolio", "image", "/admin/page-portfolio"),
        new Sidenavlink("Kalender", "date_range", "/admin/page-calendar"),
        new Sidenavlink("Nieuws", "feed", "/admin/page-news"),
        new Sidenavlink("Contact", "perm_contact_calendar", "/admin/page-contact"),
        new Sidenavlink("404", "explore_off", "/admin/page-not-found")
      ]),
      new Sidenavlink("Portfolio", "image", "", [
        new Sidenavlink("Overzicht", "list", "/admin/portfolio-overview"),
        new Sidenavlink("Toevoegen", "add", "/admin/portfolio-add"),
      ]),
      new Sidenavlink("Kalender", "date_range", "", [
        new Sidenavlink("Overzicht", "list", "/admin/calendar-overview"),
        new Sidenavlink("Toevoegen", "add", "/admin/calendar-add"),
      ]),
      new Sidenavlink("Nieuws", "feed", "", [
        new Sidenavlink("Overzicht", "list", "/admin/news-overview"),
        new Sidenavlink("Toevoegen", "add", "/admin/news-add"),
      ]),
    ];
  }

  ngOnInit(): void {
  }

  goToHome(): void {
    this.router.navigate(['/home']).then(() => {
      window.location.reload();
    });
  }

}
