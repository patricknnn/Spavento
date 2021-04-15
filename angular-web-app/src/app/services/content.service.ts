import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { CalendarContent } from '../models/calendarcontent';
import { ContactFormContent } from '../models/contactformcontent';
import { CtaContent } from '../models/ctacontent';
import { FeaturedContent } from '../models/featuredcontent';
import { FooterContent } from '../models/footercontent';
import { GalleryContent } from '../models/gallerycontent';
import { GeneralContent } from '../models/generalcontent';
import { HeaderContent } from '../models/headercontent';
import { LatestNewsContent } from '../models/latestnewscontent';
import { LatestWorkContent } from '../models/latestworkcontent';
import { NavContent } from '../models/navcontent';
import { NewsContent } from '../models/newscontent';
import { PageNotFoundContent } from '../models/pagenotfoundcontent';
import { PageTitle } from '../models/pagetitle';
import { ServiceContent } from '../models/servicecontent';

@Injectable({
  providedIn: 'root',
})
export class ContentService {
  // Layout
  private navPath = '/content/layout/nav';
  private footerPath = '/content/layout/footer';
  private headerPath = '/content/layout/header';
  // Components
  private generalPath = '/content/components/general';
  private servicesPath = '/content/components/services';
  private featuredPath = '/content/components/featured';
  private latestnewsPath = '/content/components/latestnews';
  private latestworkPath = '/content/components/latestwork';
  private ctaPath = '/content/components/cta';
  private galleryPath = '/content/components/gallery';
  private calendarPath = '/content/components/gallery';
  private newsPath = '/content/components/news';
  private contactcardsPath = '/content/components/contactcards';
  private contactFormPath = '/content/components/contactform';
  private pagenotfoundPath = '/content/components/pagenotfound';
  // Titles
  private homeTitlePath = '/content/title/home';
  private portfolioTitlePath = '/content/title/portfolio';
  private newsTitlePath = '/content/title/news';
  private contactTitlePath = '/content/title/contact';
  private pnfTitlePath = '/content/title/pagenotfound';
  private calendarTitlePath = '/content/title/calendar';

  // Layout
  navRef: AngularFirestoreCollection<NavContent>;
  footerRef: AngularFirestoreCollection<FooterContent>;
  headerRef: AngularFirestoreCollection<HeaderContent>;
  // Components
  generalRef: AngularFirestoreCollection<GeneralContent>;
  servicesRef: AngularFirestoreCollection<ServiceContent>;
  featuredRef: AngularFirestoreCollection<FeaturedContent>;
  latestnewsRef: AngularFirestoreCollection<LatestNewsContent>;
  latestworkRef: AngularFirestoreCollection<LatestWorkContent>;
  ctaRef: AngularFirestoreCollection<CtaContent>;
  galleryRef: AngularFirestoreCollection<GalleryContent>;
  calendarRef: AngularFirestoreCollection<CalendarContent>;
  newsRef: AngularFirestoreCollection<NewsContent>;
  contactcardsRef: AngularFirestoreCollection<ServiceContent>;
  contactformRef: AngularFirestoreCollection<ContactFormContent>;
  pagenotfoundRef: AngularFirestoreCollection<PageNotFoundContent>;
  // Titles
  hometitleRef: AngularFirestoreCollection<PageTitle>;
  portfoliotitleRef: AngularFirestoreCollection<PageTitle>;
  nestitleRef: AngularFirestoreCollection<PageTitle>;
  contacttitleRef: AngularFirestoreCollection<PageTitle>;
  pnftitleRef: AngularFirestoreCollection<PageTitle>;
  calendartitleRef: AngularFirestoreCollection<PageTitle>;

  /**
   * Contructor
   * @param db Angular Firestore
   */
  constructor(private db: AngularFirestore) {
    this.navRef = db.collection(this.navPath);
    this.footerRef = db.collection(this.footerPath);
    this.headerRef = db.collection(this.headerPath);
    this.generalRef = db.collection(this.generalPath);
    this.servicesRef = db.collection(this.servicesPath);
    this.featuredRef = db.collection(this.featuredPath);
    this.latestnewsRef = db.collection(this.latestnewsPath);
    this.latestworkRef = db.collection(this.latestworkPath);
    this.ctaRef = db.collection(this.ctaPath);
    this.galleryRef = db.collection(this.galleryPath);
    this.calendarRef = db.collection(this.calendarPath);
    this.newsRef = db.collection(this.newsPath);
    this.contactcardsRef = db.collection(this.contactcardsPath);
    this.contactformRef = db.collection(this.contactFormPath);
    this.pagenotfoundRef = db.collection(this.pagenotfoundPath);
    this.hometitleRef = db.collection(this.homeTitlePath);
    this.portfoliotitleRef = db.collection(this.portfolioTitlePath);
    this.nestitleRef = db.collection(this.newsTitlePath);
    this.contacttitleRef = db.collection(this.contactTitlePath);
    this.pnftitleRef = db.collection(this.pnfTitlePath);
    this.calendartitleRef = db.collection(this.calendarTitlePath);
  }

