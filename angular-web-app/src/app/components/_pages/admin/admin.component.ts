import { MediaMatcher } from '@angular/cdk/layout';
import { AfterViewInit, ChangeDetectorRef, OnDestroy, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { fadeAnimation } from 'src/app/animations/fade-animation';
import { SidenavService } from 'src/app/services/sidenav.service';
import 'simplebar';
import 'simplebar/dist/simplebar.css';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  animations: [fadeAnimation]
})
export class AdminComponent implements OnInit, AfterViewInit, OnDestroy {
  title = 'Material Admin';
  @ViewChild('sidenav') public sidenav: MatSidenav;
  private _mobileQueryListener: () => void;
  mobileQuery: MediaQueryList;
  public simplebarOptions: object;

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
    this.mobileQuery.addEventListener<"change">("change", this._mobileQueryListener);
    this.simplebarOptions = { autoHide: false };
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.sidenavService.setSidenav(this.sidenav);
    let nav = document.getElementById("mainNav");
    if (nav) {
      nav.classList.add("d-none");
    }
    let footer = document.getElementById("site-footer");
    if (footer) {
      footer.classList.add("d-none");
    }
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener<"change">("change", this._mobileQueryListener);
  }

  public getRouterOutletState(outlet) {
    return outlet.isActivated ? outlet.activatedRoute : '';
  }
}
