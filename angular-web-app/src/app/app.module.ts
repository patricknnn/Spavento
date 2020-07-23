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
import { ContentTitleComponent } from './components/content-title/content-title.component';
import { FeaturedComponent } from './components/featured/featured.component';
import { LatestComponent } from './components/latest/latest.component';
import { CallToActionComponent } from './components/call-to-action/call-to-action.component';
import { CallToActionDividerComponent } from './components/call-to-action-divider/call-to-action-divider.component';
import { ServicesComponent } from './components/services/services.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { MapsComponent } from './components/maps/maps.component';

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
    ContentTitleComponent,
    FeaturedComponent,
    LatestComponent,
    CallToActionComponent,
    CallToActionDividerComponent,
    ServicesComponent,
    GalleryComponent,
    MapsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
