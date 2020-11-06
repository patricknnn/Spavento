export class NewsItem {
    constructor(
      public title: string,
      public author: string,
      public category: string,
      public text: string,
      public image: string,
      public date: number,
      public location?: string,
    ) {
    }
  }