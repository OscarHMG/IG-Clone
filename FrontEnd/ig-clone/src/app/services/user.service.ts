import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Comment } from '../models/comments';
import { User } from '../models/user';


@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}


  getAllUsers(){
    return this.http.get<Array<User>>(`${environment.baseUrl}api/allUsers/`);
  }
}
