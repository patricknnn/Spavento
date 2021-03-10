import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { ContactFormContent } from '../models/contactformcontent';
import { CtaContent } from '../models/ctacontent';
import { FeaturedContent } from '../models/featuredcontent';
import { FooterContent } from '../models/footercontent';
import { GalleryContent } from '../models/gallerycontent';
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
  private navPath = '/nav';
  private footerPath = '/footer';
  private headerPath = '/header';
  private servicesPath = '/services';
  private featuredPath = '/featured';
  private latestnewsPath = '/featured';
  private latestworkPath = '/featured';
  private ctaPath = '/featured';
  private galleryPath = '/featured';
  private newsPath = '/news';
  private contactcardsPath = '/news';
  private contactFormPath = '/news';
  private pagenotfoundPath = '/news';
  private homeTitlePath = '/hometitle';
  private portfolioTitlePath = '/portfoliotitle';
  private newsTitlePath = '/newstitle';
  private contactTitlePath = '/contacttitle';
  private pnfTitlePath = '/pnftitle';

  navRef: AngularFirestoreCollection<NavContent>;
  footerRef: AngularFirestoreCollection<FooterContent>;
  headerRef: AngularFirestoreCollection<HeaderContent>;
  servicesRef: AngularFirestoreCollection<ServiceContent>;
  featuredRef: AngularFirestoreCollection<FeaturedContent>;
  latestnewsRef: AngularFirestoreCollection<LatestNewsContent>;
  latestworkRef: AngularFirestoreCollection<LatestWorkContent>;
  ctaRef: AngularFirestoreCollection<CtaContent>;
  galleryRef: AngularFirestoreCollection<GalleryContent>;
  newsRef: AngularFirestoreCollection<NewsContent>;
  contactcardsRef: AngularFirestoreCollection<ServiceContent>;
  contactformRef: AngularFirestoreCollection<ContactFormContent>;
  pagenotfoundRef: AngularFirestoreCollection<PageNotFoundContent>;
  hometitleRef: AngularFirestoreCollection<PageTitle>;
  portfoliotitleRef: AngularFirestoreCollection<PageTitle>;
  nestitleRef: AngularFirestoreCollection<PageTitle>;
  contacttitleRef: AngularFirestoreCollection<PageTitle>;
  pnftitleRef: AngularFirestoreCollection<PageTitle>;

  constructor(private db: AngularFirestore) {
    this.navRef = db.collection(this.navPath);
    this.footerRef = db.collection(this.footerPath);
    this.headerRef = db.collection(this.headerPath);
  }

  /**
   * Layout content
   */
  public getNavContent(): AngularFirestoreCollection<NavContent> {
    return this.db.collection(this.navPath, ref => ref
      .orderBy('timestampCreated')
      .limit(1));
  }
  public saveNavContent(data: NavContent): any {
    data.timestampCreated = Date.now();
    data.navLinks = this.firebaseSerialize(data.navLinks);
    return this.navRef.add({ ...data });
  }

  // Footer
  public getFooterContent(): AngularFirestoreCollection<FooterContent> {
    return this.db.collection(this.footerPath, ref => ref
      .orderBy('timestampCreated')
      .limit(1));
  }
  public saveFooterContent(data: FooterContent): any {
    data.timestampCreated = Date.now();
    return this.footerRef.add({ ...data });
  }

  // Header
  public getHeaderContent(): AngularFirestoreCollection<HeaderContent> {
    return this.db.collection(this.headerPath, ref => ref
      .orderBy('timestampCreated')
      .limit(1));
  }
  public saveHeaderContent(data: HeaderContent): any {
    data.timestampCreated = Date.now();
    return this.headerRef.add({ ...data });
  }

  /**
   * Page content
   */
  public getServicesContent(): AngularFirestoreCollection<ServiceContent> {
    return this.db.collection(this.servicesPath, ref => ref
      .orderBy('timestampCreated')
      .limit(1));
  }
  public saveServicesContent(data: ServiceContent): any {
    data.timestampCreated = Date.now();
    return this.servicesRef.add({ ...data });
  }

  // Featured
  public getFeaturedContent(): AngularFirestoreCollection<FeaturedContent> {
    return this.db.collection(this.featuredPath, ref => ref
      .orderBy('timestampCreated')
      .limit(1));
  }
  public saveFeaturedContent(data: FeaturedContent): any {
    data.timestampCreated = Date.now();
    return this.featuredRef.add({ ...data });
  }

  // News
  public getLatestNewsContent(): AngularFirestoreCollection<LatestNewsContent> {
    return this.db.collection(this.latestnewsPath, ref => ref
      .orderBy('timestampCreated')
      .limit(1));
  }
  public saveLatestNewsContent(data: LatestNewsContent): any {
    data.timestampCreated = Date.now();
    return this.latestnewsRef.add({ ...data });
  }

  // Work
  public getLatestWorkContent(): AngularFirestoreCollection<LatestWorkContent> {
    return this.db.collection(this.latestworkPath, ref => ref
      .orderBy('timestampCreated')
      .limit(1));
  }
  public saveLatestWorkContent(data: LatestWorkContent): any {
    data.timestampCreated = Date.now();
    return this.latestworkRef.add({ ...data });
  }

  // CTA
  public getCtaContent(): AngularFirestoreCollection<CtaContent> {
    return this.db.collection(this.ctaPath, ref => ref
      .orderBy('timestampCreated')
      .limit(1));
  }
  public saveCtaContent(data: CtaContent): any {
    data.timestampCreated = Date.now();
    return this.ctaRef.add({ ...data });
  }

  // Gallery
  public getGalleryContent(): AngularFirestoreCollection<GalleryContent> {
    return this.db.collection(this.galleryPath, ref => ref
      .orderBy('timestampCreated')
      .limit(1));
  }
  public saveGalleryContent(data: GalleryContent): any {
    data.timestampCreated = Date.now();
    return this.galleryRef.add({ ...data });
  }

  // News
  public getNewsContent(): AngularFirestoreCollection<NewsContent> {
    return this.db.collection(this.newsPath, ref => ref
      .orderBy('timestampCreated')
      .limit(1));
  }
  public saveNewsContent(data: NewsContent): any {
    data.timestampCreated = Date.now();
    return this.newsRef.add({ ...data });
  }

  // Contact cards
  public getContactCardsContent(): AngularFirestoreCollection<ServiceContent> {
    return this.db.collection(this.contactcardsPath, ref => ref
      .orderBy('timestampCreated')
      .limit(1));
  }
  public saveContactCardsContent(data: ServiceContent): any {
    data.timestampCreated = Date.now();
    return this.contactcardsRef.add({ ...data });
  }

  // Contact form
  public getContactFormContent(): AngularFirestoreCollection<ContactFormContent> {
    return this.db.collection(this.contactFormPath, ref => ref
      .orderBy('timestampCreated')
      .limit(1));
  }
  public saveContactFormContent(data: ContactFormContent): any {
    data.timestampCreated = Date.now();
    return this.contactformRef.add({ ...data });
  }

  // Page not found
  public getPageNotFoundContent(): AngularFirestoreCollection<PageNotFoundContent> {
    return this.db.collection(this.pagenotfoundPath, ref => ref
      .orderBy('timestampCreated')
      .limit(1));
  }
  public savePageNotFoundContent(data: PageNotFoundContent): any {
    data.timestampCreated = Date.now();
    return this.pagenotfoundRef.add({ ...data });
  }

  // Page title
  public getPageTitle(page: string): AngularFirestoreCollection<PageTitle> {
    let path: string;
    switch (page) {
      case 'home':
        path = this.homeTitlePath;
      case 'portfolio':
        path = this.portfolioTitlePath;
      case 'news':
        path = this.newsTitlePath;
      case 'contact':
        path = this.contactTitlePath;
      case '404':
        path = this.pnfTitlePath;
      default:
        break;
    }
    if (path) {
      return this.db.collection(path, ref => ref
        .orderBy('timestampCreated')
        .limit(1));
    }
  }

  public savePageTitle(page: string, data: PageTitle): any {
    let ref: AngularFirestoreCollection<any>;
    switch (page) {
      case 'home':
        ref = this.hometitleRef;
      case 'portfolio':
        ref = this.portfoliotitleRef;
      case 'news':
        ref = this.nestitleRef;
      case 'contact':
        ref = this.contacttitleRef;
      case '404':
        ref = this.pnftitleRef;
      default:
        break;
    }
    data.timestampCreated = Date.now();
    return ref.add({ ...data });
  }

  firebaseSerialize<T>(object: T) {
    return JSON.parse(JSON.stringify(object));
  }
}
