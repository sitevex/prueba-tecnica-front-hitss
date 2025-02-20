import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { API_ENDPOINTS } from '../constants/api.constants';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/position.model';

@Injectable({
  providedIn: 'root'
})
export class PositionService {

  constructor(private apiService: ApiService) {}

  getPositions(params?: any): Observable<ApiResponse> {
    return this.apiService.get<ApiResponse>(API_ENDPOINTS.POSITIONS, params);
  }
}
