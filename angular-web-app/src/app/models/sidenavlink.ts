export class Sidenavlink {
  constructor(
    public text: string,
    public icon: string,
    public routerLink: string,
    public children?: Sidenavlink[],
  ){}
}