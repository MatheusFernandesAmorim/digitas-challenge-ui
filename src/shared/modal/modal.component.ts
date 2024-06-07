import { Component } from '@angular/core';
import { MaterialModule } from '../material/material.module';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TasksService } from '../services/tasks.service';
import { Inject } from '@angular/core';
import { ComumService } from '../services/comum.service';
import { NgFor, NgIf } from '@angular/common';
import moment from 'moment';

export const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [MaterialModule, FormsModule, ReactiveFormsModule, NgFor, NgIf],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class ModalComponent {
  hasId: boolean = false;
  taskForm: FormGroup;

  listStatus: string[] = [
    'Draft',
    'Doing',
    'Delayed',
    'Done',
    'Deleted',
  ];


  constructor(private modal: MatDialogRef<ModalComponent>
    , private formBuilder: FormBuilder
    , private comumService: ComumService
    , private tasksService: TasksService
    , @Inject(MAT_DIALOG_DATA) public data: any) 
    {

    this.taskForm = this.formBuilder.group({
      id: { disabled: true, value: '' },
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      starts: [{ disabled: true, value: '', required: true }, Validators.required],
      ends: [{ disabled: true, value: '', required: true }, Validators.required],
      status: { value: '' },
    });
  }

  ngOnInit(){
    this.taskForm.patchValue(this.data);
    this.hasId = this.data;
  }

  dateFormat(date: string): string{
    let dateFormated = moment(date).format('YYYY-MM-DDTHH:mm:ss');
    return dateFormated;
  }

  saveTask() {
    if (this.taskForm.valid) {
      this.taskForm.value.starts = this.dateFormat(this.taskForm.value.starts);
      this.taskForm.value.ends = this.dateFormat(this.taskForm.value.ends);

      if (this.data) {
        this.taskForm.value.id = this.data.id;
        this.tasksService.Update(this.taskForm.value).subscribe({
          next: () => {
            this.comumService.openSnackBar('The task was updated!');
            this.modal.close(true);
            this.taskForm.reset();
          },
          error: (err: any) => {
            this.comumService.openSnackBar(err.error);
          },
        });
      } else {
        this.tasksService.Add(this.taskForm.value).subscribe({
          next: () => {
            this.comumService.openSnackBar('The task was added!');
            this.modal.close(true);
            this.taskForm.reset();
          },
          error: (err: any) => {
            this.comumService.openSnackBar(err.error);
          },
        });
      }
    }
  }

  cancel(){
    this.modal.close(true);
    this.taskForm.reset();
  }
}
