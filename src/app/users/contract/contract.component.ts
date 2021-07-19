import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/posts/posts.service';
import { UserPostService } from '../shared-user/user-post.service';
import { Post } from 'src/app/shared/posts.model';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.css']
})
export class ContractComponent implements OnInit {
  displayedColumns : string[] = ['title', 'address', 'progress', 'status', 'action'];
  dataSource;
  isLoading = false;
  private posts : Post[] = []
  constructor(private userPostService : UserPostService) { }

  ngOnInit() {
    this.isLoading = true
    this.userPostService.getContracts().subscribe(
      responseData => {
        this.isLoading = false;
        this.posts = responseData.posts
        this.dataSource = new MatTableDataSource(this.posts);
      }
    )
  }

  applyFilter(filterValue: string){
    this.dataSource.filter =  filterValue.trim().toLowerCase();
  }
}
