import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, HostListener, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-back-to-top',
  templateUrl: './back-to-top.component.html',
  styleUrls: ['./back-to-top.component.scss'],
  animations: [
    trigger('appearInOut', [
      state('in', style({
        'transform': 'translateY(0px)'
      })),
      state('out', style({
        'transform': 'translateY(56px)'
      })),
      transition('in <=> out', animate('250ms cubic-bezier(0.250, 0.460, 0.450, 0.940)'))
    ]),
  ]
})
export class BackToTopComponent implements OnInit {
  animationState = 'out';
  private timerID: any = null;
  @Input() scrollDistance = 50;
  @Input() animate = false;
  @Input() speed = 80;
  @Input() acceleration = 5;


  ngOnInit() {
  }

  /**
   * Listens to window scroll and animates the button
   */
  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (this.isBrowser()) {
      this.animationState = this.getCurrentScrollTop() > this.scrollDistance / 2 ? 'in' : 'out';
    }
  }

  /**
   * Scrolls window to top
   * @param event
   */
  scrollTop(event: any) {
    if (this.isBrowser()) {
      event.preventDefault();
      this.animate ? this.animateScrollTop() : window.scrollTo(0, 0);
    } else {
      return;
    }
  }

  /**
   * Performs the animated scroll to top
   */
  animateScrollTop() {
    if (this.timerID !== null) {
      return;
    }

    let initialSpeed = this.speed;
    const that = this;
    this.timerID = setInterval(function () {
      window.scrollBy(0, -initialSpeed);
      initialSpeed = initialSpeed + that.acceleration;
      if (that.getCurrentScrollTop() === 0) {
        clearInterval(that.timerID);
        that.timerID = null;
      }
    }, 15);
  }

  /**
   * Get current Y scroll position
   * @returns {number}
   */
  getCurrentScrollTop() {
    if (typeof window.scrollY !== 'undefined' && window.scrollY >= 0) {
      return window.scrollY;
    }
    if (typeof window.pageYOffset !== 'undefined' && window.pageYOffset >= 0) {
      return window.pageYOffset;
    }
    if (typeof document.body.scrollTop !== 'undefined' && document.body.scrollTop >= 0) {
      return document.body.scrollTop;
    }
    if (typeof document.documentElement.scrollTop !== 'undefined' && document.documentElement.scrollTop >= 0) {
      return document.documentElement.scrollTop;
    }
    return 0;
  }

  /**
   * This check will prevent 'window' logic to be executed
   * while executing the server rendering
   * @returns {boolean}
   */
  isBrowser(): boolean {
    return typeof (window) !== 'undefined';
  }
}
