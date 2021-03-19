import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { GeneralContent } from 'src/app/models/generalcontent';
import { LoginForm } from 'src/app/models/loginform';
import { PageTitle } from 'src/app/models/pagetitle';
import { AuthService } from 'src/app/services/auth.service';
import { ContentService } from 'src/app/services/content.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  pageTitle: PageTitle;
  loginFormModel: LoginForm;
  generalContent: GeneralContent;
  recoverMail: string;

  constructor(
    private authService: AuthService,
    private contentService: ContentService,
    private modalService: ModalService
  ) { }

  ngOnInit(): void {
    this.retrieveGeneralContent();
    this.pageTitle = new PageTitle();
    this.pageTitle.title = "Login";
    this.pageTitle.subTitle = "Material admin";
    this.loginFormModel = new LoginForm();
    this.loginFormModel.email = "";
    this.loginFormModel.password = "";
  }

  onSubmit(): void {
    this.authService.signIn(this.loginFormModel.email, this.loginFormModel.password);
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

  /**
   * Open modal
   * @param content Modal content
   */
  openModal(content): void {
    this.modalService.openModal(content);
  }

  resetPassword() {
    if (this.recoverMail) {
      this.authService.forgotPassword(this.recoverMail);
    }
  }

}
