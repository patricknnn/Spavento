import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-header-small',
  templateUrl: './header-small.component.html',
  styleUrls: ['./header-small.component.scss']
})
export class HeaderSmallComponent implements OnInit {
  @Input() title: string;
  @Input() subTitle: string;

  constructor() { }

  ngOnInit(): void {
  }

}
