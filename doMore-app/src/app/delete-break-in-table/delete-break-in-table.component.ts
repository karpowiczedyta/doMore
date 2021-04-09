import { Break } from './../model/break';
import { MatSort } from '@angular/material/sort';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { CounterUpTimerService } from '../service/counter-up-timer.service';
import { NotificationsAllService } from '../service/notifications.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { RegistrationService } from '../service/registration.service';

@Component({
  selector: 'app-delete-break-in-table',
  templateUrl: './delete-break-in-table.component.html',
  styleUrls: ['./delete-break-in-table.component.css']
})
export class DeleteBreakInTableComponent implements OnInit {

  id: number = 0;
  display: string = "false";
  breakList: Break[] = [];
  listData: MatTableDataSource<any> = new MatTableDataSource;
  displayedColumns: string[] = ['Date','Start time', 'End Time', 'Time','actions'];


  @ViewChild(MatSort) sort!: MatSort ;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private serviceCounterUpTimer: CounterUpTimerService,private serviceNotificiation: NotificationsAllService
    ,private registration: RegistrationService,private router: Router ) { }

  ngOnInit(): void {
    this.serviceCounterUpTimer.getAllBreaks().subscribe(
      res => {
        this.breakList = res;
        this.listData = new MatTableDataSource(this.breakList);
        this.listData.sort = this.sort;
        this.listData.paginator = this.paginator;
      },
      err => {
        this.serviceNotificiation.openSweetAlertError("An error has occured when getting the records connected with your break!");
      }
    );
  }

  logout(){
    this.registration.logout().subscribe(res => {
      console.log("logging out successfully");
      this.router.navigate(['/login']);
    },err => {
      this.serviceNotificiation.openSweetAlertError("Ann error has occured when while logging out");
    });
  }

  onDelete(row: Break){
    Swal.fire({
      title: 'Are you sure that you want to delete this record?',
      text: 'You will not be able to recover this record!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.serviceCounterUpTimer.deleteBreak(row.id).subscribe(
          res => {
            let indexOfNotebook = this.breakList.indexOf(row);
            this.breakList.splice(indexOfNotebook,1);
            this.listData = new MatTableDataSource(this.breakList);
            this.listData.sort = this.sort;
            this.listData.paginator = this.paginator;
          },
          err => {
            this.serviceNotificiation.openSweetAlertError("Could not delete this record!");
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
        this.serviceCounterUpTimer.deleteAllBreak().subscribe(
          res => {

            this.breakList.splice(0,this.breakList.length);
            this.listData = new MatTableDataSource(this.breakList);

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
