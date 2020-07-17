import {Component, OnInit} from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
    // Collapse Nav
    const navCollapse = () => {
      const nav = $('#mainNav');
      if (nav.offset().top > 100) {
        nav.addClass('navbar-scrolled');
      } else {
        nav.removeClass('navbar-scrolled');
      }
    };
    // Collapse now if page is not at top
    navCollapse();
    // Collapse the nav when page is scrolled
    document.addEventListener('scroll', navCollapse, true);
  }
}