  /**
   * Forms
   */
  public getFormStyle(): string {
    return "standard";
  }
  public getFormStyles(): string[] {
    return [
      "legacy",
      "standard",
      "fill",
      "outline"
    ];
  }

  /**
   * General Content
   */
  public getGeneralContent(limit = 5): AngularFirestoreCollection<GeneralContent> {
    return this.db.collection(this.generalPath, ref => ref
      .orderBy('timestampCreated', 'desc')
      .limit(limit));
  }
  public saveGeneralContent(data: GeneralContent): any {
    data.timestampCreated = Date.now();
    return this.generalRef.add({ ...data });
  }

  /**
   * Nav Content
   */
  public getNavContent(limit = 5): AngularFirestoreCollection<NavContent> {
    return this.db.collection(this.navPath, ref => ref
      .orderBy('timestampCreated', 'desc')
      .limit(limit));
  }
  public saveNavContent(data: NavContent): any {
    data.timestampCreated = Date.now();
    data.navLinks = this.firebaseSerialize(data.navLinks);
    return this.navRef.add({ ...data });
  }

  /**
   * Footer Content
   */
  public getFooterContent(limit = 5): AngularFirestoreCollection<FooterContent> {
    return this.db.collection(this.footerPath, ref => ref
      .orderBy('timestampCreated', 'desc')
      .limit(limit));
  }
  public saveFooterContent(data: FooterContent): any {
    data.timestampCreated = Date.now();
    return this.footerRef.add({ ...data });
  }

  /**
   * Header Content
   */
  public getHeaderContent(limit = 5): AngularFirestoreCollection<HeaderContent> {
    return this.db.collection(this.headerPath, ref => ref
      .orderBy('timestampCreated', 'desc')
      .limit(limit));
  }
  public saveHeaderContent(data: HeaderContent): any {
    data.timestampCreated = Date.now();
    return this.headerRef.add({ ...data });
  }

  /**
   * Services Content
   */
  public getServicesContent(limit = 5): AngularFirestoreCollection<ServiceContent> {
    return this.db.collection(this.servicesPath, ref => ref
      .orderBy('timestampCreated', 'desc')
      .limit(limit));
  }
  public saveServicesContent(data: ServiceContent): any {
    data.timestampCreated = Date.now();
    data.services = this.firebaseSerialize(data.services);
    return this.servicesRef.add({ ...data });
  }

  /**
   * Featured Content
   */
  public getFeaturedContent(limit = 5): AngularFirestoreCollection<FeaturedContent> {
    return this.db.collection(this.featuredPath, ref => ref
      .orderBy('timestampCreated', 'desc')
      .limit(limit));
  }
  public saveFeaturedContent(data: FeaturedContent): any {
    data.timestampCreated = Date.now();
    return this.featuredRef.add({ ...data });
  }

  /**
   * News Content
   */
  public getLatestNewsContent(limit = 5): AngularFirestoreCollection<LatestNewsContent> {
    return this.db.collection(this.latestnewsPath, ref => ref
      .orderBy('timestampCreated', 'desc')
      .limit(limit));
  }
  public saveLatestNewsContent(data: LatestNewsContent): any {
    data.timestampCreated = Date.now();
    return this.latestnewsRef.add({ ...data });
  }

  /**
   * Work Content
   */
  public getLatestWorkContent(limit = 5): AngularFirestoreCollection<LatestWorkContent> {
    return this.db.collection(this.latestworkPath, ref => ref
      .orderBy('timestampCreated', 'desc')
      .limit(limit));
  }
  public saveLatestWorkContent(data: LatestWorkContent): any {
    data.timestampCreated = Date.now();
    return this.latestworkRef.add({ ...data });
  }

  /**
   * CTA Content
   */
  public getCtaContent(limit = 5): AngularFirestoreCollection<CtaContent> {
    return this.db.collection(this.ctaPath, ref => ref
      .orderBy('timestampCreated', 'desc')
      .limit(limit));
  }
  public saveCtaContent(data: CtaContent): any {
    data.timestampCreated = Date.now();
    return this.ctaRef.add({ ...data });
  }

