import { Injectable } from '@angular/core';
import { ContactFormContent } from '../models/contactformcontent';
import { CtaContent } from '../models/ctacontent';
import { FeaturedContent } from '../models/featuredcontent';
import { FooterContent } from '../models/footercontent';
import { GalleryContent } from '../models/gallerycontent';
import { HeaderContent } from '../models/headercontent';
import { LatestNewsContent } from '../models/latestnewscontent';
import { LatestWorkContent } from '../models/latestworkcontent';
import { NavContent } from '../models/navcontent';
import { NavLink } from '../models/navlink';
import { NewsContent } from '../models/newscontent';
import { PageNotFoundContent } from '../models/pagenotfoundcontent';
import { PageTitle } from '../models/pagetitle';
import { Service } from '../models/service';
import { ServiceContent } from '../models/servicecontent';
import { PaintingService } from './painting.service';

@Injectable({
  providedIn: 'root',
})
export class ContentService {
  constructor(private paintingService: PaintingService) { }

  /**
   * Layout content
   */
  public getNavContent(): NavContent {
    return new NavContent('/assets/img/favicon/favicon-96x96.png', 'Spavento', [
      new NavLink('Home', '/home', true),
      new NavLink('Portfolio', '/portfolio', true),
      new NavLink('Nieuws', '/news', true),
      new NavLink('Contact', '/contact', true),
      new NavLink('CMS', '/cms', true),
    ]);
  }
  public getFooterContent(): FooterContent {
    return new FooterContent(
      '© 2020 Spavento Paintings',
      'Over',
      'Lorem ipsum dolor sit amet consectetur adip elit. Maiores deleniti explicabo voluptatem quisquam nulla asperiores aspernatur aperiam voluptate et consectetur minima delectus.',
      'Social media',
      'Volg ons om up to date te blijven',
      'facebook.com',
      'twitter.com',
      'instagram.com'
    );
  }
  public getHeaderContent(): HeaderContent {
    return new HeaderContent(
      true,
      true,
      true,
      'Spavento',
      'Paintings & Artwork',
      '../../../../assets/img/dessertcar.jpg',
    )
  }

  /**
   * Page content
   */
  public getServicesContent(): ServiceContent {
    return new ServiceContent(
      'Diensten',
      'Ons aanbod aan',
      'We zijn erg flexibel in wat we doen, van maatwerk tot verschillende stylen.',
      [
        new Service('brush', 'Opdrachten', 'Schilderijen in opdracht.'),
        new Service(
          'palette',
          'Verschillende Stylen',
          'Schilderijen in verschillende stylen.'
        ),
        new Service(
          'collections',
          'Exposities',
          'Bewonder ons werk op exposities.'
        ),
      ]
    );
  }

  public getFeaturedContent(): FeaturedContent {
    return new FeaturedContent(
      'Uitgelicht',
      'In de spotlight',
      'Het volgende schilderij verdient speciale aandacht.',
      '60vh',
      this.paintingService.getFeaturedPainting()
    );
  }

  public getLatestNewsContent(): LatestNewsContent {
    return new LatestNewsContent(
      'Laatste nieuws',
      'blijf op de hoogte',
      'Alle nieuws rondom Spavento is te zien op de nieuws pagina.',
      '/news',
      3
    );
  }

  public getLatestWorkContent(): LatestWorkContent {
    return new LatestWorkContent(
      'Laatste werk',
      'Bewonder ons',
      'Een overzicht van al ons werk is te zien op de portfolio pagina.',
      '/portfolio',
      6
    );
  }

  public getCtaContent(): CtaContent {
    return new CtaContent(
      'Bekijk ons portfolio',
      'Bewonder ons werk',
      '',
      'Breng mij daar!',
      '/portfolio',
      '../../../../assets/img/material-bg-light.jpg'
    );
  }

  public getGalleryContent(): GalleryContent {
    return new GalleryContent(
      'Gallerij',
      'Bewonder mijn werk',
      'Filter de gallerij items op door middel van onderstaande filters en open een item om de details te tonen.',
      '100%'
    );
  }

  public getNewsContent(): NewsContent {
    return new NewsContent(
      'Laatste nieuws',
      'Hier vind je het',
      'Filter nieuws items op categorie en klik op meer lezen om details te tonen.'
    );
  }

  public getContactCardsContent(): ServiceContent {
    return new ServiceContent(
      'Contact',
      'Vind op de volgende manieren',
      'U kunt ons bellen, mailen of bezoeken.',
      [
        new Service('phone', 'Bel ons', '+31 6 12345678'),
        new Service('email', 'Stuur een email', 'info@spavento.nl'),
        new Service('pin_drop', 'Bezoek ons', 'Oeverlanden, Kropswolde'),
      ]
    );
  }

  public getContactFormContent(): ContactFormContent {
    return new ContactFormContent(
      'Formulier',
      'Contact',
      'Vul onderstaand contactformulier in en u zult zo spoedig mogelijk iets van ons horen'
    );
  }

  public getPageNotFoundContent(): PageNotFoundContent {
    return new PageNotFoundContent(
      'Links',
      'Handige',
      'Probeer het later nog eens of maak gebruik van onderstaande knoppen',
      'Naar homepage',
      '/home',
      'Vorige pagina',
    )
  }

  public getPageTitle(page: string): PageTitle {
    switch (page) {
      case 'home':
        return new PageTitle('Spavento', 'Paintings & Artwork');
      case 'portfolio':
        return new PageTitle('Portfolio', 'Een overzicht van mijn werk');
      case 'news':
        return new PageTitle('Nieuws', 'Blijf op de hoogte');
      case 'contact':
        return new PageTitle('Contact', 'Zo zijn we te bereiken');
      case '404':
        return new PageTitle('Ojee, een 404', 'De pagina die je zoekt bestaat niet meer');
      default:
        break;
    }
  }
}
