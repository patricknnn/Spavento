import { Component, OnInit } from '@angular/core';
import { ContentService } from 'src/app/services/content.service';
import { SwalService } from 'src/app/services/swal.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-comp-contact-cards',
  templateUrl: './comp-contact-cards.component.html',
  styleUrls: ['./comp-contact-cards.component.scss']
})
export class CompContactCardsComponent implements OnInit {

  constructor(private contentService: ContentService) { }

  ngOnInit(): void {
  }

}
