import { Injectable } from '@angular/core';
import { FooterContent } from '../models/footercontent';
import { NavContent } from '../models/navcontent';
import { NavLink } from '../models/navlink';
import { PageContent } from '../models/pagecontent';
import { Service } from '../models/service';

@Injectable({
  providedIn: 'root',
})
export class ContentService {
  constructor() { }

  /**
   * Layout content
   */
  public getNavContent(): NavContent {
    return new NavContent(
      '/assets/img/favicon/favicon-96x96.png',
      'Spavento',
      [
        new NavLink('Home', '/home'),
        new NavLink('Portfolio', '/portfolio'),
        new NavLink('Nieuws', '/news'),
        new NavLink('Contact', '/contact'),
      ],
    );
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

  /**
   * Page content
   */
  public getPageContent(page: string): PageContent {
    switch (page) {
      case 'home':
        return new PageContent(
          'Spavento',
          'Paintings & Artwork',
          {
            servicesTitle: 'Diensten',
            servicesSubTitle: 'Ons aanbod aan',
            servicesText: 'We zijn erg flexibel in wat we doen, van maatwerk tot verschillende stylen.',
            services: [
              new Service(
                'brush',
                'Opdrachten',
                'Schilderijen in opdracht.'
              ),
              new Service(
                'palette',
                'Verschillende Stylen',
                'Schilderijen in verschillende stylen.'
              ),
              new Service(
                'collections',
                'Exposities',
                'Bewonder ons werk op exposities.'
              )
            ],
            featuredTitle: 'Uitgelicht',
            featuredSubTitle: 'In de spotlight',
            featuredText: 'Het volgende schilderij verdient speciale aandacht.',
            latestNewsTitle: 'Laatste nieuws',
            latestNewsSubTitle: 'blijf op de hoogte',
            latestNewsText: 'Alle nieuws rondom Spavento is te zien op de nieuws pagina.',
            latestWorkTitle: 'Laatste werk',
            latestWorkSubTitle: 'Bewonder ons',
            latestWorkText: 'Een overzicht van al ons werk is te zien op de portfolio pagina.',
            ctaTitle: 'Bekijk ons portfolio',
            ctaSubTitle: 'Bewonder ons werk',
            ctaButtonText: 'Bekijk!',
            ctaButtonLink: '/portfolio',
          }
        );
      case 'portfolio':
        return new PageContent(
          'Portfolio',
          'Een overzicht van mijn werk',
          {
            galleryTitle: 'Gallerij',
            gallerySubTitle: 'Bewonder mijn werk',
            galleryText: 'Filter de gallerij items op door middel van onderstaande filters en open een item om de details te tonen.'
          }
        );
      case 'news':
        return new PageContent(
          'Nieuws',
          'Blijf op de hoogte',
          {
            newsTitle: 'Laatste nieuws',
            newsSubTitle: 'Hier vind je het',
            newsText: 'Filter nieuws items op categorie en klik op meer lezen om details te tonen.'
          }
        );
      case 'contact':
        return new PageContent(
          'Contact',
          'Zo zijn we te bereiken',
          {
            contactCardsTitle: 'Contact',
            contactCardsSubTitle: 'Vind op de volgende manieren',
            contactCardsText: 'U kunt ons bellen, mailen of bezoeken.',
            contactCards: [
              new Service(
                'phone',
                'Bel ons',
                '+31 6 12345678'
              ),
              new Service(
                'email',
                'Stuur een email',
                'info@spavento.nl'
              ),
              new Service(
                'pin_drop',
                'Bezoek ons',
                'Oeverlanden, Kropswolde'
              )
            ],
            contactFormTitle: 'Formulier',
            contactFormSubTitle: 'Contact',
            contactFormText: 'Vul onderstaand contactformulier in en u zult zo spoedig mogelijk iets van ons horen',
          }
        );
      default:
        break;
    }
  }
}
