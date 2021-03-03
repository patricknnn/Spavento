import { Injectable } from '@angular/core';
import ContactFormContent from '../models/contactformcontent';
import CtaContent from '../models/ctacontent';
import FeaturedContent from '../models/featuredcontent';
import FooterContent from '../models/footercontent';
import GalleryContent from '../models/gallerycontent';
import HeaderContent from '../models/headercontent';
import LatestNewsContent from '../models/latestnewscontent';
import LatestWorkContent from '../models/latestworkcontent';
import NavContent from '../models/navcontent';
import { NavLink } from '../models/navlink';
import NewsContent from '../models/newscontent';
import PageNotFoundContent from '../models/pagenotfoundcontent';
import PageTitle from '../models/pagetitle';
import ServiceContent from '../models/servicecontent';

@Injectable({
  providedIn: 'root',
})
export class ContentService {
  constructor() { }

  /**
   * Layout content
   */
  public getNavContent(): NavContent {
    let content = new NavContent();
    content.brandImage = '/assets/img/favicon/favicon-96x96.png';
    content.brandName = 'Spavento';
    content.navLinks = [
      new NavLink('Home', '/home', true),
      new NavLink('Portfolio', '/portfolio', true),
      new NavLink('Nieuws', '/news', true),
      new NavLink('Contact', '/contact', true),
      new NavLink('CMS', '/cms', true),
    ];
    return content;
  }
  public getFooterContent(): FooterContent {
    let content = new FooterContent();
    content.footerText = '© 2020 Spavento Paintings';
    content.aboutTitle = 'Over';
    content.aboutText = 'Lorem ipsum dolor sit amet consectetur adip elit. Maiores deleniti explicabo voluptatem quisquam nulla asperiores aspernatur aperiam voluptate et consectetur minima delectus.';
    content.socialTitle = 'Social media';
    content.socialText = 'Volg ons om up to date te blijven';
    content.facebookLink = 'facebook.com';
    content.twitterLink = 'twitter.com';
    content.instagramLink = 'instagram.com';
    return content;
  }

  public getHeaderContent(): HeaderContent {
    let content = new HeaderContent();
    content.paralax = true;
    content.typing = true;
    content.small = true;
    content.defaultImage = '../../../../assets/img/dessertcar.jpg';
    content.defaultTitle = 'Spavento';
    content.defaultSubtitle = 'Paintings & Artwork';
    return content;
  }

  /**
   * Page content
   */
  public getServicesContent(): ServiceContent {
    return new ServiceContent();
  }

  public getFeaturedContent(): FeaturedContent {
    return new FeaturedContent();
  }

  public getLatestNewsContent(): LatestNewsContent {
    return new LatestNewsContent();
  }

  public getLatestWorkContent(): LatestWorkContent {
    return new LatestWorkContent();
  }

  public getCtaContent(): CtaContent {
    return new CtaContent();
  }

  public getGalleryContent(): GalleryContent {
    return new GalleryContent();
  }

  public getNewsContent(): NewsContent {
    return new NewsContent();
  }

  public getContactCardsContent(): ServiceContent {
    return new ServiceContent();
  }

  public getContactFormContent(): ContactFormContent {
    return new ContactFormContent();
  }

  public getPageNotFoundContent(): PageNotFoundContent {
    return new PageNotFoundContent()
  }

  public getPageTitle(page: string): PageTitle {
    let content = new PageTitle();
    switch (page) {
      case 'home':
        content.title = 'Spavento';
        content.subTitle = 'Paintings & Artwork';
        return content;
      case 'portfolio':
        content.title = 'Portfolio';
        content.subTitle = 'Een overzicht van mijn werk';
        return content;
      case 'news':
        content.title = 'Nieuws';
        content.subTitle = 'Blijf op de hoogte';
        return content;
      case 'contact':
        content.title = 'Contact';
        content.subTitle = 'Zo bereik je ons';
        return content;
      case '404':
        content.title = 'Cockie, een 404';
        content.subTitle = 'Pagina niet gevonden jong kerol.';
        return content;
      default:
        break;
    }
    return content;
  }
}
