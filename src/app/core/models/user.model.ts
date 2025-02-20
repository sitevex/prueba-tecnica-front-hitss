export interface User {
    idUser?: number;
    usuario: string;
    primerNombre: string;
    segundoNombre?: string;
    primerApellido: string;
    segundoApellido?: string;
    idDepartamento: number;
    idCargo: number;
    email: string;
    departamento?: any;
    cargo?: any;
    created_at?: string;
}

export interface Pagination {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number;
    to: number;
    prev_page_url?: string;
    next_page_url?: string;
}

export interface ApiResponse {
    code: number;
    success: boolean;
    message: string;
    data: {
        users: User[];
    };
    pagination?: Pagination;
}