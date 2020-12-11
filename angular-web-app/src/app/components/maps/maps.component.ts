import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss']
})
export class MapsComponent implements OnInit {
  @Input() title: string;
  @Input() subtitle: string;
  @Input() location = "Oeverlanden+60,+9606+RR+Kropswolde";

  constructor() { }

  ngOnInit(): void {
  }

  getUrl(): string {
    return "https://maps.google.com/maps?q=" + this.location + "&t=&z=13&ie=UTF8&iwloc=&output=embed";
  }

}
