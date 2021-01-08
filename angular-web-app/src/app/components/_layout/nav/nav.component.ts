import { Component, OnInit } from '@angular/core';
import { NavContent } from 'src/app/models/navcontent';
import { ContentService } from 'src/app/services/content.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  public isMenuCollapsed = true;
  navContent: NavContent;

  constructor(private contentService: ContentService) { }

  ngOnInit(): void {
    // get content
    this.navContent = this.contentService.getNavContent();

    // Scrolled nav when page is scrolled
    window.addEventListener("scroll", function (e) {
      const nav = document.getElementById("mainNav");
      let scroll = window.scrollY;
      if (scroll > 100) {
        nav.classList.add("navbar-scrolled");
      } else {
        nav.classList.remove("navbar-scrolled");
      }
    });
  }

  toggleMenu(): void {
    this.isMenuCollapsed = !this.isMenuCollapsed;
    const animatedIcon = document.getElementById("animatedIcon");
    animatedIcon.classList.toggle("open");
  }

  closeMenu(): void {
    this.isMenuCollapsed = true;
    const animatedIcon = document.getElementById("animatedIcon");
    animatedIcon.classList.remove("open");
  }
}
