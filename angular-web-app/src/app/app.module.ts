import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './components/_layout/header/header.component';
import {FooterComponent} from './components/_layout/footer/footer.component';
import {HomeComponent} from './pages/home/home.component';
import {PortfolioComponent} from './pages/portfolio/portfolio.component';
import {AboutComponent} from './pages/about/about.component';
import {ContactComponent} from './pages/contact/contact.component';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NavComponent} from './components/_layout/nav/nav.component';
import {HeaderSmallComponent} from './components/_layout/header-small/header-small.component';
import {MaterialModule} from './modules/material/material.module';
import {FeaturedComponent} from './components/featured/featured.component';
import {LatestComponent} from './components/latest/latest.component';
import {CallToActionComponent} from './components/call-to-action/call-to-action.component';
import {GalleryComponent} from './components/gallery/gallery.component';
import {MapsComponent} from './components/maps/maps.component';
import {ContactCardComponent} from './components/contact-card/contact-card.component';
import {SectionTitleCenterComponent} from './components/section-title-center/section-title-center.component';
import {ServiceCardComponent} from './components/service-card/service-card.component';
import {NguCarouselModule} from '@ngu/carousel';
import {SectionTitleComponent} from './components/section-title/section-title.component';

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
    HeaderSmallComponent,
    FeaturedComponent,
    LatestComponent,
    CallToActionComponent,
    GalleryComponent,
    MapsComponent,
    ContactCardComponent,
    SectionTitleCenterComponent,
    ServiceCardComponent,
    SectionTitleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    NguCarouselModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
