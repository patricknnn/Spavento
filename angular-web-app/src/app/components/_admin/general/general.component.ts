import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss']
})
export class GeneralComponent implements OnInit {
  title = "Algemeen";
  subTitle = "Admin";
  text = "Hier zijn alle algemene instellingen te vinden.";

  constructor() { }

  ngOnInit(): void {
  }

}
