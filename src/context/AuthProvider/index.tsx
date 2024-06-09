import { createContext, useEffect, useState } from "react";
import { IAuthProvider, IContext, ISupplierDto, IUser, IUserDto, IUserForm } from "./types";
import { Api } from "../../service/api";



export const AuthContext = createContext<IContext>({} as IContext)



export const AuthProvider = ({ children } : IAuthProvider) => {

        const[suppliers, setSuppliers] = useState<ISupplierDto[]>([]);
        const[supplier, setSupplier] = useState<ISupplierDto>();
        const[users, setUsers] = useState<IUserDto[]>([]);
        const[user, setUser] = useState<IUser | null>();

        async function fetchSuppliers(){
            try {
                const token = getUserLocalStorage();
                const response = await Api.get('/supplier?pageNumber=0&pageQuantity=10', {headers: {'Authorization':`Bearer ${token.token}`}});
                setSuppliers(response.data.content);
            } catch (error) {
                return null;
            }
        }

        async function fetchUsers(){
            try {
                const token = getUserLocalStorage();
                const response = await Api.get('/user?pageNumber=0&pageQuantity=10', {headers: {'Authorization':`Bearer ${token.token}`}});
                setUsers(response.data.content);
            } catch (error) {
                return null;
            }
        }

        async function alterSupplier(data: ISupplierDto){
            setSupplier(data);
        }

        async function createSupplier(data: ISupplierDto){
            try {
                const token = getUserLocalStorage();
                await Api.post('/supplier', data, {headers: {'Authorization':`Bearer ${token.token}`}});
            } catch (error) {
                return null
            }
        }

        async function updateSupplier(data: ISupplierDto){
            try {
                const token = getUserLocalStorage();
                await Api.put('/supplier', data, {headers: {'Authorization':`Bearer ${token.token}`}});
            } catch (error) {
                return null
            }
        }

        async function createUser(data: IUserForm){
            try {
                const token = getUserLocalStorage();
                await Api.post('/user', data, {headers: {'Authorization':`Bearer ${token.token}`}});
            } catch (error) {
                return null
            }
        }

        async function deleteUser(id: number){
            try {
                const token = getUserLocalStorage();
                await Api.delete(`/user/${id}`, {headers: {'Authorization':`Bearer ${token.token}`}});
                fetchUsers();
            } catch (error) {
                return null
            }
        }

        async function deleteSupplier(id: number){
            try {
                const token = getUserLocalStorage();
                await Api.delete(`/supplier/${id}`, {headers: {'Authorization':`Bearer ${token.token}`}});
                fetchSuppliers();
            } catch (error) {
                return null
            }
        }

        function setUserLocalStorage(user: IUser | null){
            localStorage.setItem('u', JSON.stringify(user));
        }
        
        function getUserLocalStorage(){
            const json = localStorage.getItem('u');
        
            if(!json){
                return null;
            }
        
            const user = JSON.parse(json);
            return user ?? null;
        }

        async function authenticate(email: string, password: string){
            try {
                const response = await Api.post('login', {email, password});
                const payload = {token: response.data.tokenJWT, email, name: response.data.userName};
                console.log(payload);
                setUser(payload);
                setUserLocalStorage(payload);
            } catch (error) {
                return null;
            }
        }

        function logout(){
            setUser(null);
            localStorage.removeItem('u');
        }

        
        useEffect(() => {
            fetchSuppliers();
            const user = getUserLocalStorage();
            if(user){
                setUser(user);
            }
        }, []);
    
    return(
        <AuthContext.Provider value={{...user,
                                     suppliers,
                                     supplier,
                                     users, 
                                     fetchUsers,
                                     deleteUser,
                                     createUser,
                                     setUserLocalStorage, 
                                     getUserLocalStorage, 
                                     authenticate, 
                                     logout, 
                                     createSupplier,
                                     deleteSupplier,
                                     updateSupplier,
                                     alterSupplier,
                                     fetchSuppliers}}>
            {children}
        </AuthContext.Provider>
    )

}