  /**
   * Gallery Content
   */
  public getGalleryContent(limit = 5): AngularFirestoreCollection<GalleryContent> {
    return this.db.collection(this.galleryPath, ref => ref
      .orderBy('timestampCreated', 'desc')
      .limit(limit));
  }
  public saveGalleryContent(data: GalleryContent): any {
    data.timestampCreated = Date.now();
    return this.galleryRef.add({ ...data });
  }

  /**
   * Gallery Content
   */
  public getCalendarContent(limit = 5): AngularFirestoreCollection<CalendarContent> {
    return this.db.collection(this.calendarPath, ref => ref
      .orderBy('timestampCreated', 'desc')
      .limit(limit));
  }
  public saveCalendarContent(data: CalendarContent): any {
    data.timestampCreated = Date.now();
    return this.calendarRef.add({ ...data });
  }

  /**
   * News Content
   */
  public getNewsContent(limit = 5): AngularFirestoreCollection<NewsContent> {
    return this.db.collection(this.newsPath, ref => ref
      .orderBy('timestampCreated', 'desc')
      .limit(limit));
  }
  public saveNewsContent(data: NewsContent): any {
    data.timestampCreated = Date.now();
    return this.newsRef.add({ ...data });
  }

  /**
   * Contact cards Content
   */
  public getContactCardsContent(limit = 5): AngularFirestoreCollection<ServiceContent> {
    return this.db.collection(this.contactcardsPath, ref => ref
      .orderBy('timestampCreated', 'desc')
      .limit(limit));
  }
  public saveContactCardsContent(data: ServiceContent): any {
    data.services = this.firebaseSerialize(data.services);
    data.timestampCreated = Date.now();
    return this.contactcardsRef.add({ ...data });
  }

  /**
   * Contact form Content
   */
  public getContactFormContent(limit = 5): AngularFirestoreCollection<ContactFormContent> {
    return this.db.collection(this.contactFormPath, ref => ref
      .orderBy('timestampCreated', 'desc')
      .limit(limit));
  }
  public saveContactFormContent(data: ContactFormContent): any {
    data.timestampCreated = Date.now();
    return this.contactformRef.add({ ...data });
  }

  /**
   * Page not found Content
   */
  public getPageNotFoundContent(limit = 5): AngularFirestoreCollection<PageNotFoundContent> {
    return this.db.collection(this.pagenotfoundPath, ref => ref
      .orderBy('timestampCreated', 'desc')
      .limit(limit));
  }
  public savePageNotFoundContent(data: PageNotFoundContent): any {
    data.timestampCreated = Date.now();
    return this.pagenotfoundRef.add({ ...data });
  }

  /**
   * Page title Content
   */
  public getPageTitle(page: string, limit = 5): AngularFirestoreCollection<PageTitle> {
    switch (page) {
      case 'home':
        return this.db.collection(this.homeTitlePath, ref => ref
          .orderBy('timestampCreated', 'desc')
          .limit(limit));
      case 'portfolio':
        return this.db.collection(this.portfolioTitlePath, ref => ref
          .orderBy('timestampCreated', 'desc')
          .limit(limit));
      case 'news':
        return this.db.collection(this.newsTitlePath, ref => ref
          .orderBy('timestampCreated', 'desc')
          .limit(limit));
      case 'contact':
        return this.db.collection(this.contactTitlePath, ref => ref
          .orderBy('timestampCreated', 'desc')
          .limit(limit));
      case '404':
        return this.db.collection(this.pnfTitlePath, ref => ref
          .orderBy('timestampCreated', 'desc')
          .limit(limit));
      default:
        return null;
    }
  }
  public savePageTitle(page: string, data: PageTitle): any {
    data.timestampCreated = Date.now();
    switch (page) {
      case 'home':
        return this.hometitleRef.add({ ...data });
      case 'portfolio':
        return this.portfoliotitleRef.add({ ...data });
      case 'news':
        return this.nestitleRef.add({ ...data });
      case 'contact':
        return this.contacttitleRef.add({ ...data });
      case '404':
        return this.pnftitleRef.add({ ...data });
      case 'calendar':
        return this.pnftitleRef.add({ ...data });
      default:
        return null;
    }
  }

  /**
   * Serialize custom object to json
   * @param object Object to serialize
   * @returns Json serialized object
   */
  firebaseSerialize<T>(object: T) {
    return JSON.parse(JSON.stringify(object));
  }
}
