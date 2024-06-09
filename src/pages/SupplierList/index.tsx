import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { Button, SupplierContainer, SupplierTable } from "./styles";
import { Pencil, Trash } from "phosphor-react";
import { useNavigate } from "react-router-dom";
import { EmptyPage } from "../EmptyPage";
import { ISupplierDto } from "../../context/AuthProvider/types";


export function SupplierList(){  

    const { suppliers, deleteSupplier, fetchSuppliers, alterSupplier} = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() =>{
        fetchSuppliers();
    },[]);

    function handleDeleteSupplier(id: number){
        deleteSupplier(id);
    }

    function handleAlterSupplier(supplier: ISupplierDto){
        alterSupplier(supplier);
        navigate('/alterSupplierForm');
    }

    return(
        <div>
            <SupplierContainer>

                    <Button onClick={() => {navigate('/newSupplierForm');}}>
                        Novo
                    </Button>

                {suppliers == null || suppliers.length == 0? <EmptyPage/> :
            
                    <SupplierTable>
                        <thead>
                            <tr>
                                <th>NOME</th>
                                <th>CNPJ</th>
                                <th>FILIAL</th>
                                <th>TELEFONE</th>
                                <th>ENDEREÇO</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>                  
                            {suppliers.map(supplier => {
                                return(
                                    <tr key={supplier.id}> 
                                        <td width="25%">{supplier.name}</td>
                                        <td>{supplier.cnpj}</td>
                                        <td>{supplier.branch}</td>
                                        <td>{supplier.phone}</td>
                                        <td>{`${supplier.addressForm.street}, ${supplier.addressForm.number} - ${supplier.addressForm.complement} - ${supplier.addressForm.neighborhood} ${supplier.addressForm.cep} ${supplier.addressForm.city} - ${supplier.addressForm.uf}`}</td>
                                        <td width="1%">
                                            <a href="#" onClick={() => {handleAlterSupplier(supplier)}}>
                                                <Pencil weight="light" size={24}/>
                                            </a>
                                        </td>
                                        <td width="1%">
                                            <a href="#" onClick={() => {handleDeleteSupplier(supplier.id)}}>
                                                <Trash weight="light" size={24}/>
                                            </a>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </SupplierTable>
                }

            </SupplierContainer>


        </div>
    )
}