import { Component, OnInit, OnDestroy, DoCheck, AfterViewInit, AfterViewChecked, OnChanges } from '@angular/core';
import { Post } from 'src/app/shared/posts.model';
import { Subscription } from 'rxjs';
import { UserPostService } from '../shared-user/user-post.service';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-user-posts',
  templateUrl: './user-posts.component.html',
  styleUrls: ['./user-posts.component.css']
})
export class UserPostsComponent implements OnInit, OnDestroy {
  private posts: Post[] = [];
  private postSubscription: Subscription;
  updatedPosts = [];
  displayedColumns: string[] = ['title', 'address', 'progress', 'action'];
  dataSource;
  isLoading = false;
  constructor(private userPostService: UserPostService) { }
  ngOnInit() {
    this.isLoading = true;
    this.userPostService.getPosts();
    this.postSubscription = this.userPostService.getPostsListener().subscribe(
      (posts: Post[]) => {
        this.isLoading = false;
        this.posts = posts;
        this.dataSource = new MatTableDataSource(this.posts);
      }
    );
  }


  applyFilter(filterValue: string){
    this.dataSource.filter =  filterValue.trim().toLowerCase();
  }
  ngOnDestroy() {
    this.postSubscription.unsubscribe();
  }
}
