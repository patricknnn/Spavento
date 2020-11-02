import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
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

  toggleIconOpen(): void {
    const animatedIcon = document.getElementById("animatedIcon");
    animatedIcon.classList.toggle("open");
  }

  removeIconOpen(): void {
    const animatedIcon = document.getElementById("animatedIcon");
    animatedIcon.classList.remove("open");
  }
}
