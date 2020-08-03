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
    // init footer margin
    siteFooter();
    // init on resize
    $(window).on('resize', () => {
      siteFooter();
    });

    // Add footer margin to content
    function siteFooter(): void {
      const content = $('#site-content');
      const footer = $('#site-footer');
      const siteFooterHeight = footer.height();

      content.css({
        'margin-bottom': siteFooterHeight
      });
    }
  }

}
