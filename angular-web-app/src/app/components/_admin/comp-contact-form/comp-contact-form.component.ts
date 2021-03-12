import { Component, OnInit } from '@angular/core';
import { ContentService } from 'src/app/services/content.service';
import { SwalService } from 'src/app/services/swal.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-comp-contact-form',
  templateUrl: './comp-contact-form.component.html',
  styleUrls: ['./comp-contact-form.component.scss']
})
export class CompContactFormComponent implements OnInit {

  constructor(private contentService: ContentService) { }

  ngOnInit(): void {
  }

  reset(): void {
  }

  setActive(input, e): void {
    e.checked ? input = true : input = false;
  }

}
