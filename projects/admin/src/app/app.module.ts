import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DashboardModule } from './dashboard/dashboard.module';
import { DashboardRoutingModule } from './dashboard/dashboard-routing.module';
import { TasksAdminModule } from './dashboard/tasks-admin/tasks-admin.module';
import { TasksAdminRoutingModule } from './dashboard/tasks-admin/tasks-admin-routing.module';
import { AuthModule } from './auth/auth.module';
import { ToastrModule } from 'ngx-toastr';
import { CoreModule } from './core/core.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    DashboardModule,
    DashboardRoutingModule,
    TasksAdminModule,
    TasksAdminRoutingModule,
    BrowserAnimationsModule,
    AuthModule,
    CoreModule,
  
    ToastrModule.forRoot(),
   // NgxSpinnerModule.forRoot({ type: 'square-jelly-box' }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
