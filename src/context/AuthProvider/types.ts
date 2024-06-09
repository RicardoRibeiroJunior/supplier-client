export interface IUser{
    email?: string;
    token?: string;
    name?: string;
}

export interface IContext extends IUser{
    setUserLocalStorage: (user: IUser | null) => void;
    getUserLocalStorage: () => void;
    authenticate: (email: string, password: string) => Promise<null | undefined>;
    logout: () => void;
    fetchSuppliers: () => Promise<null | undefined>;
    fetchUsers: () => Promise<null | undefined>;
    alterSupplier:(data: ISupplierDto) => void;
    suppliers: ISupplierDto[];
    supplier?: ISupplierDto;
    users: IUserDto[];
    createSupplier:(data: ISupplierDto) => void;
    updateSupplier: (data: ISupplierDto) => void;
    createUser:(data: IUserForm) => void;
    deleteSupplier:(id: number) => void;
    deleteUser:(id: number) => void;
}

export interface IAuthProvider{
    children: JSX.Element;
}

export interface ISupplierDto{
    id:number;
    name:string,
    cnpj:string,
    branch:string,
    phone:string,
    addressForm:{
        street:string,
        neighborhood:string,
        cep:string,
        uf:string,
        city:string,
        number:string,
        complement:string,
    }
}

export interface IUserDto{
    id: number;
    name: string;
    email: string;
}

export interface IUserForm{
    name: string;
    email: string;
    password: string;
}