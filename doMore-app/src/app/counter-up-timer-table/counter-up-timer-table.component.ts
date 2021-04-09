import { Component, Injectable, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CounterUpTimer } from '../model/counter-time-up';
import { CounterUpTimerService } from '../service/counter-up-timer.service';
import { NotificationsAllService } from '../service/notifications.service';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { RegistrationService } from '../service/registration.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-counter-up-timer-table',
  templateUrl: './counter-up-timer-table.component.html',
  styleUrls: ['./counter-up-timer-table.component.css']
})
export class CounterUpTimerTableComponent implements OnInit {

  id: number = 0;
  display: string = "false";
  counterUpTimerList: CounterUpTimer[] = [];
  listData: MatTableDataSource<any> = new MatTableDataSource;
  displayedColumns: string[] = ['Education stage', 'Class name',
    'Year', 'Subject', 'Date', 'Start time', 'End Time', 'Time', 'actions'];

    logout(){
      this.registration.logout().subscribe(res => {
        console.log("logging out successfully");
        this.router.navigate(['/login']);
      },err => {
        this.serviceNotification.openSweetAlertError("Ann error has occured when while logging out");
      });
    }

  @ViewChild(MatSort) sort!: MatSort;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private serviceCounterUpTimer: CounterUpTimerService, private serviceNotificiation: NotificationsAllService,
    private dialog: MatDialog, private serviceNotification: NotificationsAllService,
    private registration: RegistrationService,private router: Router) { }

  ngOnInit(): void {

    this.serviceCounterUpTimer.getAllCounterUpTimer().subscribe(
      res => {
        this.counterUpTimerList = res;
        this.listData = new MatTableDataSource(this.counterUpTimerList);
        this.listData.sort = this.sort;
        this.listData.paginator = this.paginator;
      },
      err => {
        this.serviceNotificiation.openSweetAlertError("An error has occured when getting the records from counter-up-timer!");
      }
    );

  }

  updateList() {
    this.serviceCounterUpTimer.getAllCounterUpTimer().subscribe(
      res => {
        this.counterUpTimerList = res;
        this.listData = new MatTableDataSource(this.counterUpTimerList);
        this.listData.sort = this.sort;
        this.listData.paginator = this.paginator;
      },
      err => {
        this.serviceNotificiation.openSweetAlertError("An error has occured when getting the records from counter-up-timer!");
      }
    );

  }

  onEdit(row: CounterUpTimer) {
    this.display = 'true';
    this.id = row.id;
  }

  onDelete(row: CounterUpTimer) {
    Swal.fire({
      title: 'Are you sure that you want to delete this record?',
      text: 'You will not be able to recover this record!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.serviceCounterUpTimer.deleteCounterUpTimer(row.id).subscribe(
          res => {
            let indexOfNotebook = this.counterUpTimerList.indexOf(row);
            this.counterUpTimerList.splice(indexOfNotebook, 1);
            this.listData = new MatTableDataSource(this.counterUpTimerList);
            this.listData.sort = this.sort;
            this.listData.paginator = this.paginator;
          },
          err => {
            this.serviceNotification.openSweetAlertError("Could not delete this record!");
          }
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {

      }
    })
  }

  onDeleteAll(){
    Swal.fire({
      title: 'Are you sure that you want to delete all records?',
      text: 'You will not be able to recover this records!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.serviceCounterUpTimer.deleteAllCounterUpTimer().subscribe(
          res => {

            this.counterUpTimerList.splice(0,this.counterUpTimerList.length);
            this.listData = new MatTableDataSource(this.counterUpTimerList);

          },
          err => {
            this.serviceNotificiation.openSweetAlertError("Could not delete records!");
          }
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {

      }
    })
  }

}



