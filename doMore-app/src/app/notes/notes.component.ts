import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Notebook } from 'src/app/model/notebook';
import Swal from 'sweetalert2';
import { Note } from '../model/note';
import { NotebooksService } from '../service/notebooks.service';
import { NotificationsAllService } from '../service/notifications.service';
import { RegistrationService } from '../service/registration.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  notebooks: Notebook[] = [];
  notes: Note[] = [];
  notebooksLength: number = this.notebooks.length;
  selectedNoteboook: Notebook | undefined;
  searchText: string = "";

  constructor(private service: NotebooksService, private serviceNotificiation: NotificationsAllService,
    private registration: RegistrationService,private router: Router) { }

  ngOnInit(): void {
    this.getAllNotebooks();
    this.getAllNotes();
  }

  logout(){
    this.registration.logout().subscribe(res => {
      console.log("logging out successfully");
      this.router.navigate(['/login']);
    },err => {
      this.serviceNotificiation.openSweetAlertError("Ann error has occured when while logging out");
    });
  }

  public getAllNotebooks() {

    this.service.getAllNotebooks().subscribe(
      res => {
        this.notebooks = res;
      },
      err => {
        this.serviceNotificiation.openSweetAlertError("An error has occured when getting the notebooks!");
      }
    );
  }

  createNotebook() {
    let newNotebook: Notebook = {
      name: 'New notebook',
      id: this.notebooksLength + 1,
      ndNotes: 0,
    }

    this.service.postNotebook(newNotebook).subscribe(
      res => {
        newNotebook.id = res.id;
        this.notebooks.push(newNotebook);
      },
      err => {
        this.serviceNotificiation.openSweetAlertError("An error has occured while saving the notebook!");
      }
    );
  }

  deleteNotebook(notebook: Notebook) {
    Swal.fire({
      title: 'Are you sure that you want to delete notebook?',
      text: 'You will not be able to recover this record!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.service.deleteNotebook(notebook.id).subscribe(
          res => {
            let indexOfNotebook = this.notebooks.indexOf(notebook);
            this.notebooks.splice(indexOfNotebook, 1);
          },
          err => {
            alert("Could not delete notebook");
          }
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {

      }
    })
  }

  updateNotebook(notebook: Notebook) {
    this.service.patchNotebook(notebook).subscribe(
      res => {
        this.serviceNotificiation.onSuccess("Successfully updated this notebook");
      },
      err => {
        this.serviceNotificiation.openSweetAlertError("An error has occured while updating the notebook! ");
      }
    );
  }

  getAllNotes() {
    this.service.getAllNotes().subscribe(
      res => {
        this.notes = res;
      },
      err => {
        this.serviceNotificiation.openSweetAlertError("Error occured while when getting the notes ");
      }
    );
  }

  deleteNote(note: Note) {
    Swal.fire({
      title: 'Are you sure that you want to delete this note?',
      text: 'You will not be able to recover this record!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.service.deleteNote(note.id).subscribe(
          res => {
            let indexOfNote = this.notes.indexOf(note);
            this.notes.splice(indexOfNote, 1);
          },
          err => {
            this.serviceNotificiation.openSweetAlertError("An error has occured deleting the note");
          }
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {

      }
    })
  }

  createNote(notebookId: number) {
    let newNote: Note = {
      id: 0,
      title: "New Note",
      text: "Write some text in here",
      lastModifiedOn: new Date(),
      notebookId: notebookId
    };
    this.service.postNote(newNote).subscribe(
      res => {
        newNote.id = res.id;
        newNote.lastModifiedOn = res.lastModifiedOn;
        this.notes.push(newNote);
      },
      err => {
        this.serviceNotificiation.openSweetAlertError("An error occured while saving the notes. Check if you have selected the notebook to which you want to assign your note  ");
        ;
      }
    );
  }

  updateNote(note: Note) {
    this.service.patchNote(note).subscribe(
      res => {
        this.notes.filter(nL => {
          if (nL.id = res.id) {
            nL.lastModifiedOn = res.lastModifiedOn;
          }
        })
        this.serviceNotificiation.onSuccess("Successfully updated!");
      },
      err => {
        this.serviceNotificiation.openSweetAlertError("An error has occured while updating the note! ");
      }
    );
  }

  selectedNotebook(notebook: Notebook) {
    this.selectedNoteboook = notebook;
    this.service.getNotesByNotebook(notebook.id).subscribe(
      res => {
        this.notes = res;
      },
      err => {
        this.serviceNotificiation.openSweetAlertError("An error has occured while getting the notes");
      }
    );
  }

  selectAllNotes() {
    this.selectedNoteboook = undefined;
    this.getAllNotes();
  }




















}
