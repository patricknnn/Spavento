import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {
  scrollPositions = new Map<string, number>();

  constructor() { }

  setScrollPosition(page: string, position: number): void {
    this.scrollPositions.set(page, position);
  }

  getScrollPosition(page: string): number {
    let lastPos = this.scrollPositions.get(page);
    this.scrollPositions.set(page, 0);
    return lastPos;
  }
}
