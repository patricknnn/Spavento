import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {HomeComponent} from './components/_pages/home/home.component';
import {PortfolioComponent} from './components/_pages/portfolio/portfolio.component';
import {AboutComponent} from './components/_pages/about/about.component';
import {ContactComponent} from './components/_pages/contact/contact.component';
import {PaintingDetailComponent} from './components/_pages/painting-detail/painting-detail.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent, data: {animation: 'home'}},
  {path: 'portfolio', component: PortfolioComponent, data: {animation: 'portfolio'}},
  {path: 'about', component: AboutComponent, data: {animation: 'about'}},
  {path: 'contact', component: ContactComponent, data: {animation: 'contact'}},
  {path: 'painting', component: PaintingDetailComponent, data: {animation: 'painting'}},
  {path: 'page-not-found', component: PageNotFoundComponent, data: {animation: 'page-not-found'}},
  {path: '**', redirectTo: 'page-not-found'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
