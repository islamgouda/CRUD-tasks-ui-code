import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Login } from '../../context/DTo';
import { LoginService } from '../../services/login.service';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  LoginForm!:FormGroup;
  constructor(
    private fb:FormBuilder,
    private loginSerive:LoginService,
    private toast:ToastrService,
    private router:Router,
    //private spinner: NgxSpinnerService
    ) {
    this.createForm();
   }

  ngOnInit() {
    
  }

  createForm(){
    this.LoginForm=this.fb.group({
      email:['admin@admin.com',Validators.required],//,Validators.email],
      password:['12345'],//,Validators.required,Validators.minLength(3),Validators.maxLength(20)],
      role:['admin'],
    })
  }
login(){
  //debugger
 // this.spinner.show();
  const log:Login={
    email: this.LoginForm.value['email'],
    password:this.LoginForm.value['password'],
    role:this.LoginForm.value['role'],
  }
  this.loginSerive.Login(log).subscribe(
    {
      next:Response=>{
        localStorage.setItem("token",Response.token)
        this.router.navigate(['/tasks']);
        this.toast.success("sucess","log");
       // this.spinner.hide();
      },
        
      error:error=>{
        this.toast.error("error","log");
       // this.spinner.hide();
      }
      
        
    }
    
    
  )

}

}
