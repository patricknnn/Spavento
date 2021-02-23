import { Painting } from "./painting";

export class FeaturedContent {
    constructor(
        public title: string,
        public subTitle: string,
        public text: string,
        public maxHeight: string,
        public painting: Painting,
        public active: boolean
    ) { }
}