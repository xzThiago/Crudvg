import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import "./Home.css";
import {toast} from "react-toastify";
import axios from "axios";

const Home = () => {
    const [data, setData] = useState([]);

    const loadData = async () => {
        const response = await axios.get("http://localhost:5000/usuarios");
        setData(response.data);
    };

    useEffect(() => {
        loadData();
    }, []);

    const deleteDescricao = (id) => {
        if (
            window.confirm("Deseja deletar esse cadastro?")
        ) {
            axios.delete(`http://localhost:5000/usuarios/${id}`);
            toast.success("Cadastro deletado com sucesso");
            setTimeout(() => loadData(), 500);
        }
    };
    return (
        <div style={{marginTop: "150px" }}>
            
            <Link to="/addDescricao">
                <button className="btn btn-contact">Adicionar Usuário</button>
            </Link>
            <table className="styled-table">
                <thead>
                    <tr>
                        <th style={{textAlign: "center"}}>Usuário</th>
                        <th style={{textAlign: "center"}}>Name</th>
                        <th style={{textAlign: "center"}}>Email</th>
                        <th style={{textAlign: "center"}}>Cargo</th>
                        <th style={{textAlign: "center"}}>Ação</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => {
                        return (
                            <tr key={item.id}>
                                <th scope="row">{index + 1}</th>
                                <td>{item.name}</td>
                                <td>{item.email}</td>
                                <td>{item.descricao}</td>
                                <td>
                                    <Link to={`/update/${item.id}`}>
                                        <button className="btn btn-edit">Editar</button>
                                    </Link>
                                    <button className="btn btn-delete" onClick={() => deleteDescricao(item.id)}>Deletar</button>
                                    <Link to={`/view/${item.id}`}>
                                        <button className="btn btn-view">Ver</button>
                                    </Link>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default Home;