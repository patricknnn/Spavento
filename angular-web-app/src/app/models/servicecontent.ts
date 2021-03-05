import Service from "./service"

export default class ServiceContent {
    id?: string;
    title?: string;
    subTitle?: string;
    text?: string;
    services?: Service[];
    active?: boolean;
}