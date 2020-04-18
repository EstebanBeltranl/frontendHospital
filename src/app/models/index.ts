

export interface IHospital {
    _id:     string;
    nombre:  string;
    img: string;
    usuario: Partial<IUsuario>;
}

export interface IUsuario {
    _id:    string;
    nombre: string;
    email:  string;
    role:   string;
    google: boolean;
    img?:    string;
}

export interface IMedico {
    _id:    string;
    nombre: string;
    usuario: Partial<IUsuario>,
    hospital: IHospital
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


export interface IResFindByColeccion {
    ok: boolean;
    usuario?: IUsuario[]; 
    medico?: IMedico[];
    hospital?: IHospital[]
}