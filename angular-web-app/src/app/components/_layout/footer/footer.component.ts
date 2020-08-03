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
    // init footer
    siteFooter();
    // init on resize
    $(window).on('resize', () => {
      siteFooter();
    });
    // show / hide footer for animations
    document.addEventListener('scroll', () => {
      if ($(window).scrollTop() === 0){
        $('#site-footer').addClass('hide-footer');
      } else {
        $('#site-footer').removeClass('hide-footer');
      }
    }, true);

    function siteFooter(): void {
      const content = $('#site-content');
      const footer = $('#site-footer');
      const siteFooterHeight = footer.height();

      content.css({
        'margin-bottom': siteFooterHeight
      });

      footer.addClass('hide-footer');
    }
  }

}
