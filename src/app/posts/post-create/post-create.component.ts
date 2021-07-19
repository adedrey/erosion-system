import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PostService } from '../posts.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Post } from '../../shared/posts.model';
@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  postForm: FormGroup;
  editMode = false;
  isLoading = false;
  private post: Post;
  private postId: string;
  constructor(private postService: PostService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.postFormGroup();
    this.postService.getPostsListener().subscribe(
      status => {
        this.isLoading = false;
      }
    )
    this.route.params.subscribe(
      (params: Params) => {
        if (params['id']) {
          this.postId = params['id'];
          this.isLoading = true;
          this.postService.getPostById(this.postId).subscribe(
            (postData) => {
              this.isLoading =false;
              this.editMode = true;
              this.post = {
                _id: postData.post._id,
                title: postData.post.title,
                address: postData.post.address,
                body: postData.post.body,
                status: postData.post.status,
                progress : postData.post.progress,
                contractId : postData.post.contractId,
                problem: postData.post.problem,
                userId: postData.post.userId
              }
              this.postForm.setValue({
                title: this.post.title,
                address: this.post.address,
                body: this.post.body,
                progress : this.post.progress,
                status: this.post.status,
                problem: this.post.problem
              })
            }
          )
        } else {
          this.editMode = false;
          this.postId = null;
        }
      }
    )
  }


  private postFormGroup() {
    this.postForm = new FormGroup({
      'title': new FormControl(null, Validators.required),
      'address': new FormControl(null, Validators.required),
      'body': new FormControl(null, Validators.required),
      'status': new FormControl(null, Validators.required),
      'progress': new FormControl(0),
      'problem': new FormControl(null)
    })
  }
  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 100) + '%';
    }

    return value;
  }

  onSubmit() {
    if (this.postForm.invalid) {
      return
    }
    this.isLoading = true;
    const title = this.postForm.value.title;
    const address = this.postForm.value.address;
    const body = this.postForm.value.body;
    const status = this.postForm.value.status;
    const progress = this.postForm.value.status === '0' ? this.postForm.value.progress : 100;
    const problem = this.postForm.value.status === '0' ? this.postForm.value.problem : null;


    const postData = {
      title: title,
      address: address,
      body: body,
      status: status,
      progress : progress,
      problem: problem
    };
    if (this.editMode) {

      this.postService.updatePost(postData, this.postId);
    }else{
      // ...

      this.postService.addPosts(postData);
    }
    // console.log(this.postForm);
  }

}
