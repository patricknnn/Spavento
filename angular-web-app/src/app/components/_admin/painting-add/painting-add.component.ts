import { Component, OnInit, ViewChild } from '@angular/core';
import { SwalComponent, SwalPortalTargets } from '@sweetalert2/ngx-sweetalert2';
import { Observable } from 'rxjs';
import { FileUpload } from 'src/app/models/fileupload';
import { Painting } from 'src/app/models/painting';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { PaintingService } from 'src/app/services/painting.service';
import { SwalService } from 'src/app/services/swal.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-painting-add',
  templateUrl: './painting-add.component.html',
  styleUrls: ['./painting-add.component.scss'],
})
export class PaintingAddComponent implements OnInit {
  @ViewChild('addPaintingForm') addPaintingForm;
  @ViewChild('thumbnailSwal') thumbnailSwal!: SwalComponent;
  @ViewChild('thumbnailOptions') thumbnailOptions: any;
  title = 'Toevoegen';
  subTitle = 'Portfolio';
  text = 'Gebruik onderstaand formulier om een schilderij toe te voegen aan het portfolio.';
  formStyle = 'fill';
  formColor = 'accent';
  painting: Painting;
  categories: string[];
  states: string[];
  paints: string[];
  materials: string[];
  selectedFiles: File[];
  percentage: Observable<number>;
  uploadCount = 0;
  formDisabled: boolean;
  focusAnimation = () => {
    const popup = Swal.getPopup();
    popup.classList.remove('swal2-show');
    setTimeout(() => {
      popup.classList.add('focus-animation');
    });
    setTimeout(() => {
      popup.classList.remove('focus-animation');
    }, 500);
    return false;
  };

  /**
   * Constructor
   * @param paintingService painting service
   */
  constructor(
    private paintingService: PaintingService,
    private uploadService: FileUploadService,
    private swalService: SwalService,
    public readonly swalTargets: SwalPortalTargets
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
    // disable form
    this.formDisabled = true;
    // loading swal
    this.swalService.loadingSwal("Afbeeldingen opslaan");
    // Upload files
    if (this.selectedFiles.length) {
      this.selectedFiles.forEach((file) => {
        const { downloadUrl, uploadProgress } = this.uploadService.pushFileToStorageAndReturnMetadata(new FileUpload(file));
        this.percentage = uploadProgress;
        downloadUrl.subscribe((downloadUrl) => {
          // add url to painting
          this.painting.images.push(downloadUrl);
          this.uploadCount++;
          // check if all files uploaded
          if (this.uploadCount == this.selectedFiles.length) {
            this.thumbnailSwal.fire().then((result) => {
              // save painting
              this.swalService.loadingSwal("Schilderij opslaan");
              this.paintingService.create(this.painting).then(() => {
                this.resetFormData();
                this.swalService.successSwal("Schilderij opgeslagen");
              });
            });
          }
        });
      });
    }
  }


  /**
   * Handles file select
   * @param event File select event
   */
  onFileSelect(event): void {
    this.selectedFiles.push(...event.addedFiles);
  }

  /**
   * Handles file remove
   * @param event File remove event
   */
  onFileRemove(event): void {
    this.selectedFiles.splice(this.selectedFiles.indexOf(event), 1);
  }

  /**
   * Sets painting thumbnail
   * @param event Click event
   * @param url Url of image
   */
  setThumbnail(event, url): void {
    // set correct url
    this.painting.thumbnail = url;
    // add class to selected element
    this.thumbnailOptions.nativeElement.querySelectorAll('.selected').forEach((option) => {
      option.classList.remove('selected');
    });
    event.target.parentElement.classList.add('selected');
  }

  /**
   * Clears form of data
   * Asks user for confirmation
   */
  resetForm() {
    this.swalService.warningSwal("Alle reeds ingevoerde data zal worden verwijderd").then((result) => {
      if (result.value) {
        this.resetFormData();
        this.swalService.successSwal("Formulier leeg gemaakt");
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.swalService.errorSwal("Formulier niet leeg gemaakt");
      }
    });
  }

  /**
   * Clears form data
   */
  resetFormData(): void {
    this.painting = new Painting(
      null,
      "Rolien Schrik",
      null,
      null,
      null,
      [],
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
    this.formDisabled = false;
    if (this.addPaintingForm) {
      this.addPaintingForm.reset();
    }
  }
}

