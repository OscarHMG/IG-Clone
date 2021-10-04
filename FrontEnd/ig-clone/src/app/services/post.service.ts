import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Post } from '../models/post';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient) {}

  

  getAllPosts(){
    return this.http.get<Array<Post>>(`${environment.baseUrl}api/posts/`);
  }

  getPostsByUser(user: number){
    if(user !== 0){
      return this.http.get<Array<Post>>(`${environment.baseUrl}api/profileComments/${user}/get_post_by_userV2/`);
    }
    else{
      return this.http.get<Array<Post>>(`${environment.baseUrl}api/posts/get_post_by_user/`);

    }

  }

  

  createNewComment(idPost: any, comment: string){
    return this.http.post<any>(`${environment.baseUrl}api/posts/${idPost}/create_new_comments_in_post/`, { comment_text: comment });
  }

  createNewPost(post: string){
    return this.http.post<any>(`${environment.baseUrl}api/posts/1/create_new_post/`, { description: post });

  }

}
