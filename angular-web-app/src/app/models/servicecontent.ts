import { Service } from "./service"

export class ServiceContent {
    constructor(
        public title: string,
        public subTitle: string,
        public text: string,
        public services: Service[],
        public active: boolean
    ) { }
}