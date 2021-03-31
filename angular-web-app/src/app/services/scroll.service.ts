import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {
  scrollPositions = new Map<string, number>();

  constructor() { }

  /**
   * Set position to scroll to on next page load
   * @param page Page name
   * @param position Scroll position
   */
  setScrollPosition(page: string, position: number): void {
    this.scrollPositions.set(page, position);
  }

  /**
   * Get position to scroll to on page load
   * @param page Page name
   * @returns 
   */
  getScrollPosition(page: string): number {
    let lastPos = this.scrollPositions.get(page);
    this.scrollPositions.delete(page);
    return lastPos;
  }
}
