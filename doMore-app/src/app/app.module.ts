import { MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from "@angular/router";
import { FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';
import { NavigationComponent } from './navigation/navigation.component';
import { NotesComponent } from './notes/notes.component';
import { NoteTextFilterPipe } from './shared/note-text-filter.pipe';
import { SubjectsComponent } from './subjects/subjects.component';
import { AddEducationStageComponent } from './add-education-stage/add-education-stage.component';
import { EditRemoveEducationStageComponent } from './edit-remove-education-stage/edit-remove-education-stage.component';
import { EditRemoveSubjectComponent } from './edit-remove-subject/edit-remove-subject.component';
import { CounterUpTimmerComponent } from './counter-up-timer/counter-up-timmer.component';
import { CdTimerModule } from "angular-cd-timer";
import { SimpleNotificationsModule } from 'angular2-notifications';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReviewRecordsComponent } from './review-records/review-records.component';
import { CounterUpTimerTableComponent } from './counter-up-timer-table/counter-up-timer-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { EditCounterUpTimerInTableComponent } from './edit-counter-up-timer-in-table/edit-counter-up-timer-in-table.component';
import { DeleteBreakInTableComponent } from './delete-break-in-table/delete-break-in-table.component';
import { ChartsComponent } from './charts/charts.component';
import { PieChartsComponent } from './pie-charts/pie-charts.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { ChartsModule } from 'ng2-charts';
import { ChartsForSubjectComponent } from './chartsForSubject/charts.component';
import { ChartsForBreakComponent } from './chartsForBreak/charts.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { SettingsComponent } from './settings/settings.component';
import { GenaralAccountSettingsComponent } from './genaral-account-settings/genaral-account-settings.component';


const appRoutes: Routes = [
  {
    path: 'notes',
    component: NotesComponent
  },
  {
    path: 'addSubjects',
    component: SubjectsComponent
  },
  {
    path: 'addEducationStage',
    component: AddEducationStageComponent
  },
  {
    path: 'editions',
    component: EditRemoveEducationStageComponent
  },
  {
    path: 'modifyEducationStage',
    component: EditRemoveEducationStageComponent
  },
  {
    path: 'modifySubject',
    component: EditRemoveSubjectComponent
  },
  {
    path: 'startLearning',
    component: CounterUpTimmerComponent
  },
  {
    path: 'reviewRecords',
    component: ReviewRecordsComponent
  },
  {
    path: 'counterUpTimerTable',
    component: CounterUpTimerTableComponent
  },
  {
    path: 'breakTable',
    component: DeleteBreakInTableComponent
  },
  {
    path: 'dialog',
    component: EditCounterUpTimerInTableComponent
  },
  {
    path: 'charts',
    component: ChartsComponent
  },
  {
    path: 'chartsForSubject',
    component: ChartsForSubjectComponent,
  },
  {
    path: 'chartsForBreak',
    component: ChartsForBreakComponent,
  },
  {
    path: 'pieChart',
    component: PieChartsComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'registration',
    component: RegistrationComponent
  },
  {
    path: 'loginSucces',
    component: CounterUpTimmerComponent
  },
  {
    path: 'settings',
    component: GenaralAccountSettingsComponent
  },
  {
    path: 'changePassword',
    component: SettingsComponent
  },
  {
    path: '',
    component: LoginComponent,
    pathMatch: 'full'
  },

];

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    NotesComponent,
    NoteTextFilterPipe,
    SubjectsComponent,
    AddEducationStageComponent,
    EditRemoveEducationStageComponent,
    EditRemoveSubjectComponent,
    CounterUpTimmerComponent,
    ReviewRecordsComponent,
    CounterUpTimerTableComponent,
    EditCounterUpTimerInTableComponent,
    DeleteBreakInTableComponent,
    ChartsComponent,
    ChartsForSubjectComponent,
    ChartsForBreakComponent,
    PieChartsComponent,
    LoginComponent,
    RegistrationComponent,
    SettingsComponent,
    GenaralAccountSettingsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CdTimerModule,
    RouterModule.forRoot(appRoutes, { enableTracing: true }),
    SimpleNotificationsModule.forRoot(),
    BrowserAnimationsModule,
    MatTableModule,
    MatIconModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    ChartsModule
  ],
  providers: [{ provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } }],
  bootstrap: [AppComponent],
  entryComponents: [EditCounterUpTimerInTableComponent, ChartsComponent]
})
export class AppModule { }




