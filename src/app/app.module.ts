import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HttpClient } from '@angular/common/http';
import { LocalDateTimePipe } from '../shared/pipes/local-date-time.pipe';
import { MaterialModule } from '../shared/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    LocalDateTimePipe
  ],
  imports: [
    BrowserModule,   
    HttpClient,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers:[LocalDateTimePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }