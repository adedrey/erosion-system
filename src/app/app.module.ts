import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeadersComponent } from './users/headers/headers.component';
import { MatToolbarModule, MatIconModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatCardModule, MatListModule, MatExpansionModule, MatDialogModule, MatSliderModule, MatTableModule, MatProgressSpinnerModule } from '@angular/material'
import {MatMenuModule} from '@angular/material/menu';
import { PostListComponent } from './posts/post-list/post-list.component';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { AdminComponent } from './admin/admin.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PostsComponent } from './posts/posts.component';
import { PostDetailComponent } from './posts/post-detail/post-detail.component';
import { UsersComponent } from './users/users.component';
import { UserPostsComponent } from './users/user-posts/user-posts.component';
import { UserPostDetailComponent } from './users/user-post-detail/user-post-detail.component';
import { SubmitApprovalComponent } from './users/shared-user/submit-approval/submit-approval.component';
import { ContractsComponent } from './contracts/contracts.component';
import { AssignContractComponent } from './contracts/assign-contract/assign-contract.component';
import { ViewContractComponent } from './contracts/view-contract/view-contract.component';
import { ContractComponent } from './users/contract/contract.component';
import { HeaderComponent } from './header/header.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { AdminLoginComponent } from './auth/admin/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    HeadersComponent,
    PostListComponent,
    PostCreateComponent,
    AdminComponent,
    UsersComponent,
    PostsComponent,
    ContractsComponent,
    ContractComponent,
    AssignContractComponent,
    ViewContractComponent,
    PostDetailComponent,
    UserPostsComponent,
    UserPostDetailComponent,
    SubmitApprovalComponent,
    HeaderComponent,
    SignupComponent,
    LoginComponent,
    AdminLoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatDialogModule,
    MatListModule,
    MatExpansionModule,
    MatSliderModule,
    MatTableModule,
    MatProgressSpinnerModule
  ],
  providers: [{provide : HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent],

  entryComponents : [SubmitApprovalComponent]
})
export class AppModule { }
