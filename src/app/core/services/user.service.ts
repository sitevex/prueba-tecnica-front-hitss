import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { API_ENDPOINTS } from '../constants/api.constants';
import { Observable } from 'rxjs';
import { ApiResponse, User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private apiService: ApiService, private http: HttpClient) {}

  // Obtener todos los usuarios
  getUsers(params?: any): Observable<ApiResponse> {
    return this.apiService.get<ApiResponse>(API_ENDPOINTS.USERS, params);
  }

  getUsersByUrl(url: string): Observable<any> {
    return this.http.get<any>(url);
  }
  
  createUser(userData: User): Observable<ApiResponse> {
    return this.apiService.post<ApiResponse>(API_ENDPOINTS.USERSTORE, userData);
  }

  updateUser(userData: User): Observable<ApiResponse> {
    return this.apiService.put<ApiResponse>(API_ENDPOINTS.USERUPDATE, userData);
  }

  deleteUser(idUser: number): Observable<ApiResponse> {
    return this.apiService.delete<ApiResponse>(`${API_ENDPOINTS.USERDELETE}`, { idUser });
  }
  
}
