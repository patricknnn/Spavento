import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Editor } from 'ngx-editor';
import { map } from 'rxjs/operators';
import { CalendarItem } from 'src/app/models/calendaritem';
import { GeneralContent } from 'src/app/models/generalcontent';
import { CalendarService } from 'src/app/services/calendar.service';
import { ContentService } from 'src/app/services/content.service';
import { SwalService } from 'src/app/services/swal.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-calendar-edit',
  templateUrl: './calendar-edit.component.html',
  styleUrls: ['./calendar-edit.component.scss']
})
export class CalendarEditComponent implements OnInit, OnDestroy {
  @Input() calendarItem: CalendarItem;
  title = "Bewerken";
  subTitle = "Kalender";
  text = "Gebruik onderstaand formulier om een kalender item aan te passen.";
  generalContent: GeneralContent;
  formDisabled: boolean;
  editor: Editor;
  editorOutput = "";

  /**
   * Constructor
   * @param paintingService painting service
   */
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private calendarService: CalendarService,
    private contentService: ContentService,
    private swalService: SwalService,
  ) { }

  ngOnInit() {
    this.retrieveGeneralContent();
    this.editor = new Editor();
    this.resetFormData();
    if (!this.calendarItem) {
      let id = this.route.snapshot.paramMap.get('id');
      this.retrieveCalendarItem(id);
    }
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

  retrieveCalendarItem(id: string): void {
    this.calendarService.getById(id).snapshotChanges().pipe(
      map(c =>
        ({ id: c.payload.id, ...c.payload.data() })
      )
    ).subscribe(data => {
      this.calendarItem = data;
      this.editorOutput = data.description;
      if (!this.calendarItem) {
        this.goToDashboard();
      }
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
    //this.calendarItem.dateStart = Date.parse(this.calendarItem.dateStart.toString());
    //this.calendarItem.dateEnd = Date.parse(this.calendarItem.dateEnd.toString());
    // loading swal
    this.swalService.loadingSwal("Kalender item opslaan");
    // Save item
    this.saveItem();
  }

  saveItem(): void {
    this.calendarService.update(this.calendarItem.id, this.calendarItem).then(() => {
      this.resetFormData();
      this.swalService.successSwal("Kalender item opgeslagen");
      this.router.navigate(['/admin/calendar-overview']);
    });
  }

  /**
   * Clears form of data
   * Asks user for confirmation
   */
  resetForm() {
    this.swalService.promptSwal("Alle aangepaste data zal worden terug gezet").then((result) => {
      if (result.value) {
        this.resetFormData();
        this.retrieveCalendarItem(this.calendarItem.id);
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
    this.formDisabled = false;
  }

  /**
   * Navigates to dashboard
   */
  goToDashboard(): void {
    this.router.navigate(['/admin/dashboard']);
  }
}
