import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserComponent }          from './user.component';
import { UserSignupComponent }    from './user-signup.component';
import { UserSigninComponent }    from './user-signin.component';
import { UserDashboardComponent } from './user-dashboard.component';
import { UserEditComponent } from './user-edit.component';

const userRoutes: Routes = [
  {
    path: 'users',
    component: UserComponent,
    children: [
      {
        path: '',
        children: [
          { path: 'sign_in',   component: UserSigninComponent },
          { path: 'sign_up',   component: UserSignupComponent },
          { path: 'dashboard', component: UserDashboardComponent },
          { path: ':id',       component: UserEditComponent }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(userRoutes) ],
  exports: [ RouterModule ]
})

export class UserRoutingModule {}
