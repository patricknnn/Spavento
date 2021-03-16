import {Component, Input, OnInit} from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-section-title',
  templateUrl: './section-title.component.html',
  styleUrls: ['./section-title.component.scss']
})
export class SectionTitleComponent implements OnInit {
  @Input() title: string;
  @Input() subTitle: string;
  @Input() text: string;
  @Input() link: string;
  @Input() linkIcon: string;
  @Input() modal: any;
  @Input() modalIcon: string;
  @Input() admin = false;

  constructor(private modalService: ModalService) { }

  ngOnInit(): void {
  }

  openModal(content) {
    this.modalService.openModal(content);
  }

}
