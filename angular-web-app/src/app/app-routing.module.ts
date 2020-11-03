import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HomeComponent } from './components/_pages/home/home.component';
import { PortfolioComponent } from './components/_pages/portfolio/portfolio.component';
import { AboutComponent } from './components/_pages/about/about.component';
import { ContactComponent } from './components/_pages/contact/contact.component';
import { PaintingDetailComponent } from './components/_pages/painting-detail/painting-detail.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  // pages
  { path: 'home', component: HomeComponent, data: { animation: 'masthead' } },
  { path: 'portfolio', component: PortfolioComponent, data: { animation: 'smallhead' } },
  { path: 'about', component: AboutComponent, data: { animation: 'smallhead' } },
  { path: 'contact', component: ContactComponent, data: { animation: 'smallhead' } },
  { path: 'painting', component: PaintingDetailComponent, data: { animation: 'smallhead' } },
  // page not found
  { path: 'page-not-found', component: PageNotFoundComponent, data: { animation: 'smallhead' } },
  { path: '**', redirectTo: 'page-not-found' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
