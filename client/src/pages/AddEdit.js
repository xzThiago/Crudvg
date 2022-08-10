import React, {useState, useEffect} from "react";
import { useNavigate, useParams, Link} from "react-router-dom";
import "./AddEdit.css";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
    name: "",
    email: "",
    descricao: "",
};


const AddEdit = () => {
    const [state, setState] = useState(initialState);

    const { name, email, descricao } = state;

    const navigate = useNavigate();

    const {id} = useParams();

    useEffect(() => {
        axios.get(`http://localhost:5000/usuarios/${id}`)
            .then((resp) => setState({...resp.data[0]}));
    }, [id])
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || !email || !descricao) {
            toast.error ("Por favor, preencha todos os campos");
        } else {
            if(!id) {
                axios.post("http://localhost:5000/usuarios/post", {
                    name,
                    email,
                    descricao,
                })
                .then(() => {
                    setState({ name: "", email: "", descricao: ""});
                })
                .catch((err) => toast.error(err.response.data));
              toast.success("Cadastro realizado com sucesso");
            } else {
                axios.put(`http://localhost:5000/usuarios/${id}`, {
                    name,
                    email,
                    descricao,
                }).then(() => {
                    setState({ name: "", email: "", descricao: ""});
                })
                .catch((err) => toast.error(err.response.data));
              toast.success("Cadastro atualizado com sucesso");
            }
           
        }

            
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setState({ ...state, [name]: value });
    };

    return (
        <div style={{ marginTop: "100px"}}>
            <form style={{
                margin: "auto",
                padding: "15px",
                maxWidth: "400px",
                alignContent: "center",
                boxShadow: "3px 2px 15px #9E9E9E",
                backgroundImage: "linear-gradient(to right, #0fffff, #019DAD)"
                
            }}
            onSubmit={handleSubmit}
            >
                <label htmlFor="name">Nome</label>
                <input
                type="text"
                id="name"
                name="name"
                placeholder="Seu Nome ..."
                value={name || ""}
                onChange={handleInputChange}
                />
                <label htmlFor="email">Email</label>
                <input
                type="email"
                id="email"
                name="email"
                placeholder="Seu Email ..."
                value={email || ""}
                onChange={handleInputChange}
                />
                <label htmlFor="descricao">Cargo</label>
                <input
                type="text"
                id="descricao"
                name="descricao"
                placeholder="Seu Cargo ..."
                value={descricao || ""}
                onChange={handleInputChange}
                />
                <input type="submit" value={ id ? "Atualizar" : "Salvar"} />
                <Link to="/">
                    <input type="button" value="Voltar" />
                </Link>
            </form>
        </div>
    );
};

export default AddEdit;