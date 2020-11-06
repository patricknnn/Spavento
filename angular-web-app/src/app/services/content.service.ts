import { Injectable } from '@angular/core';
import { FooterContent } from '../models/footerContent';

@Injectable({
  providedIn: 'root',
})
export class ContentService {
  constructor() {}

  public getFooterContent(): FooterContent {
    return new FooterContent(
      '© 2020 Spavento Paintings',
      'About',
      'Lorem ipsum dolor sit amet consectetur adip elit. Maiores deleniti explicabo voluptatem quisquam nulla asperiores aspernatur aperiam voluptate et consectetur minima delectus.',
      'Stay updated',
      'Follow me on social media to stay updated',
      'facebook.com',
      'twitter.com',
      'instagram.com'
    );
  }
}
