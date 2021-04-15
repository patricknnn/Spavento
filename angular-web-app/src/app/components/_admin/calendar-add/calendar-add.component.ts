import { Component, OnDestroy, OnInit } from '@angular/core';
import { CalendarItem } from 'src/app/models/calendaritem';
import { GeneralContent } from 'src/app/models/generalcontent';
import { Editor } from 'ngx-editor';
import { CalendarService } from 'src/app/services/calendar.service';
import { SwalService } from 'src/app/services/swal.service';
import { ContentService } from 'src/app/services/content.service';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-calendar-add',
  templateUrl: './calendar-add.component.html',
  styleUrls: ['./calendar-add.component.scss']
})
export class CalendarAddComponent implements OnInit, OnDestroy {
  title = "Toevoegen";
  subTitle = "Kalender";
  text = "Gebruik deze pagina om items aan de kalender toe te voegen.";
  calendarItem: CalendarItem;
  generalContent: GeneralContent;
  formDisabled: boolean;
  editor: Editor;
  editorOutput = "";
  startDate: Date;
  endDate: Date;

  /**
   * Constructor
   * @param paintingService painting service
   */
  constructor(
    private calendarService: CalendarService,
    private contentService: ContentService,
    private swalService: SwalService
  ) { }

  ngOnInit() {
    this.retrieveGeneralContent();
    this.editor = new Editor();
    this.resetFormData();
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }

  retrieveGeneralContent(): void {
    this.contentService.getGeneralContent(1).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.generalContent = data[0];
    });
  }

  onEditorContentChange(content): void {
    this.editorOutput = content;
  }

  /**
   * Handles form submit
   */
  onSubmit() {
    // disable form
    this.formDisabled = true;
    // set newsitem variables
    this.calendarItem.description = this.editorOutput;
    this.calendarItem.dateStart = this.startDate.toDateString();
    this.calendarItem.dateEnd = this.endDate.toDateString();
    this.calendarItem.active = true;
    // loading swal
    this.swalService.loadingSwal("Kalender item opslaan");
    // Save item
    this.saveItem();
  }

  saveItem(): void {
    this.calendarService.create(this.calendarItem).then(() => {
      this.resetFormData();
      this.swalService.successSwal("Kalender item opgeslagen");
    });
  }

  /**
   * Clears form of data
   * Asks user for confirmation
   */
  resetForm() {
    this.swalService.promptSwal("Alle reeds ingevoerde data zal worden verwijderd").then((result) => {
      if (result.value) {
        this.resetFormData();
        this.swalService.successSwal("Formulier leeg gemaakt");
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.swalService.cancelSwal("Formulier niet leeg gemaakt");
      }
    });
  }

  /**
   * Clears form data
   */
  resetFormData(): void {
    this.calendarItem = new CalendarItem();
    this.calendarItem.author = "Rolien Schrik";
    this.formDisabled = false;
  }
}
