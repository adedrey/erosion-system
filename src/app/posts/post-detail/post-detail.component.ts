import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PostService } from '../posts.service';
import { Post } from '../../shared/posts.model';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {
  private post : Post;
  private postId;
  isLoading = false;
  constructor(private route : ActivatedRoute, private postService : PostService, private router : Router) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params : Params) => {
        if(params['id']){
          this.isLoading = true;
          this.postId = params['id'];
          this.postService.getPostById(this.postId).subscribe(
            (responseData) => {
              this.isLoading = false;
              this.post = responseData.post;
            }
          )
        }
      }
    )
  }
  onDelete(postId : string){
    console.log(postId)
    this.isLoading = true;
    this.postService.deletePost(postId).subscribe(
      resposeData => {
        this.isLoading = false;
        this.postService.getPosts();
        this.router.navigate(['/admin', 'post']);
      }
    );
  }

}
