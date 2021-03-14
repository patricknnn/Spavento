import { Component, OnInit } from '@angular/core';
import { LoginForm } from 'src/app/models/loginform';
import { AuthService } from 'src/app/services/auth.service';
import { SwalService } from 'src/app/services/swal.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-manager-users',
  templateUrl: './manager-users.component.html',
  styleUrls: ['./manager-users.component.scss']
})
export class ManagerUsersComponent implements OnInit {
  title = "Gebruikers";
  subTitle = "Beheer";
  text = "Hier is een overzicht van alle gebruikers te vinden. Om gebruikers toe te voegen kan je gebruik maken van het formulier.";
  formStyles: string[];
  formStyle = "standard";
  formColor = "accent";
  form: LoginForm;

  constructor(
    private swalService: SwalService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.retrieveData();
    this.form = new LoginForm();
  }

  onSubmit() {
    this.swalService.loadingSwal("toevoegen");
    this.authService.SignUp(this.form.email, this.form.password).then(() => {
      this.swalService.successSwal("toegevoegd");
    });
  }

  retrieveData(): void {
  }

  /**
   * Clears form of data
   * Asks user for confirmation
   */
  resetForm() {
    this.swalService.promptSwal("Alle veranderingen zullen worden teruggedraaid").then((result) => {
      if (result.value) {
        this.retrieveData();
        this.swalService.successSwal("Veranderingen teruggedraaid");
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.swalService.cancelSwal("Veranderingen niet teruggedraaid");
      }
    });
  }
}
