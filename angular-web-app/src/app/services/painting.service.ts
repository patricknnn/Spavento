import {Injectable} from '@angular/core';
import {PAINTINGS} from '../../mock-paintings';
import {Painting} from '../models/painting';

@Injectable({
  providedIn: 'root'
})
export class PaintingService {
  paintings = PAINTINGS;

  constructor() {
  }

  getAllPaintings(): Painting[] {
    return this.paintings;
  }

  getLatestPaintings(amount: number): Painting[] {
    return this.paintings.slice(0, amount);
  }

  getPaintingById(id: number): Painting {
    return this.paintings.find(x => x.id === id);
  }

  getImagesByPaintingId(id: number): string[] {
    return [
      'https://scontent-amt2-1.xx.fbcdn.net/v/t1.0-9/107081307_1161994194154245_6097520492808434412_n.jpg?_nc_cat=111&_nc_sid=8bfeb9&_nc_ohc=cpta0uNYQSEAX9Tkjn3&_nc_ht=scontent-amt2-1.xx&oh=04ce395df46fa2d4886f45779e1197f1&oe=5F3B6AC9',
      'https://scontent-ams4-1.xx.fbcdn.net/v/t1.0-9/115932795_1173222826364715_1101636021482293624_o.jpg?_nc_cat=110&_nc_sid=8bfeb9&_nc_ohc=5Je9T9TO_VYAX91ueZ4&_nc_ht=scontent-ams4-1.xx&oh=b533045c0da5d4518f1c0b98367b47a2&oe=5F3D83E3',
      'https://scontent-ams4-1.xx.fbcdn.net/v/t1.0-9/106912112_1162052174148447_8538358532865612851_n.jpg?_nc_cat=108&_nc_sid=8bfeb9&_nc_ohc=mIFUhbtZHHEAX8JVCGl&_nc_ht=scontent-ams4-1.xx&oh=2616c1d6bb3377b34bb2936fe286bf3b&oe=5F3B5257'
    ];
  }
}
