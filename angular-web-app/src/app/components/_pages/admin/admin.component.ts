import { MediaMatcher } from '@angular/cdk/layout';
import { AfterViewInit, ChangeDetectorRef, OnDestroy, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { fadeAnimation } from 'src/app/animations/fade-animation';
import { SidenavService } from 'src/app/services/sidenav.service';

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
    document.getElementById("mainNav").classList.add("d-none");
    document.getElementById("site-footer").classList.add("d-none");
  }

  ngAfterViewInit(): void {
    this.sidenavService.setSidenav(this.sidenav);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener<"change">("change", this._mobileQueryListener);
  }

  public getRouterOutletState(outlet) {
    return outlet.isActivated ? outlet.activatedRoute : '';
  }
}
