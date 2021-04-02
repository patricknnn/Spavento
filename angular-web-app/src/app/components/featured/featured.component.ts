import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalService } from 'src/app/services/modal.service';
import { FeaturedContent } from 'src/app/models/featuredcontent';

@Component({
  selector: 'app-featured',
  templateUrl: './featured.component.html',
  styleUrls: ['./featured.component.scss']
})
export class FeaturedComponent implements OnInit {
  @Input() featured: FeaturedContent;
  @Input() elevation: string;

  constructor() { }

  ngOnInit(): void {
  }

}
