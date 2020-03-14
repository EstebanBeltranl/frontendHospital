

export interface IHospital {
    _id:     string;
    nombre:  string;
    usuario: IUsuario;
}

export interface IUsuario {
    role:   string;
    _id:    string;
    nombre: string;
    email:  string;
    img:    string;
}

export interface Data<T> {
    ok: boolean;
    data: T[];
    currentPage: string;
    proxPage: null;
    limit: number;
    prevHistory?: string[]
    finPage?: boolean;
}
