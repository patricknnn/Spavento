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
}
