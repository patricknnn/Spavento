import {Component, OnInit} from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
    // get padding for first resize
    const siteFooterPadding = 5.5 * parseFloat(getComputedStyle(document.documentElement).fontSize);
    // init footer
    siteFooter(siteFooterPadding);
    // init on resize
    $(window).on('resize', () => {
      siteFooter(0);
    });

    function siteFooter(extra: number): void {
      const content = $('#site-content');
      const footer = $('#site-footer');
      const siteFooterHeight = footer.height();

      content.css({
        'margin-bottom': siteFooterHeight + extra
      });
    }
  }

}
