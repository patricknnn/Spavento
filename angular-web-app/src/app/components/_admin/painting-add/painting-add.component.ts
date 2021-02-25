import { Component, OnInit, ViewChild } from '@angular/core';
import { MatVerticalStepper } from '@angular/material/stepper';
import { Painting } from 'src/app/models/painting';
import { ModalService } from 'src/app/services/modal.service';
import { PaintingService } from 'src/app/services/painting.service';

@Component({
  selector: 'app-painting-add',
  templateUrl: './painting-add.component.html',
  styleUrls: ['./painting-add.component.scss']
})
export class PaintingAddComponent implements OnInit {
  title = "Toevoegen";
  subTitle = "Portfolio";
  text = "Gebruik deze pagina om een schilderij toe te voegen aan het portfolio.";
  formStyle = "standard";
  formColor = "accent";
  @ViewChild('stepper') stepper;
  isLinear = false;
  painting = new Painting(null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
  categories: string[];
  states: string[];
  paints: string[];
  materials: string[];

  constructor(private paintingService: PaintingService, private modalService: ModalService) { }

  ngOnInit() {
    this.categories = this.paintingService.getCategories();
    this.states = this.paintingService.getStates();
    this.paints = this.paintingService.getPaints();
    this.materials = this.paintingService.getMaterials();
  }

  resetStepper(content) {
    const dialogRef = this.modalService.confirmModal(content);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.stepper.reset();
      }
    });
  }
}
