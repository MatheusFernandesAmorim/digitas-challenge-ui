import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LocalDateTimePipe } from '../shared/pipes/local-date-time.pipe';
import { MaterialModule } from '../shared/material/material.module';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../shared/modal/modal.component';
import { Task } from '../shared/models/task';
import { TasksService } from '../shared/services/tasks.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ComumService } from '../shared/services/comum.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MaterialModule, LocalDateTimePipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'DigitasChallenge';
  displayedColumns: string[] = ['id', 'name', 'description', 'starts', 'ends', 'status', 'actions'];
  
  dataSource!: MatTableDataSource<Task>;  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog
    , private comumService: ComumService
    , private tasksService: TasksService){
    this.dataSource = new MatTableDataSource<Task>();
  }  

  ngAfterViewInit() {
    this.getTasks();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
 
  openModal(data: any){
    const modal = this.dialog.open(ModalComponent, {data});
    modal.afterClosed().subscribe({
      next: (val) => 
      {
        if(val){
          this.getTasks();
        }        
      }
    });
  }

  getTasks(){
    this.tasksService.GetAll().subscribe(response => 
      {     
        this.dataSource.data = response
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });    
  }

  removeTask(id: number){
    this.tasksService.Remove(id).subscribe({
      next: () => 
      {
        this.comumService.openSnackBar('The task was removed!');        
        this.getTasks();
      },
      error: (err: any) => {
        this.comumService.openSnackBar(err.error);
      },
    })
  }
}