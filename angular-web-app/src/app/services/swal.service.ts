import { Injectable } from '@angular/core';
import Swal, { SweetAlertResult } from 'sweetalert2/dist/sweetalert2.js';

@Injectable({
  providedIn: 'root'
})
export class SwalService {
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

  constructor() { }


  /**
   * Fires loading sweet alert
   * @param msg Message to display
   * @returns Promise<SweetAlertResult<any>>
   */
  loadingSwal(msg?: string): Promise<SweetAlertResult<any>> {
    return Swal.fire({
      allowEscapeKey: true,
      showConfirmButton: false,
      title: msg,
      icon: 'info',
      didOpen: () => {
        Swal.showLoading();
      },
      allowOutsideClick: this.focusAnimation,
    });
  }

  /**
   * Fires succes sweet alert
   * @param msg Message to display
   * @returns Promise<SweetAlertResult<any>>
   */
  successSwal(msg?: string): Promise<SweetAlertResult<any>> {
    return Swal.fire({
      title: 'Gelukt!',
      text: msg,
      icon: 'success',
      showConfirmButton: false,
      timer: 1500,
    });
  }

  /**
   * Fires error sweet alert
   * @param msg Message to display
   * @returns Promise<SweetAlertResult<any>>
   */
  errorSwal(msg?: string): Promise<SweetAlertResult<any>> {
    return Swal.fire({
      title: 'Mislukt!',
      text: msg,
      icon: 'error',
      showConfirmButton: false,
      timer: 1500,
    });
  }

  /**
   * Fires warning swal
   * @param msg Message to display
   * @returns Promise<SweetAlertResult<any>>
   */
  warningSwal(msg?: string): Promise<SweetAlertResult<any>> {
    return Swal.fire({
      title: 'Let op!',
      text: msg,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oke',
      cancelButtonText: 'Annuleer'
    });
  }
}
