import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/components/login/login.component';


const routes: Routes = [
 
  
  {path:'login', 
  component:LoginComponent
  //loadChildren: () => import(`./auth/auth.module`).then(m => m.AuthModule)
  },
  
  {path:'', 
  loadChildren: () => import(`./dashboard/dashboard.module`).then(m => m.DashboardModule)
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes ,  { useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
