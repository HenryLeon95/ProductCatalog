export class Genero {
    constructor(public nombre?: string, public descripcion?: string){}
}

export class Roles {
    constructor(public id?: number, public descripcion?: string){}
}

export class Estados {
    constructor(public id?: number, public descripcion?: string){}
}

export class Creditos {
    constructor(public id?: number, public descripcion?: string, public valor?: string){}
}

export class Selecciones {
    constructor(public descripcion?: string){}
}

export class Selecciones2 {
    constructor(public descripcion?: string){}
}

export class Eleccion_Categoria {
    constructor(public padre?:number, public descripcion?: string){}
}