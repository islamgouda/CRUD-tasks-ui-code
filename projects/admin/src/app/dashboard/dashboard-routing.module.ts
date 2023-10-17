import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { ListTasksComponent } from './tasks-admin/components/list-tasks/list-tasks.component';

const routes: Routes = [
  {
    path:'',
    component:LayoutComponent,
    children:[
      
      {path:'users', 
      loadChildren: () => import(`../dashboard/manage-users/manage-users.module`).then(m => m.ManageUsersModule)
      },
      {path:'tasks', component:ListTasksComponent
      //loadChildren: () => import(`../dashboard/tasks-admin/tasks-admin.module`).then(m => m.TasksAdminModule)
      },
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
