import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable()
export class ReactionService {

  userId!: string;
  emojiList = ['like', 'love', 'wow', 'haha', 'sad', 'angry']

  constructor(private http: HttpClient) {
    
  }

  postReactionToPost(idPost: any, reaction: string){

    return this.http.post<any>(`${environment.baseUrl}api/posts/${idPost}/create_update_reaction_post/`, { reaction_text: reaction });
  }
  
}