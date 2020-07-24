import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-section-title-center',
  templateUrl: './section-title-center.component.html',
  styleUrls: ['./section-title-center.component.scss']
})
export class SectionTitleCenterComponent implements OnInit {
  @Input() title: string;
  @Input() subTitle: string;

  constructor() { }

  ngOnInit(): void {
  }

}
