export interface Position {
    idCargo: number;
    name: string;
    code: string;
    activo: number;
    created_at: string | null;
}

export interface ApiResponse {
    code: number;
    success: boolean;
    message: string;
    data: {
        cargos: Position[];
    };
}