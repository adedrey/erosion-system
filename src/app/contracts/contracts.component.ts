import { Component, OnInit, OnDestroy } from '@angular/core';
import { PostService } from '../posts/posts.service';
import { Post } from '../shared/posts.model';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-contracts',
  templateUrl: './contracts.component.html',
  styleUrls: ['./contracts.component.css']
})
export class ContractsComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  isLoading = false;
  displayedColumns : string[] = ['title', 'address', 'progress', 'status', 'action'];
  dataSource;
  firstSub: Subscription;
  constructor(private postService: PostService) { }

  ngOnInit() {
    this.isLoading = true;
    this.postService.getPosts();
    // this.postService.getposts();
    this.firstSub = this.postService.getPostsListener().subscribe(
      (posts: Post[]) => {
        this.isLoading = false;
        if (posts != null && posts.length >= 0) {
          this.posts = posts.filter(p => p.status.toString() === '0');
          this.dataSource = new MatTableDataSource(this.posts);
          // console.log(this.posts);
        }
      }
    )
  }

  applyFilter(filterValue: string){
    this.dataSource.filter =  filterValue.trim().toLowerCase();
  }

  ngOnDestroy(){
    this.firstSub.unsubscribe()
  }
}
