import { obtener } from "./storage";

export default function Historial(){

const datos = obtener();

return(
<div style={{padding:"20px"}}>

<h2>Historial clínico</h2>

{datos.map((p,i)=>(
<div key={i} style={{
background:"white",
padding:"15px",
marginBottom:"10px"
}}>

<p><b>{p.nombre}</b> ({p.edad})</p>
<p>Tipo: {p.tipo}</p>
<p>Fecha: {p.fecha}</p>
<p>Resultado: {p.resultado}</p>

</div>
))}

</div>
);
}