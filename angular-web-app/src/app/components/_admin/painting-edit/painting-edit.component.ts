import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FileUpload } from 'src/app/models/fileupload';
import { Painting } from 'src/app/models/painting';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { PaintingService } from 'src/app/services/painting.service';
import { SwalService } from 'src/app/services/swal.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-painting-edit',
  templateUrl: './painting-edit.component.html',
  styleUrls: ['./painting-edit.component.scss']
})
export class PaintingEditComponent implements OnInit {
  @Input() painting: Painting;
  @ViewChild('thumbnailSwal') thumbnailSwal!: SwalComponent;
  @ViewChild('thumbnailOptions') thumbnailOptions: any;
  title = 'Aanpassen';
  subTitle = 'Portfolio';
  text = 'Gebruik onderstaand formulier om een schilderij aan te passen.';
  formStyle = "standard";
  formColor = "accent";
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
    private router: Router,
    private route: ActivatedRoute,
    private paintingService: PaintingService,
    private uploadService: FileUploadService,
    private swalService: SwalService
  ) { }

  ngOnInit() {
    this.resetFormData();
    if (!this.painting) {
      let id = this.route.snapshot.paramMap.get('id');
      this.retrievePainting(id);
    }
    this.categories = this.paintingService.getCategories();
    this.states = this.paintingService.getStates();
    this.paints = this.paintingService.getPaints();
    this.materials = this.paintingService.getMaterials();
  }

  /**
   * Handles form submit
   */
  onSubmit() {
    // disable form
    this.formDisabled = true;
    // Upload files
    if (this.selectedFiles.length) {
      // loading swal
      this.swalService.loadingSwal("Afbeeldingen opslaan");
      this.selectedFiles.forEach((file) => {
        const { downloadUrl, uploadProgress } = this.uploadService.pushFileToStorageAndReturnMetadata(new FileUpload(file));
        this.percentage = uploadProgress;
        downloadUrl.subscribe((downloadUrl) => {
          // add url to painting
          this.painting.images.push(downloadUrl);
          this.uploadCount++;
          // check if all files uploaded
          if (this.uploadCount == this.selectedFiles.length) {
            if (this.uploadCount == 1) {
              // set thumbnail
              this.painting.thumbnail = this.painting.images[0];
              this.updatePainting();
            } else {
              // let user choose thumbnail
              this.thumbnailSwal.fire().then((result) => {
                // save painting
                this.updatePainting();
              });
            }
          }
        });
      });
    } else {
      this.updatePainting();
    }
  }

  retrievePainting(id: string): void {
    this.paintingService.getById(id).snapshotChanges().pipe(
      map(c =>
        ({ id: c.payload.id, ...c.payload.data() })
      )
    ).subscribe(data => {
      this.painting = data;
      if (!this.painting) {
        this.goToDashboard();
      }
    });
  }

  updatePainting(): void {
    this.swalService.loadingSwal("Schilderij opslaan");
    this.paintingService.update(this.painting.id, this.painting).then(() => {
      this.resetFormData();
      this.swalService.successSwal("Schilderij opgeslagen");
      this.router.navigate(['/admin/portfolio-overview']);
    });
  }

  /**
   * Removes image from images
   * Asks user for confirmation
   */
  removeImage(image) {
    this.swalService.promptSwal("Afbeelding zal worden verwijderd").then((result) => {
      if (result.value) {
        const index: number = this.painting.images.indexOf(image);
        if (index !== -1) {
          this.painting.images.splice(index, 1);
        }
        this.swalService.successSwal("Afbeelding verwijderd");
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.swalService.cancelSwal("Afbeelding niet verwijderd");
      }
    });
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
    this.swalService.promptSwal("Alle aangepaste data zal worden terug gezet").then((result) => {
      if (result.value) {
        this.resetFormData();
        this.retrievePainting(this.painting.id);
        this.swalService.successSwal("Data terug gezet");
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.swalService.cancelSwal("Data niet terug gezet");
      }
    });
  }

  /**
   * Clears form data
   */
  resetFormData(): void {
    this.selectedFiles = [];
    this.uploadCount = 0;
    this.percentage = null;
    this.formDisabled = false;
  }

  goToDashboard(): void {
    this.router.navigate(['/admin/dashboard']);
  }
}
