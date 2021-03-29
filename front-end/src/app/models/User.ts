export interface User{
    id?: number;   //? es para que sea opcional
    nombre?: string;
    apellido?: string;
    clave?: string;
    correo?: string;
    telefono?: number;
    fotografia?: string;
    genero?: string;
    fecha_nacimiento?: Date;
    fecha_registro?: Date;
    direccion?: string;
    credito_?: number;
    ganancia?: number;
    rol_?: number;
    estado_?: number;
    //description_?: string;
    //image?: string;
    //created_at?: Date;
}