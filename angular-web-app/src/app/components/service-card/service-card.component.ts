import {Component, Input, OnInit} from '@angular/core';
import {Service} from '../../models/service';

@Component({
  selector: 'app-service-card',
  templateUrl: './service-card.component.html',
  styleUrls: ['./service-card.component.scss']
})
export class ServiceCardComponent implements OnInit {
  @Input() service: Service;

  constructor() { }

  ngOnInit(): void {
  }

}