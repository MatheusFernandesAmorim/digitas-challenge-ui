import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  readonly ApiUrl = "https://localhost:44375/api/Tasks";

  readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private httpClient: HttpClient) { }

  public GetAll(): Observable<Task[]>{
    return this.httpClient.get<Task[]>(`${this.ApiUrl}/GetAll`);
  }

  public GetById(id: number): Observable<Task>{
    return this.httpClient.get<Task>(`${this.ApiUrl}/GetById?id=${id}`);
  }

  public Add(task: Task): Observable<Task> {
    return this.httpClient.post<any>(`${this.ApiUrl}/Add`, task, this.httpOptions);
  }

  public Update(task: Task): Observable<Task> {
    return this.httpClient.put<any>(`${this.ApiUrl}/Update`, task, this.httpOptions);
  }

  public Remove(id: number): Observable<Task> {
    return this.httpClient.put<any>(`${this.ApiUrl}/Remove?id=${id}`, this.httpOptions);
  }
}
