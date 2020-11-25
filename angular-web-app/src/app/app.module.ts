import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/_layout/header/header.component';
import { FooterComponent } from './components/_layout/footer/footer.component';
import { HomeComponent } from './components/_pages/home/home.component';
import { PortfolioComponent } from './components/_pages/portfolio/portfolio.component';
import { AboutComponent } from './components/_pages/about/about.component';
import { ContactComponent } from './components/_pages/contact/contact.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './components/_layout/nav/nav.component';
import { MaterialModule } from './modules/material/material.module';
import { FeaturedComponent } from './components/featured/featured.component';
import { LatestComponent } from './components/latest/latest.component';
import { CallToActionComponent } from './components/call-to-action/call-to-action.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { MapsComponent } from './components/maps/maps.component';
import { ContactCardComponent } from './components/contact-card/contact-card.component';
import { SectionTitleCenterComponent } from './components/section-title-center/section-title-center.component';
import { ServiceCardComponent } from './components/service-card/service-card.component';
import { NguCarouselModule } from '@ngu/carousel';
import { SectionTitleComponent } from './components/section-title/section-title.component';
import { PaintingDetailComponent } from './components/_pages/painting-detail/painting-detail.component';
import { CarouselImgComponent } from './components/carousel-img/carousel-img.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NewsComponent } from './components/_pages/news/news.component';
import { NewsCardComponent } from './components/news-card/news-card.component';
import { LatestNewsComponent } from './components/latest-news/latest-news.component';
import { InfoCardComponent } from './components/info-card/info-card.component';
import { PaintingCardComponent } from './components/painting-card/painting-card.component';
import { PageNotFoundComponent } from './components/_pages/page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    PortfolioComponent,
    AboutComponent,
    ContactComponent,
    PageNotFoundComponent,
    NavComponent,
    FeaturedComponent,
    LatestComponent,
    CallToActionComponent,
    GalleryComponent,
    MapsComponent,
    ContactCardComponent,
    SectionTitleCenterComponent,
    ServiceCardComponent,
    SectionTitleComponent,
    PaintingDetailComponent,
    CarouselImgComponent,
    NewsComponent,
    NewsCardComponent,
    LatestNewsComponent,
    InfoCardComponent,
    PaintingCardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    NguCarouselModule,
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
