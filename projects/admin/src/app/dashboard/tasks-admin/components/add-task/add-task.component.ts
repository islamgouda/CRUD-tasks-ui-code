import { Component, OnInit,Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TasksService } from '../../services/tasks.service';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {
newTaskForm!:FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data:any,
    private fb:FormBuilder ,
     public dialog: MatDialogRef<AddTaskComponent> ,
      public matDialog:MatDialog,
      private taskService:TasksService,
      private Toaster:ToastrService) { }

  users:any = [
    {name:"Moahmed" , id:1},
    {name:"Ali" , id:2},
    {name:"Ahmed" , id:3},
    {name:"Zain" , id:4},
    {name:"Admin",id:'64edf63fcf242e598a1d86fc'},
  ]
  ngOnInit(): void {
    this.createForm();
    if(this.data){
      console.log(this.data)
      debugger
      //this.newTaskForm.patchValue(this.data);
       this.newTaskForm=this.fb.group({
     title: [this.data?.title||'',Validators.required],
     userId:[this.data?.userId._id||'',Validators.required],
     image:[this.data?.image||'',Validators.required],
     description:[this.data?.description||'',Validators.required],
     deadline:[this.data?.deadline.split('-').reverse().join('-')||'',Validators.required]
    })
    }
  }
  createForm(){
    this.newTaskForm=this.fb.group({
     title: ['',Validators.required],
     userId:['',Validators.required],
     image:['',Validators.required],
     description:['',Validators.required],
     deadline:['',Validators.required]
    })
  }
  createTask(){
    
   
    
    let formData=this.prepareFormData();
    console.log(formData)
    /*=new FormData();
    formData.append('title',this.newTaskForm.value['title']);
    formData.append('userId',this.newTaskForm.value['userId'])
    formData.append('image',this.newTaskForm.value['image'])
    formData.append('description',this.newTaskForm.value['description'])
    formData.append('deadline',this.newTaskForm.value['deadline'])*/
    this.taskService.CreateTask(formData).subscribe({
      next:Response=>{
     //console.log(Response.massage);
        this.Toaster.success('log',Response.massage);
        this.dialog.close(true);
      },
      error:error=>{
        console.log(error);
        this.Toaster.error('log',error.error.massage)
      }
      
    })
    
  }

  UpdateTask(){
    let formData=this.prepareFormData();
    this.taskService.UpdateTask(this.data._id,this.newTaskForm.value).subscribe({
      next:Response=>{
     //console.log(Response.massage);
        this.Toaster.success('log',Response.massage);
        this.dialog.close(true);
      },
      error:error=>{
        console.log(error);
        this.Toaster.error('log',error.error.massage)
      }
      
    })
    
  }

  prepareFormData(){
    let newDeadline=moment(this.newTaskForm.value['deadline']).format('DD-MM-YYYY');
  //  this.newTaskForm.get('deadline')?.setValue(newDate);
    let formData=new FormData();
    Object.entries(this.newTaskForm.value).forEach(([key,value]:any)=>{
      
      if(key=='deadline'){
        formData.append(key,newDeadline);
      }else{
        formData.append(key,value);
      }
//console.log(key,value);
    });
return formData;
  }
  filname:string="";
  selectImage(event:any){
    let items=event.target.value.split('\\');
    this.filname=items[items.length-1];
    this.newTaskForm.get('image')?.setValue(event.target.files[0])
    console.log(event);
  }
}
