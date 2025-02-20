import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { API_ENDPOINTS } from '../constants/api.constants';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private apiService: ApiService) {}

  getUsers(params?: any): Observable<ApiResponse> {
    return this.apiService.get<ApiResponse>(API_ENDPOINTS.USERS, params);
  }
}
