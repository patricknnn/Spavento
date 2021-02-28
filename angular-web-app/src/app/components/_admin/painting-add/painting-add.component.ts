import { UrlResolver } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { FileUpload } from 'src/app/models/fileupload';
import { Painting } from 'src/app/models/painting';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { ModalService } from 'src/app/services/modal.service';
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
    'Gebruik onderstaand formulier om een schilderij toe te voegen aan het portfolio.';
  formStyle = 'fill';
  formColor = 'accent';
  @ViewChild('addPaintingForm') addPaintingForm;
  @ViewChild('modalContent') modalContent;
  painting: Painting;
  categories: string[];
  states: string[];
  paints: string[];
  materials: string[];
  selectedFiles: File[];
  fileUrls: string[];
  percentage: Observable<number>;
  uploadCount = 0;

  /**
   * Constructor
   * @param paintingService painting service
   */
  constructor(
    private paintingService: PaintingService,
    private uploadService: FileUploadService,
    private modalService: ModalService
  ) { }

  ngOnInit() {
    this.categories = this.paintingService.getCategories();
    this.states = this.paintingService.getStates();
    this.paints = this.paintingService.getPaints();
    this.materials = this.paintingService.getMaterials();
    this.resetFormData();
  }

  /**
   * Handles form submit
   */
  onSubmit() {
    console.log('submitting');
    // Upload images and wait for response
  }

  /**
   * Handles file select
   * @param event File select event
   */
  onFileSelect(event): void {
    this.selectedFiles.push(...event.addedFiles);
    this.uploadFiles();
  }

  /**
   * Handles file remove
   * @param event File remove event
   */
  onFileRemove(event): void {
    this.selectedFiles.splice(this.selectedFiles.indexOf(event), 1);
  }

  /**
   * Uploads files
   */
  uploadFiles(): void {
    if (this.selectedFiles.length) {
      // loop files
      this.selectedFiles.forEach((file, i) => {
        // Upload file and subscribe to url result
        const { downloadUrl, uploadProgress } = this.uploadService.pushFileToStorageAndReturnMetadata(new FileUpload(file));
        this.percentage = uploadProgress;
        downloadUrl.subscribe((downloadUrl) => {
          // add url to array
          this.fileUrls.push(downloadUrl);
          this.uploadCount++;
          // check if all files uploaded
          if (this.uploadCount == this.selectedFiles.length) {
            this.selectThumbnail();
          }
        });
      });
    }
  }


  /**
   * Handles submit completion
   */
  onSubmitComplete(): void {
    this.resetFormData();
    Swal.fire({
      title: 'Gelukt!',
      text: 'Schilderij opgeslagen.',
      icon: 'success',
      showConfirmButton: false,
      timer: 1500,
    });
  }

  /**
   * Lets user select thumbnail image
   */
  selectThumbnail(): void {
    console.log(this.fileUrls);
    this.modalService.openModal(this.modalContent);
  }

  /**
   * Clears form of data
   * Asks user for confirmation
   */
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
        this.resetFormData();
        Swal.fire({
          title: 'Gelukt!',
          text: 'Formulier leeg gemaakt.',
          icon: 'success',
          showConfirmButton: false,
          timer: 1500,
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          title: 'Geannuleerd!',
          text: 'Formulier niet leeg gemaakt.',
          icon: 'error',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  }

  /**
   * Clears form data
   */
  resetFormData(): void {
    this.painting = new Painting(
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
    this.selectedFiles = [];
    this.uploadCount = 0;
    this.percentage = null;
    this.selectedFiles = [];
    this.fileUrls = [];
    if (this.addPaintingForm) {
      this.addPaintingForm.reset();
    }
  }
}
