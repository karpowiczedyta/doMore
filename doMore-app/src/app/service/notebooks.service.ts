import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Notebook } from 'src/app/model/notebook';
import { Note } from 'src/app/model/note';


@Injectable({
  providedIn: 'root'
})
export class NotebooksService {

  private GET_ALL_NOTEBOOKS_URL = "http://localhost:8082/notebooks/all";
  private POST_NOTEBOOK_URL =  "http://localhost:8082/notebooks";
  private DELETE_NOTEBOOK_URL = "http://localhost:8082/notebooks/";
  private UPDATE_NOTEBOOK_URL = "http://localhost:8082/notebooks/";

  private GET_ALL_NOTES_URL = "http://localhost:8082/notes/all";
  private GET_NOTES_BY_NOTEBOOK_URL = "http://localhost:8082/notes/byNotebook/";
  private POST_NOTE_URL = "http://localhost:8082/notes";
  private DELETE_NOTE_URL = "http://localhost:8082/notes/";
  private UPDATE_NOTE_URL = "http://localhost:8082/notes/";
  private GET_NOTE_BY_ID = "http://localhost:8082/notes/"



  constructor(private http: HttpClient) { }

  getAllNotebooks(): Observable<Notebook[]>{
    return this.http.get<Notebook[]>(this.GET_ALL_NOTEBOOKS_URL);
  }

  postNotebook(notebook: Notebook):  Observable<Notebook>{
    return this.http.post<Notebook>(this.POST_NOTEBOOK_URL,notebook);
  }

  deleteNotebook(id: number): Observable<any>{
    return this.http.delete<Notebook>(this.DELETE_NOTEBOOK_URL + id);
  }

  patchNotebook(notebook: Notebook): Observable<any> {
    return this.http.patch(this.UPDATE_NOTEBOOK_URL + notebook.id , notebook);
  }


  getAllNotes(): Observable<Note[]>{
    return this.http.get<Note[]>(this.GET_ALL_NOTES_URL);
  }

  deleteNote(id: number): Observable<any>{
    return this.http.delete(this.DELETE_NOTE_URL + id);
   }

   postNote(newNote: Note): Observable<Note>{
     return this.http.post<Note>(this.POST_NOTE_URL , newNote);
   }

   getNotesByNotebook(id: number){
    return this.http.get<Note[]>(this.GET_NOTES_BY_NOTEBOOK_URL + id);
   }

   patchNote(toUpdateNote: Note): Observable<Note>{
     return this.http.patch<Note>(this.UPDATE_NOTE_URL + toUpdateNote.id , toUpdateNote );
   }


}
