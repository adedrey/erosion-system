import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { PostService } from 'src/app/posts/posts.service';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-view-contract',
  templateUrl: './view-contract.component.html',
  styleUrls: ['./view-contract.component.css']
})
export class ViewContractComponent implements OnInit {
  postId: string
  users: string[] = [];
  isLoading = false;
  displayedColumns: string[] = ['name', 'email', 'contract', 'action'];
  dataSource;
  constructor(private route: ActivatedRoute, private postService: PostService) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        if (params['id']) {
          this.postId = params['id'];
          this.isLoading = true;
          this.postService.getApplicants(this.postId);
          this.postService.applicantChanged.subscribe(
            (users) => {
              this.isLoading = false;
              this.users = users;
              // console.log(this.users)
              this.dataSource = new MatTableDataSource(this.users);
            }
          )
        }
      }
    )
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  onAssignContract(postId, userId, name) {
    //...
    this.postService.assignContract(postId, userId, name);
  }
}
