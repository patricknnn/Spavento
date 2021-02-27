import { Component, OnInit, ViewChild } from '@angular/core';
import { Painting } from 'src/app/models/painting';
import { PaintingService } from 'src/app/services/painting.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

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
  isLinear = false;
  @ViewChild("stepper") stepper;
  painting = new Painting(null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
  categories: string[];
  states: string[];
  paints: string[];
  materials: string[];

  constructor(private paintingService: PaintingService) { }

  ngOnInit() {
    this.categories = this.paintingService.getCategories();
    this.states = this.paintingService.getStates();
    this.paints = this.paintingService.getPaints();
    this.materials = this.paintingService.getMaterials();
  }

  resetForm() {
    Swal.fire({
      title: 'Formulier leeg maken?',
      text: 'Alle reeds ingevoerde data zal worden verwijderd!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Reset',
      cancelButtonText: 'Annuleer',
    }).then((result) => {
      if (result.value) {
        this.stepper.reset();
        Swal.fire(
          'Succes!',
          'Formulier is leeg gemaakt!',
          'success'
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Geannuleerd', 
          'Formulier is niet leeg gemaakt!', 
          'error'
        );
      }
    });
  }
}
