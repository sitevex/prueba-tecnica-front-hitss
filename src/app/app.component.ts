import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { UserService } from './core/services/user.service';
import { User } from './core/models/user.model';

import { DepartmentService } from './core/services/department.service';
import { Department } from './core/models/department.model';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'prueba-tecnica-front-hitss';

  users: User[] = [];
  departments: Department[] = [];
  isLoading: boolean = true;

  constructor(
    private userService: UserService,
    private departmentService: DepartmentService
  ) {}

  ngOnInit() {
    this.loadUser();
    this.loadDepartments();
  }

  loadUser() {
    this.isLoading = true;
    this.userService
      .getUsers({ paginate: 'true', perPage:10, page:1, sortBy: 'id', sortDirection: 'asc' })
      .subscribe((response) => {
        if (response.success) {
          this.users = response.data.users;
        }
        this.isLoading = false;
      },
      (error) => {
        console.error('Error al obtener usuarios', error);
        this.isLoading = false;
      }
    );
  }

  loadDepartments() {
    this.departmentService
      .getDepartments({ paginate: 'false', sortBy: 'id', sortDirection: 'asc' })
      .subscribe((response) => {
        this.departments = response.data.departments;
      });
  }
}
