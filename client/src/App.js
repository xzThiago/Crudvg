import {BrowserRouter, Routes, Route} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import AddEdit from "./pages/AddEdit";
import Home from "./pages/Home";
import View from "./pages/View";
import Img from "./pages/imgvaggon.jpeg";

function App() {

  return (
    
    <BrowserRouter>
      <div className="App">
        <ToastContainer position="top-center" />
        <Routes>
          <Route exact path="/" element={<Home /> } />
          <Route path="/addDescricao" element={<AddEdit />} />
          <Route path="/update/:id" element={<AddEdit />} />
          <Route path="/view/:id" element={<View />} />
        </Routes>
        <img src={Img} style={{ maxWidth: "665px"}}/>
      </div>
    </BrowserRouter>
  );
}

export default App;
