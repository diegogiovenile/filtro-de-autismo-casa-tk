import React, { useState } from "react";
import jsPDF from "jspdf";
import logo from "./assets/logo.png";

const preguntas = [
"Generalmente parece no atender cuando se le habla.",
"Utiliza los juguetes acomodándolos o alineándolos.",
"Parece interesarse más por los objetos que por las personas.",
"Ocasionalmente camina de puntas.",
"Muestra retraso significativo en el lenguaje.",
"Prefiere jugar con cualquier objeto más que con juguetes.",
"Prefiere estar sola o solo.",
"Realiza movimientos repetitivos.",
"Nunca ha hablado.",
"Se interesa sólo por partes de los objetos.",
"Rehuye la mirada.",
"Es selectivo con la comida.",
"Repite frases o preguntas.",
"Presenta berrinches inexplicables.",
"Muestra poco interés por convivir.",
"Es sensible a ciertas prendas.",
"Habla en tercera persona.",
"No crea juegos imaginativos.",
"En reuniones juega solo.",
"Es sensible a los ruidos.",
"Tono de voz monótono.",
"Dejó de decir palabras que decía.",
"Puede pasar mucho tiempo en una actividad.",
"Comentarios imprudentes.",
"Rechaza ciertos olores.",
"Te lleva de la mano a objetos.",
"Necesita rutinas.",
"Habla solo de temas de interés.",
"Rechaza texturas.",
"Entiende todo literal.",
"Presta atención a detalles.",
"Es ingenuo.",
"Tolerancia al dolor diferente.",
"Se lleva cosas a la boca.",
"Usa palabras muy formales.",
"Aprende letras o números fácilmente.",
"Usa frases aprendidas.",
"Dificultad para entender emociones.",
"Dificultad para dormir.",
"A veces dice palabras sueltas.",
"No mide peligros."
];

export default function App() {

const [respuestas, setRespuestas] = useState(Array(preguntas.length).fill("nunca"));
const [nombre,setNombre] = useState("");
const [edad,setEdad] = useState("");

const handleChange = (index,value)=>{
const nuevas=[...respuestas];
nuevas[index]=value;
setRespuestas(nuevas);
};

const totalMarcados=respuestas.filter(r=>r!=="nunca").length;

const interpretacion = totalMarcados>=15
? "Posibilidad de pertenecer al espectro autista. Se recomienda valoración diagnóstica."
: "Menor probabilidad según este filtro.";

const generarPDF = () => {

const pdf = new jsPDF();

pdf.addImage(logo, "PNG", 80, 10, 50, 30);

pdf.setFontSize(18);
pdf.text("Filtro Enlace Autismo", 105, 50, {align:"center"});

pdf.setFontSize(12);
pdf.text(`Nombre: ${nombre}`,20,70);
pdf.text(`Edad: ${edad}`,20,80);

const fecha = new Date().toLocaleDateString();
pdf.text(`Fecha: ${fecha}`,20,90);

pdf.setFontSize(14);
pdf.text(`Indicadores marcados: ${totalMarcados}`,20,110);

pdf.setFontSize(12);
pdf.text("Interpretación:",20,130);

pdf.text(interpretacion,20,140,{maxWidth:170});

pdf.setFontSize(10);
pdf.text("Este filtro es una herramienta de detección y no constituye un diagnóstico clínico.",20,180,{maxWidth:170});

pdf.save("resultado_filtro_autismo.pdf");

};

const guardarResultado = () => {

const resultados = JSON.parse(localStorage.getItem("resultados")) || [];

const nuevo = {
nombre,
edad,
fecha: new Date().toLocaleDateString(),
total: totalMarcados,
resultado: interpretacion
};

resultados.push(nuevo);

localStorage.setItem("resultados", JSON.stringify(resultados));

};

return (

<div style={{
background:"#EFEAE1",
minHeight:"100vh",
padding:"40px",
fontFamily:"Montserrat"
}}>

<div style={{textAlign:"center"}}>

<img src={logo} alt="Casa Terakids" style={{width:"120px"}}/>

<h1 style={{color:"#588094"}}>
Filtro Enlace Autismo
</h1>

<p>
Herramienta de detección para niños de 18 meses a 12 años
</p>

</div>

<div style={{
background:"white",
padding:"20px",
borderRadius:"10px",
marginTop:"20px"
}}>

<div style={{display:"flex",gap:"20px"}}>

<input
placeholder="Nombre"
value={nombre}
onChange={(e)=>setNombre(e.target.value)}
/>

<input
placeholder="Edad"
value={edad}
onChange={(e)=>setEdad(e.target.value)}
/>

</div>

</div>

<div style={{marginTop:"30px"}}>

{preguntas.map((p,i)=>(
<div key={i}
style={{
background:"white",
padding:"15px",
marginBottom:"15px",
borderRadius:"10px"
}}
>

<p>{i+1}. {p}</p>

<div style={{display:"flex",gap:"20px"}}>

<label>

<input
type="radio"
name={`q${i}`}
checked={respuestas[i]==="nunca"}
onChange={()=>handleChange(i,"nunca")}
/>

Nunca

</label>

<label>

<input
type="radio"
name={`q${i}`}
checked={respuestas[i]==="alguna"}
onChange={()=>handleChange(i,"alguna")}
/>

Alguna vez

</label>

<label>

<input
type="radio"
name={`q${i}`}
checked={respuestas[i]==="actual"}
onChange={()=>handleChange(i,"actual")}
/>

Actualmente

</label>

</div>

</div>
))}

</div>

<div style={{
background:"white",
padding:"20px",
borderRadius:"10px"
}}>

<h2>Resultado</h2>

<p>Indicadores marcados: <b>{totalMarcados}</b></p>

<p>{interpretacion}</p>

<button
onClick={()=>{
guardarResultado();
generarPDF();
}
}style={{
background:"#9BCAD5",
border:"none",
padding:"12px 20px",
borderRadius:"8px",
cursor:"pointer"
}}
>

Descargar PDF

</button>

</div>

</div>

);
}