export interface User {
    idUser: number;
    usuario: string;
    primerNombre: string;
    segundoNombre: string;
    primerApellido: string;
    segundoApellido: string;
    idDepartamento: number;
    departamento: string;
    idCargo: number;
    cargo: string;
    email: string;
    created_at: string | null;
}

export interface ApiResponse {
    code: number;
    success: boolean;
    message: string;
    data: {
        users: User[];
    };
}