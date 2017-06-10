import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';
import { MaterialModule } from '@angular/material';

import { UserComponent }          from './user.component';
import { UserSigninComponent }    from './user-signin.component';
import { UserSignupComponent }    from './user-signup.component';
import { UserDashboardComponent } from './user-dashboard.component';
import { UserEditComponent }      from './user-edit.component';

import { UserRoutingModule } from './user-routing.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    UserRoutingModule
  ],
  declarations: [
    UserComponent,
    UserSigninComponent,
    UserSignupComponent,
    UserDashboardComponent,
    UserEditComponent
  ]
})

export class UserModule { }
