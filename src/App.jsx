import { useState } from "react";
import Evaluacion from "./Evaluacion";
import Historial from "./Historial";

export default function App() {

const [pantalla, setPantalla] = useState("evaluacion");

return (
<div>

<nav style={{display:"flex", gap:"10px"}}>
<button onClick={()=>setPantalla("evaluacion")}>Evaluar</button>
<button onClick={()=>setPantalla("historial")}>Historial</button>
</nav>

{pantalla==="evaluacion" && <Evaluacion/>}
{pantalla==="historial" && <Historial/>}

</div>
);
}