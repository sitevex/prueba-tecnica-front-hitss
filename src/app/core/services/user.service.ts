import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { API_ENDPOINTS } from '../constants/api.constants';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/user.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private apiService: ApiService, private http: HttpClient) {}

  getUsers(params?: any): Observable<ApiResponse> {
    return this.apiService.get<ApiResponse>(API_ENDPOINTS.USERS, params);
  }

  getUsersByUrl(url: string): Observable<any> {
    return this.http.get<any>(url);
  }

}
