import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ToasterService {
  constructor(private toastr: ToastrService) {}

  showSuccessTopRight(successMsg) {
    this.toastr.success(successMsg, 'Success', {
      closeButton: true,
      newestOnTop: true,
      positionClass: 'toast-top-right',
      titleClass: 'toast-title',
      messageClass: 'toast-message',
      timeOut: 1000,
      easing: 'ease-in',
    });
  }
}
