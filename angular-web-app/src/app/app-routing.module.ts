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
  {path: 'home', component: HomeComponent},
  {path: 'portfolio', component: PortfolioComponent},
  {path: 'about', component: AboutComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'painting', component: PaintingDetailComponent},
  {path: '**', component: PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
