import { NewsItem } from "./app/models/newsitem";

export const NEWS: NewsItem[] = [
    new NewsItem(
        "Spavento's upcoming expositions",
        "John Doe",
        "Exposities",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi convallis neque id ex volutpat, quis tempus purus finibus. Quisque et vulputate nisi. In semper maximus arcu a auctor. Nullam mi ex, fermentum nec tellus vitae, tincidunt malesuada libero.",
        "../../../assets/img/hooglander.jpg",
        Date.now(),
        "Groningen"
    ),
    new NewsItem(
        "New website is now live",
        "John Doe",
        "Technologie",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi convallis neque id ex volutpat, quis tempus purus finibus. Quisque et vulputate nisi. In semper maximus arcu a auctor. Nullam mi ex, fermentum nec tellus vitae, tincidunt malesuada libero.",
        "../../../assets/img/dessertcar.jpg",
        Date.now(),
        "Kropswolde"
    ),
    new NewsItem(
        "Custom paintings to fit your wishes",
        "John Doe",
        "Services",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi convallis neque id ex volutpat, quis tempus purus finibus. Quisque et vulputate nisi. In semper maximus arcu a auctor. Nullam mi ex, fermentum nec tellus vitae, tincidunt malesuada libero.",
        "../../../assets/img/tommy.jpg",
        Date.now(),
        "Groningen"
    ),
]