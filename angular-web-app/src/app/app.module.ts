import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
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
import { ClickOutsideDirective } from './directives/click-outside.directive';
import { SafePipe } from 'src/safe-pipe.pipe';
import { DashboardComponent } from './components/_admin/dashboard/dashboard.component';
import { PaintingOverviewComponent } from './components/_admin/painting-overview/painting-overview.component';
import { PaintingAddComponent } from './components/_admin/painting-add/painting-add.component';
import { AdminComponent } from './components/_pages/admin/admin.component';
import { SidenavComponent } from './components/_admin/sidenav/sidenav.component';
import { PageHomeComponent } from './components/_admin/page-home/page-home.component';
import { PagePortfolioComponent } from './components/_admin/page-portfolio/page-portfolio.component';
import { PageNewsComponent } from './components/_admin/page-news/page-news.component';
import { PageContactComponent } from './components/_admin/page-contact/page-contact.component';
import { LayoutNavigationComponent } from './components/_admin/layout-navigation/layout-navigation.component';
import { LayoutHeaderComponent } from './components/_admin/layout-header/layout-header.component';
import { LayoutFooterComponent } from './components/_admin/layout-footer/layout-footer.component';
import { NewsAddComponent } from './components/_admin/news-add/news-add.component';
import { NewsOverviewComponent } from './components/_admin/news-overview/news-overview.component';
import { CompServicesComponent } from './components/_admin/comp-services/comp-services.component';
import { CompFeaturesComponent } from './components/_admin/comp-features/comp-features.component';
import { CompLatestNewsComponent } from './components/_admin/comp-latest-news/comp-latest-news.component';
import { CompLatestWorkComponent } from './components/_admin/comp-latest-work/comp-latest-work.component';
import { CompCtaComponent } from './components/_admin/comp-cta/comp-cta.component';
import { CompContactCardsComponent } from './components/_admin/comp-contact-cards/comp-contact-cards.component';
import { CompContactFormComponent } from './components/_admin/comp-contact-form/comp-contact-form.component';
import { PageNotFoundAdminComponent } from './components/_admin/page-not-found/page-not-found.component';
import { CompHeaderComponent } from './components/_admin/comp-header/comp-header.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from 'src/environments/environment';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { ManagerFilesComponent } from './components/_admin/manager-files/manager-files.component';
import { ManagerUsersComponent } from './components/_admin/manager-users/manager-users.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { CompGalleryComponent } from './components/_admin/comp-gallery/comp-gallery.component';
import { CompNewsComponent } from './components/_admin/comp-news/comp-news.component';
import { LoginComponent } from './components/_pages/login/login.component';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { PaintingEditComponent } from './components/_admin/painting-edit/painting-edit.component';
import { NewsEditComponent } from './components/_admin/news-edit/news-edit.component';
import { LoadingComponent } from './components/_admin/loading/loading.component';
import { ManagerMessagesComponent } from './components/_admin/manager-messages/manager-messages.component';
import { NgxEditorModule } from 'ngx-editor';
import { GeneralComponent } from './components/_admin/general/general.component';
import { ToolbarComponent } from './components/_admin/toolbar/toolbar.component';
import { LoaderComponent } from './components/loader/loader.component';
import { BackToTopComponent } from './components/back-to-top/back-to-top.component';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { CalendarComponent } from './components/_pages/calendar/calendar.component';
import { CalendarCardComponent } from './components/calendar-card/calendar-card.component';
import { CalendarAddComponent } from './components/_admin/calendar-add/calendar-add.component';
import { CalendarEditComponent } from './components/_admin/calendar-edit/calendar-edit.component';
import { CalendarOverviewComponent } from './components/_admin/calendar-overview/calendar-overview.component';
import { PageCalendarComponent } from './components/_admin/page-calendar/page-calendar.component';
import { CompCalendarComponent } from './components/_admin/comp-calendar/comp-calendar.component';
import { DynamicFormComponent } from './components/_forms/dynamic-form/dynamic-form.component';

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
    ClickOutsideDirective,
    SafePipe,
    DashboardComponent,
    PaintingOverviewComponent,
    PaintingAddComponent,
    AdminComponent,
    SidenavComponent,
    ToolbarComponent,
    PageHomeComponent,
    PagePortfolioComponent,
    PageNewsComponent,
    PageContactComponent,
    LayoutNavigationComponent,
    LayoutHeaderComponent,
    LayoutFooterComponent,
    GeneralComponent,
    NewsAddComponent,
    NewsOverviewComponent,
    CompServicesComponent,
    CompFeaturesComponent,
    CompLatestNewsComponent,
    CompLatestWorkComponent,
    CompCtaComponent,
    CompContactCardsComponent,
    CompContactFormComponent,
    PageNotFoundAdminComponent,
    CompHeaderComponent,
    ManagerFilesComponent,
    ManagerUsersComponent,
    CompGalleryComponent,
    CompNewsComponent,
    LoginComponent,
    PaintingEditComponent,
    NewsEditComponent,
    LoadingComponent,
    ManagerMessagesComponent,
    LoaderComponent,
    BackToTopComponent,
    CalendarComponent,
    CalendarCardComponent,
    CalendarAddComponent,
    CalendarEditComponent,
    CalendarOverviewComponent,
    PageCalendarComponent,
    CompCalendarComponent,
    DynamicFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    NgbModule,
    NgxDropzoneModule,
    NgxEditorModule,
    SweetAlert2Module.forRoot({ provideSwal: () => import('sweetalert2/dist/sweetalert2.js') }),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule.enablePersistence(),
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
