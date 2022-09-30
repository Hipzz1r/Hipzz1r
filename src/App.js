import "./App.css";
import { Routes, Route } from "react-router-dom";
import PLayer from "./components/player";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<PLayer />}></Route>
            </Routes>
        </div>
    );
}

export default App;
