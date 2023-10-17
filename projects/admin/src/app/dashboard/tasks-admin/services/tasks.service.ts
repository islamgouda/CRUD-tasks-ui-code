import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { createTask } from '../../Context/createTask';
import { Observable } from 'rxjs';
import { environment } from 'projects/admin/src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private http:HttpClient) { }
  getAllTasks():any{
  //  let headers=new HttpHeaders();
   // headers= headers.append('Authorization',`Bearer `+localStorage.getItem('token'));
    return this.http.get(environment.baseApi+"/tasks/all-tasks")
  }
  CreateTask(addTask:any):Observable<any>{
    debugger
    return this.http.post(environment.baseApi+"/tasks/add-task",addTask);
    
  }
  UpdateTask(id:any,updateTask:any):Observable<any>{
    debugger
    return this.http.put(environment.baseApi+"/tasks/edit-task/"+id,updateTask);
    
  }
  DeleteTask(id:any):Observable<any>
  {
   return this.http.delete(environment.baseApi+"/tasks/delete-task/"+id);
  }
}
