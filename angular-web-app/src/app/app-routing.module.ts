import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/_pages/home/home.component';
import { PortfolioComponent } from './components/_pages/portfolio/portfolio.component';
import { AboutComponent } from './components/_pages/about/about.component';
import { ContactComponent } from './components/_pages/contact/contact.component';
import { PaintingDetailComponent } from './components/_pages/painting-detail/painting-detail.component';
import { NewsComponent } from './components/_pages/news/news.component';
import { PageNotFoundComponent } from './components/_pages/page-not-found/page-not-found.component';
import { AdminComponent } from './components/_pages/admin/admin.component';
import { DashboardComponent } from './components/_admin/dashboard/dashboard.component';
import { LayoutNavigationComponent } from './components/_admin/layout-navigation/layout-navigation.component';
import { LayoutHeaderComponent } from './components/_admin/layout-header/layout-header.component';
import { LayoutFooterComponent } from './components/_admin/layout-footer/layout-footer.component';
import { PageHomeComponent } from './components/_admin/page-home/page-home.component';
import { PagePortfolioComponent } from './components/_admin/page-portfolio/page-portfolio.component';
import { PageNewsComponent } from './components/_admin/page-news/page-news.component';
import { PageContactComponent } from './components/_admin/page-contact/page-contact.component';
import { PaintingOverviewComponent } from './components/_admin/painting-overview/painting-overview.component';
import { PaintingAddComponent } from './components/_admin/painting-add/painting-add.component';
import { GeneralComponent } from './components/_admin/general/general.component';
import { NewsOverviewComponent } from './components/_admin/news-overview/news-overview.component';
import { NewsAddComponent } from './components/_admin/news-add/news-add.component';
import { PageNotFoundAdminComponent } from './components/_admin/page-not-found/page-not-found.component';
import { ManagerFilesComponent } from './components/_admin/manager-files/manager-files.component';
import { ManagerUsersComponent } from './components/_admin/manager-users/manager-users.component';
import { LoginComponent } from './components/_pages/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { PaintingEditComponent } from './components/_admin/painting-edit/painting-edit.component';
import { NewsEditComponent } from './components/_admin/news-edit/news-edit.component';
import { ManagerMessagesComponent } from './components/_admin/manager-messages/manager-messages.component';
import { CalendarComponent } from './components/_pages/calendar/calendar.component';
import { CalendarOverviewComponent } from './components/_admin/calendar-overview/calendar-overview.component';
import { CalendarAddComponent } from './components/_admin/calendar-add/calendar-add.component';
import { CalendarEditComponent } from './components/_admin/calendar-edit/calendar-edit.component';
import { PageCalendarComponent } from './components/_admin/page-calendar/page-calendar.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  // pages
  { path: 'home', component: HomeComponent, data: { animation: 'home' } },
  { path: 'portfolio', component: PortfolioComponent, data: { animation: 'portfolio' } },
  { path: 'calendar', component: CalendarComponent, data: { animation: 'calendar' } },
  { path: 'news', component: NewsComponent, data: { animation: 'news' } },
  { path: 'about', component: AboutComponent, data: { animation: 'about' } },
  { path: 'contact', component: ContactComponent, data: { animation: 'contact' } },
  { path: 'painting', component: PaintingDetailComponent, data: { animation: 'painting' } },
  { path: 'login', component: LoginComponent, data: { animation: 'login' } },
  // admin
  {
    path: 'admin', component: AdminComponent, data: { animation: 'admin' }, children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'general', component: GeneralComponent },
      { path: 'manager-files', component: ManagerFilesComponent },
      { path: 'manager-users', component: ManagerUsersComponent },
      { path: 'manager-messages', component: ManagerMessagesComponent },
      { path: 'layout-navigation', component: LayoutNavigationComponent },
      { path: 'layout-header', component: LayoutHeaderComponent },
      { path: 'layout-footer', component: LayoutFooterComponent },
      { path: 'page-home', component: PageHomeComponent },
      { path: 'page-portfolio', component: PagePortfolioComponent },
      { path: 'page-calendar', component: PageCalendarComponent },
      { path: 'page-news', component: PageNewsComponent },
      { path: 'page-contact', component: PageContactComponent },
      { path: 'page-not-found', component: PageNotFoundAdminComponent },
      { path: 'portfolio-overview', component: PaintingOverviewComponent },
      { path: 'portfolio-add', component: PaintingAddComponent },
      { path: 'portfolio-edit', component: PaintingEditComponent },
      { path: 'news-overview', component: NewsOverviewComponent },
      { path: 'news-add', component: NewsAddComponent },
      { path: 'news-edit', component: NewsEditComponent },
      { path: 'calendar-overview', component: CalendarOverviewComponent },
      { path: 'calendar-add', component: CalendarAddComponent },
      { path: 'calendar-edit', component: CalendarEditComponent },
    ], canActivate: [AuthGuard]
  },
  // page not found
  { path: 'page-not-found', component: PageNotFoundComponent, data: { animation: '404' } },
  // redirects
  { path: 'cms', redirectTo: 'admin/dashboard' },
  { path: '**', redirectTo: 'page-not-found' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top', relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
