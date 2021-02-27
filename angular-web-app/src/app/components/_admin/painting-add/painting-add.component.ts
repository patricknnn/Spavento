import { Component, OnInit, ViewChild } from '@angular/core';
import { FileUpload } from 'src/app/models/fileupload';
import { Painting } from 'src/app/models/painting';
import { PaintingService } from 'src/app/services/painting.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-painting-add',
  templateUrl: './painting-add.component.html',
  styleUrls: ['./painting-add.component.scss'],
})
export class PaintingAddComponent implements OnInit {
  title = 'Toevoegen';
  subTitle = 'Portfolio';
  text =
    'Gebruik deze pagina om een schilderij toe te voegen aan het portfolio.';
  formStyle = 'fill';
  formColor = 'accent';
  @ViewChild('addPaintingForm') addPaintingForm;
  painting = new Painting(
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null
  );
  categories: string[];
  states: string[];
  paints: string[];
  materials: string[];
  selectedFiles: File[] = [];
  currentFileUpload: FileUpload;

  constructor(private paintingService: PaintingService) { }

  ngOnInit() {
    this.categories = this.paintingService.getCategories();
    this.states = this.paintingService.getStates();
    this.paints = this.paintingService.getPaints();
    this.materials = this.paintingService.getMaterials();
  }

  onSubmit() {
    console.log('submitting');
  }

  onFileSelect(event): void {
    this.selectedFiles.push(...event.addedFiles);
  }

  onFileRemove(event): void {
    this.selectedFiles.splice(this.selectedFiles.indexOf(event), 1);
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
        this.addPaintingForm.reset();
        Swal.fire({
          title: 'Gelukt!',
          text: 'Formulier leeg gemaakt.',
          icon: 'success',
          showConfirmButton: false,
          timer: 1500
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          title: 'Geannuleerd!',
          text: 'Formulier niet leeg gemaakt.',
          icon: 'error',
          showConfirmButton: false,
          timer: 1500
        });
      }
    });
  }
}
