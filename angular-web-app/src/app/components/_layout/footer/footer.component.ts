import {Component, OnInit} from '@angular/core';

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
    window.onresize = siteFooter;

    // Add footer margin to content
    function siteFooter(): void {
      const siteFooterHeight = document.getElementById("site-footer").clientHeight;
      document.getElementById("site-content").style.marginBottom = siteFooterHeight + "px";
    }
  }

}
