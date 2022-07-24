import { Routes, Route } from 'react-router-dom';
import {Home} from"./Components/Home";
import './App.css';
import { Context } from './Context';
import {AddBill} from "./Components/AddBill";
import { Bill } from './Components/Bill';
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <Context>
      <div className="App w-11/12 mx-auto">
        <Toaster />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:id" element={<Home />} />
          <Route path="/addbill" element={<AddBill />} />
          <Route path="/bill" element={<Bill />} />
          <Route path="/edit/" element={<Bill />} />
          </Routes>
        </div>
    </Context>
  );
}

export default App;
