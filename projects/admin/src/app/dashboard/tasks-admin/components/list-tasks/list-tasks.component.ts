import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AddTaskComponent } from '../add-task/add-task.component';
import { TasksService } from '../../services/tasks.service';
import { HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
export interface PeriodicElement {
  title: string;
  user: string;
  deadline: string;
  status: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {status:'Complete' , title: 'Hydrogen', user: "1.0079", deadline:"10-11-2022" },
  {status:'In-Prossing' , title: 'Helium', user: "4.0026", deadline:"10-11-2022" },
  {status:'Complete' , title: 'Lithium', user: "6.941", deadline:"10-11-2022" },
  {status:'Complete' , title: 'Beryllium', user: "9.0122", deadline:"10-11-2022" },
  {status:'Complete' , title: 'Boron', user: "10.811", deadline:"10-11-2022" },
  {status:'Complete' , title: 'Carbon', user: "12.010", deadline:"10-11-2022" },
  {status:'Complete' , title: 'Nitrogen', user: "14.006", deadline:"10-11-2022" },
  {status:'Complete' , title: 'Oxygen', user: "15.999", deadline:"10-11-2022" },
  {status:'Complete' , title: 'Fluorine', user: "18.998", deadline:"10-11-2022" },
  { status:'Complete' , title: 'Neon', user: "20.179", deadline:"10-11-2022" },
];
@Component({
  selector: 'app-list-tasks',
  templateUrl: './list-tasks.component.html',
  styleUrls: ['./list-tasks.component.scss']
})
export class ListTasksComponent implements OnInit {
  displayedColumns: string[] = ['position', 'title', 'user' ,'deadline','status', 'actions'];
  dataSource = ELEMENT_DATA;
  tasksFilter!:FormGroup
  users:any = [
    {name:"Moahmed" , id:1},
    {name:"Ali" , id:2},
    {name:"Ahmed" , id:3},
    {name:"Zain" , id:4},
  ]

  status:any = [
    {name:"Complete" , id:1},
    {name:"In-Prossing" , id:2},
  ]
  constructor(public dialog: MatDialog ,private fb:FormBuilder,private TaskService:TasksService,private Toast:ToastrService) { }

  ngOnInit(): void {
    this.createform();
    this.getAllTasks();
  }

  createform() {
    this.tasksFilter = this.fb.group({
      title:[''],
      userId:[''],
      fromDate:[''],
      toDate:['']
    })
  }

  getAllTasks() {
   
this.TaskService.getAllTasks().subscribe({
  next:(Response: { tasks: PeriodicElement[]; })=>{console.log(Response);
  this.dataSource=this.mappingTasks(Response.tasks);
  
  }
});
  }
  addTask() {
      const dialogRef = this.dialog.open(AddTaskComponent, {
        width: '750px',
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if(result) {
          console.log(result);
          this.getAllTasks()
        }
      })
  }

  mappingTasks(data:any[]){
    let newtasks=data.map(item=>{
      return {
        ...item,//spread operator
        user:item.userId.username,
      }
    })
    return newtasks;
  }
  UpdateTask(data:any){
    const dialogRef = this.dialog.open(AddTaskComponent, {
      width: '750px',
      data:data,
    });
  }
  DeleteTask(id:any){
    console.log(id);
    this.TaskService.DeleteTask(id).subscribe({
      next:Response=>{
        this.Toast.success('l','Deleted Suucessfully');
        this.getAllTasks();
      },
      error:error=>{
        this.Toast.error('l','error')
      }
    })
  }
}
