import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { AdminComponent } from './admin/admin.component';
import { PostDetailComponent } from './posts/post-detail/post-detail.component';
import { PostsComponent } from './posts/posts.component';
import { UsersComponent } from './users/users.component';
import { UserPostDetailComponent } from './users/user-post-detail/user-post-detail.component';
import { ContractsComponent } from './contracts/contracts.component';
import { ViewContractComponent } from './contracts/view-contract/view-contract.component';
import { AssignContractComponent } from './contracts/assign-contract/assign-contract.component';
import { ContractComponent } from './users/contract/contract.component';
import { SignupComponent } from './auth/signup/signup.component';
import { UserPostsComponent } from './users/user-posts/user-posts.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { AdminLoginComponent } from './auth/admin/login/login.component';
import { AdminAuthGuard } from './auth/admin.auth.guard';


const routes: Routes = [
  {

    path: 'admin', component: AdminComponent, children: [
      {
        path: 'login', component: AdminLoginComponent
      },
      {
        path: 'post', component: PostsComponent, canActivate : [AdminAuthGuard], children: [
          {
            path: 'create', component: PostCreateComponent, canActivate : [AdminAuthGuard]
          },
          {
            path: ':id', component: PostDetailComponent, canActivate : [AdminAuthGuard]
          },
          {
            path: ':id/edit', component: PostCreateComponent, canActivate : [AdminAuthGuard]
          }
        ]
      },
      {
        path : 'contracts', component: ContractsComponent, canActivate : [AdminAuthGuard], children : [
          {
            path : ':id/view-applicants', component : ViewContractComponent, canActivate : [AdminAuthGuard]
          },
          {
            path : 'assigned-contracts', component : AssignContractComponent, canActivate : [AdminAuthGuard]
          }
        ]
      }
    ]
  },

  {
    path: 'users', component: UsersComponent, children: [
      {
        path : 'signup', component : SignupComponent
      },
      {
        path : 'login', component : LoginComponent
      },
      {
        path : 'post', component : UserPostsComponent, canActivate: [AuthGuard], children : [
          {
            path : ':id', component: UserPostDetailComponent, canActivate: [AuthGuard]
          }
        ]
      },
      {
        path : 'contracts', component : ContractComponent, canActivate: [AuthGuard]
      }
    ]

  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers : [AuthGuard, AdminAuthGuard]
})
export class AppRoutingModule { }
