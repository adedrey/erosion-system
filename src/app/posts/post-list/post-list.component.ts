import { Component, OnInit, OnDestroy } from '@angular/core';
import { PostService } from '../posts.service';
import { Post } from '../../shared/posts.model';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  isLoading = false;
  postSubscription: Subscription;
  displayedColumns : string[] = ['title', 'address', 'progress', 'status', 'action'];
  dataSource;
  constructor(private postService: PostService, private router: Router) { }

  ngOnInit() {
    this.isLoading = true;
    this.postService.getPosts();
    this.postSubscription = this.postService.getPostsListener().subscribe(
      (posts: Post[]) => {
        this.isLoading = false;
        this.posts = posts;
        this.dataSource = new MatTableDataSource(this.posts);
      }
    )
  }

  applyFilter(filterValue: string){
    this.dataSource.filter =  filterValue.trim().toLowerCase();
  }
  ngOnDestroy() {
    this.postSubscription.unsubscribe();
  }

  onDelete(postId: string) {

    this.isLoading = true;
    this.postService.deletePost(postId).subscribe(
      responseData => {

        this.isLoading = false;
        this.postService.getPosts();
        this.router.navigate(['/admin', 'post']);
      }
    );
  }

}
