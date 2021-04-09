import { Injectable } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';
import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class NotificationsAllService {

  constructor(private service: NotificationsService) { }


  onSuccess(message: any) {
    this.service.success('Success', message, {
      position: ['bottom', 'right'],
      timeOut: 3000,
      animate: 'fade',
      showProgressBar: true
    });
  }

  onError(message: any) {
    this.service.error('Error', message, {
      position: ['bottom', 'right'],
      timeOut: 3000,
      animate: 'fade',
      showProgressBar: true
    });
  }

  openSweetAlertError(message: any) {
    Swal.fire(
      'Error!',
      message,
      'error'
    )
  }

  openSweetAlertWarning(message: any) {
    Swal.fire(
      'Warning!',
      message,
      'warning'
    )
  }


  opensweetalert() {
    Swal.fire({
      title: 'Are you sure that you want to delete this record from your list?',
      text: 'You will not be able to recover this record!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
      } else if (result.dismiss === Swal.DismissReason.cancel) {

      }
    })
  }
}
