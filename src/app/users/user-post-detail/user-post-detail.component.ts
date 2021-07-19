import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/shared/posts.model';
import { UserPostService } from '../shared-user/user-post.service';
import { ActivatedRoute, Params } from '@angular/router';
import { MatDialog } from '@angular/material';
import { SubmitApprovalComponent } from '../shared-user/submit-approval/submit-approval.component';

@Component({
  selector: 'app-user-post-detail',
  templateUrl: './user-post-detail.component.html',
  styleUrls: ['./user-post-detail.component.css']
})
export class UserPostDetailComponent implements OnInit {

  private post : Post;
  postId : string;
  isLoading = false;
  constructor(private userPostService : UserPostService, private route : ActivatedRoute, public dialog: MatDialog) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params : Params) => {
        if(params['id']){
          this.postId = params['id']
          this.isLoading = true;
          this.userPostService.getPostById(this.postId).subscribe(
            responseData => {
              this.isLoading = false;
              this.post = responseData.post;
            }
          )
        }else{
          this.postId = null;
        }
      }
    )
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(SubmitApprovalComponent, {
      width: '40%',
      data : {postId : this.post._id, title: this.post.title}
    });
  }

}
