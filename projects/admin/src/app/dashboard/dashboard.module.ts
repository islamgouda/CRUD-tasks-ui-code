import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { TasksModule } from 'projects/user/src/app/tasks/tasks.module';
import { TasksRoutingModule } from 'projects/user/src/app/tasks/tasks-routing.module';


@NgModule({
  declarations: [
    LayoutComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    TasksModule,
    TasksRoutingModule,
  ]
})
export class DashboardModule { }
