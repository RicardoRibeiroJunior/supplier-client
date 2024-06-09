import { slide as Menu } from 'react-burger-menu';
import './siderbar.css';
import { useNavigate } from "react-router-dom";

export function Sidebar(){

    const navigate = useNavigate();

    return(
        <Menu>
            <a className="menu-item" href="#" onClick={() => {navigate("/supplierList")}}>
                Fornecedores
            </a>
            <a className="menu-item" href="#">
                Usuários
            </a>
        </Menu>
    )
}