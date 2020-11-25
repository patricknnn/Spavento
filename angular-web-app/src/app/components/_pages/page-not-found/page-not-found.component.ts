import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit {
  title = "Whoops, 404"
  subTitle = "Sorry, the page you are looking for does not exist."

  constructor(private location: Location, private router: Router) { }

  ngOnInit(): void {
  }

  goBack(): void {
    this.location.back();
  }

  goToHome(): void {
    this.router.navigate(["home"]);
  }

}
