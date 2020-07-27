import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-section-title',
  templateUrl: './section-title.component.html',
  styleUrls: ['./section-title.component.scss']
})
export class SectionTitleComponent implements OnInit {
  @Input() title: string;
  @Input() subTitle: string;
  @Input() link: string;
  @Input() text: string;

  constructor() { }

  ngOnInit(): void {
  }

}
