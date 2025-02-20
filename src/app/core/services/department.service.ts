import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { API_ENDPOINTS } from '../constants/api.constants';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/department.model';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(private apiService: ApiService) {}

  getDepartments(params?: any): Observable<ApiResponse> {
    return this.apiService.get<ApiResponse>(API_ENDPOINTS.DEPARTMENTS, params);
  }
}
