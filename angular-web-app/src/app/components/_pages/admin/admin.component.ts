import { MediaMatcher } from '@angular/cdk/layout';
import {
  AfterViewInit,
  ChangeDetectorRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { fadeAnimation } from 'src/app/animations/fade-animation';
import { SidenavService } from 'src/app/services/sidenav.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  animations: [fadeAnimation],
})
export class AdminComponent implements OnInit, AfterViewInit, OnDestroy {
  title = 'Material Admin';
  @ViewChild('sidenav') public sidenav: MatSidenav;
  private _mobileQueryListener: () => void;
  mobileQuery: MediaQueryList;

  /**
   * Constructor
   * @param changeDetectorRef Change detector
   * @param media Media
   * @param sidenavService Sidenav service
   */
  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private sidenavService: SidenavService
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener<'change'>(
      'change',
      this._mobileQueryListener
    );
  }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    this.sidenavService.setSidenav(this.sidenav);
    setTimeout(() => {
      let nav = document.getElementById('mainNav');
      let footer = document.getElementsByClassName('footer-fixed')[0];
      if (nav && footer) {
        nav.classList.add('d-none');
        footer.classList.add('d-none');
      }
    }, 1000);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener<'change'>(
      'change',
      this._mobileQueryListener
    );
  }

  public getRouterOutletState(outlet) {
    return outlet.isActivated ? outlet.activatedRoute : '';
  }
}
