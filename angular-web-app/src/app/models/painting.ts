export class Painting {
  constructor(
    public id: number,
    public artist: string,
    public title: string,
    public description: string,
    public thumbnail: string,
    public images: string[],
    public paint: string,
    public material: string,
    public status: string,
    public price: number,
    public category: string,
    public length: number,
    public width: number,
    public active: boolean,
    public timestampCreated: number,
    public timestampUpdated: number,
  ) {
  }
}
