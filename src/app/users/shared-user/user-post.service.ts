import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Post } from 'src/app/shared/posts.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserPostService {
  private posts: Post[] = [];
  postChanged = new BehaviorSubject<Post[]>(null);
  constructor(private http: HttpClient) { }

  getPosts() {
    this.http.get<{ message: string, posts: Post[] }>('http://localhost:3000/api/users/post')
      .subscribe(responseData => {
        this.posts = responseData.posts;
        this.postChanged.next(this.posts);
      });
  }
  getPostsListener() {
    return this.postChanged.asObservable();
  }
  getContracts() {
    // ...
    // const authToken = this.authService.getToken();
    return this.http.get<{ posts: Post[] }>(
      'http://localhost:3000/api/users/contracts'
    );
  }

  applyPost(postData: {postId:  string, title: string, document: File | string}) {
    // console.log(postData);
    const postCredentials = new FormData();
    postCredentials.append('postId', postData.postId);
    postCredentials.append('document', postData.document);
    console.log(postCredentials)
    this.http.post<{ message: string }>('http://localhost:3000/api/users/post/apply', postCredentials)
      .subscribe();
  }
  getPostById(postId: string) {
    return this.http.get<{ message: string, post: Post }>('http://localhost:3000/api/users/post/' + postId);
  }
}
