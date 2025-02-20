import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { UserService } from './core/services/user.service';
import { User } from './core/models/user.model';

import { DepartmentService } from './core/services/department.service';
import { Department } from './core/models/department.model';

import { PositionService } from './core/services/position.service';
import { Position } from './core/models/position.model';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'prueba-tecnica-front-hitss';

  users: User[] = [];
  selectedUserId: number | null = null;
  departments: Department[] = [];
  cargos: Position[] = [];
  userForm: User = {} as User;
  isEditing: boolean = false;
  isLoading: boolean = true;
  pageInfo: string = '';
  pagination: any = {};

  departmentCode: string = '';
  positionCode: string = ''; 

  @ViewChild('userModal') userModal!: ElementRef;

  constructor(
    private userService: UserService,
    private departmentService: DepartmentService,
    private positionService: PositionService,
  ) {}

  ngOnInit() {
    this.loadUser();
    this.loadDepartments();
    this.loadPositions();
  }

  loadDepartments() {
    this.departmentService
      .getDepartments({ paginate: 'false', sortBy: 'id', sortDirection: 'asc' })
      .subscribe((response) => {
        this.departments = response.data.departments;
      });
  }

  loadPositions() {
    this.positionService
      .getPositions({ paginate: 'false', sortBy: 'id', sortDirection: 'asc' })
      .subscribe((response) => {
        // console.log(response);
        this.cargos = response.data.cargos;
      });
  }

  // Establecer el departamento seleccionado
  selectDepartment(departmentId: string) {
    this.departmentCode = departmentId;
    this.loadUser();
  }

  // Establecer el cargo seleccionado
  selectPosition(positionId: string) {
    this.positionCode = positionId;
    this.loadUser();
  }

  loadUser() {
    this.isLoading = true;
    this.userService
      .getUsers({ departmentCode: this.departmentCode, positionCode: this.positionCode, paginate: 'true', perPage:10, page:1, sortBy: 'id', sortDirection: 'asc' })
      .subscribe((response) => {
        if (response.success) {
          this.users = response.data.users;
          this.pagination = response.pagination ?? {};
          this.updatePageInfo();
        }
        this.isLoading = false;
      },
      (error) => {
        console.error('Error al obtener usuarios', error);
        this.isLoading = false;
      }
    );
  }

  updatePageInfo() {
    this.pageInfo = `Mostrando ${this.pagination.from} - ${this.pagination.to} de ${this.pagination.total} registros`;
  }

  prevPage() {
    if (this.pagination.prev_page_url) {
      this.loadUserFromUrl(this.pagination.prev_page_url);
    }
  }
  
  nextPage() {
    if (this.pagination.next_page_url) {
      this.loadUserFromUrl(this.pagination.next_page_url);
    }
  }

  loadUserFromUrl(url: string) {
    this.isLoading = true;
  
    // Crear una URL con los parámetros actuales
    const urlObj = new URL(url);
    urlObj.searchParams.set('departmentCode', this.departmentCode);
    urlObj.searchParams.set('positionCode', this.positionCode);
    urlObj.searchParams.set('paginate', 'true');
    urlObj.searchParams.set('perPage', '2');
  
    this.userService.getUsersByUrl(urlObj.toString()).subscribe(
      (response) => {
        if (response.success) {
          this.users = response.data.users;
          this.pagination = response.pagination;
          this.updatePageInfo();
        }
        this.isLoading = false;
      },
      (error) => {
        console.error('Error al obtener usuarios', error);
        this.isLoading = false;
      }
    );
  }
  
  openModal(event: Event) {
    const button = event.target as HTMLElement;
    const mode = button.getAttribute('data-modo');
  
    if (mode === 'addUsuario') {
      this.isEditing = false;
      this.userForm = {
        idUser: 0,
        usuario: '',
        primerNombre: '',
        segundoNombre: '',
        primerApellido: '',
        segundoApellido: '',
        idDepartamento: 0,
        idCargo: 0,
        email: '',
        departamento: null,
        cargo: null,
        created_at: '',
      };
    } else if (mode === 'editUsuario') {
      this.isEditing = true;
      this.userForm = {
        idUser: Number(button.getAttribute('data-idUsuario')) || 0,
        usuario: button.getAttribute('data-usuario') || '',
        primerNombre: button.getAttribute('data-primerNombre') || '',
        segundoNombre: button.getAttribute('data-segundoNombre') || '',
        primerApellido: button.getAttribute('data-primerApellido') || '',
        segundoApellido: button.getAttribute('data-segundoApellido') || '',
        idDepartamento: Number(button.getAttribute('data-idDepartamento')) || 0,
        idCargo: Number(button.getAttribute('data-idCargo')) || 0,
        email: button.getAttribute('data-email') || '',
        departamento: null,
        cargo: null,
        created_at: button.getAttribute('data-createdAt') || '',
      };
    }
  }
  
  saveUser() {
    if (this.isEditing) {
      this.userService.updateUser(this.userForm).subscribe(() => {
        alert('Usuario actualizado correctamente');
        this.loadUser();
      });
    } else {
      this.userService.createUser(this.userForm).subscribe(() => {
        alert('Usuario creado correctamente');
        this.loadUser();
      });
    }
  }
  
  openDeleteModal(event: Event) {
    const button = event.target as HTMLElement;
    this.selectedUserId = Number(button.getAttribute('data-idUsuario')) || null;
  }

  deleteUser() {
    if (this.selectedUserId !== null) {
      this.userService.deleteUser(this.selectedUserId).subscribe(
        (response) => {
          if (response.success) {
            alert('Usuario eliminado correctamente');
            this.loadUser(); // Recargar la lista de usuarios
          } else {
            alert('Error al eliminar el usuario');
          }
        },
        (error) => {
          console.error('Error al eliminar usuario', error);
          alert('Ocurrió un error al intentar eliminar el usuario');
        }
      );
    }
  }
  
}
