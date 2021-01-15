import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-call-to-action',
  templateUrl: './call-to-action.component.html',
  styleUrls: ['./call-to-action.component.scss']
})
export class CallToActionComponent implements OnInit {
  @Input() title: string;
  @Input() subTitle: string;
  @Input() buttonText: string;
  @Input() buttonLink: string;
  @Input() image: string;

  constructor() { }

  ngOnInit(): void {
  }

}
