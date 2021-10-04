import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Comment } from '../models/comments';


@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor(private http: HttpClient) {}


  getCommentsByPost(id: number){
    return this.http.get<Array<Comment>>(`${environment.baseUrl}api/posts/${id}/get_comments/`);
  }
}
