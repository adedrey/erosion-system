import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Post } from '../shared/posts.model';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable({
    providedIn : 'root'
})
export class PostService {

    posts : Post[] = [];
    openPost : Post[] = [];
    postChanged = new BehaviorSubject<Post[]>([]);
    applicant : string[] = []
    applicantChanged = new BehaviorSubject<string[]>(null);

    constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) { }
    getPosts(){
        this.http.get<{message: string, posts : Post[]}>('http://localhost:3000/api/admin/posts')
        .subscribe(responseData => {
            this.posts = responseData.posts;
            this.postChanged.next(this.posts);
        })
    }
    getApplicants(postId : string){
        this.http.get<{applicants : string[]}>('http://localhost:3000/api/admin/contracts/' + postId + '/applicants')
        .subscribe(
            users => {
                this.applicantChanged.next(users.applicants);
            }
        )
    }
    assignContract(postId, userId, name){
        const postData = {
            userId : userId,
            name : name
        };
        // ...
        this.http.post<{message : string, post : Post}>('http://localhost:3000/api/admin/contracts/' + postId + '/assign', postData)
        .subscribe(
            responseData => {
                const postIndex = this.posts.findIndex(p => p._id === postId);
                this.posts[postIndex] = responseData.post;
                this.postChanged.next(this.posts);
            }
        );
    }
    
    getPostById(postId : string){
        return this.http.get<{message : string, post : Post}>('http://localhost:3000/api/admin/post/' + postId + '/edit')
    }
    deletePost(postId : string){
        return this.http.delete<{message : string}>('http://localhost:3000/api/admin/post/' + postId);
    }
    updatePost(postData : Post, postId){
        this.http.put<{message : string, post : Post}>('http://localhost:3000/api/admin/post/' + postId + '/edit', postData)
        .subscribe(
            (responseData) => {
                const postIndex = this.posts.findIndex(p => p._id === postId);
                this.posts[postIndex] = responseData.post;
                this.postChanged.next(this.posts);
                this.router.navigate(['/admin', 'post']);
            }
        )
    }
    getPostsListener(){
        return this.postChanged.asObservable();
    }
    
    addPosts(postData : Post){
        this.http.post<{message : string, post : Post}>('http://localhost:3000/api/admin/create', postData)
        .subscribe(responseData => {
            this.posts.push(responseData.post);
            this.postChanged.next(this.posts);
            this.router.navigate(['/admin/post'])
        })
    }

    
    
}