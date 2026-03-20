import React, { useState } from "react";
import jsPDF from "jspdf";
import logo from "./assets/logo.png";

const preguntasAutismo = [
"Utiliza los juguetes acomodándolos, alineándolos o apilándolos.",
"Parece interesarse más por los objetos que por las personas.",
"Muestra retraso significativo en la adquisición del lenguaje.",
"Prefiere jugar con cualquier objeto más que con juguetes.",
"Prefiere estar sola a interactuar o jugar con otros infantes.",
"Nunca ha hablado.",
"Se interesa sólo por una parte de los objetos, juguetes y/o personas.",
"Rehúye la mirada cuando se le quiere mirar a los ojos.",
"Es selectiva o repetitiva en su alimentación.",
"Repite preguntas o frases que ha oído.",
"Presenta berrinches inexplicables.",
"Muestra poco interés para convivir con personas de su misma edad.",
"Es sensible al contacto de ciertas prendas de vestir.",
"Habla en tercera persona.",
"En eventos sociales frecuentemente termina jugando sola.",
"Tiene un tono de voz monótono.",
"Pronunció palabras que dejó de decir sin causa.",
"Puede permanecer mucho tiempo en una actividad de su interés.",
"Hace comentarios imprudentes sin darse cuenta.",
"Le desagradan ciertos olores o huele todo.",
"Te lleva de la mano sin mirarte ni hablarte.",
"Realiza rutinas rígidas y se altera con cambios.",
"Muestra poco interés en ideas del otro.",
"Rechaza o busca ciertas texturas.",
"Entiende todo de forma literal.",
"Es ingenua.",
"Usa palabras muy formales para su edad.",
"Tiene facilidad para aprender datos.",
"Usa frases aprendidas de forma ritual.",
"Dificultad para interpretar emociones.",
"Tiene dificultades para dormir.",
"Dice palabras sueltas sin lenguaje funcional.",
"No mide riesgos."
];

const preguntasTDAH = [
"Le cuesta mantener la atención en tareas.",
"Parece no escuchar cuando se le habla.",
"No sigue instrucciones.",
"Dificultad para organizarse.",
"Evita tareas que requieren esfuerzo mental.",
"Pierde objetos necesarios.",
"Se distrae fácilmente.",
"Es olvidadizo.",
"Comete errores por descuido.",
"No se queda quieto.",
"Se levanta constantemente.",
"Corre o trepa en exceso.",
"No juega tranquilamente.",
"Está en constante movimiento.",
"Habla en exceso.",
"Responde antes de terminar la pregunta.",
"Dificultad para esperar turno.",
"Interrumpe o se entromete."
];

export default function App() {

const [tipo,setTipo] = useState("autismo");
const preguntas = tipo === "autismo" ? preguntasAutismo : preguntasTDAH;

const [respuestas, setRespuestas] = useState(Array(preguntas.length).fill("0"));
const [nombre,setNombre] = useState("");
const [edad,setEdad] = useState("");

const handleChange = (index,value)=>{
const nuevas=[...respuestas];
nuevas[index]=value;
setRespuestas(nuevas);
};

const valores = {
"0":0,
"1":1,
"2":2,
"3":3
};

// 🔵 AUTISMO
const totalAutismo = respuestas.filter(r=>r!=="0").length;

// 🔵 TDAH
const inatencion = respuestas.slice(0,9).reduce((acc,r)=>acc+valores[r],0);
const hiperactividad = respuestas.slice(9,18).reduce((acc,r)=>acc+valores[r],0);
const totalTDAH = inatencion + hiperactividad;

// 🔵 INTERPRETACIÓN
let interpretacion = "";

if(tipo==="autismo"){
interpretacion = totalAutismo >= 15
? "Posibilidad de pertenecer al espectro autista. Se recomienda valoración clínica."
: "Menor probabilidad según este filtro.";
}else{
if(totalTDAH >= 36){
interpretacion = "Alta probabilidad de TDAH. Se recomienda evaluación clínica.";
}else if(totalTDAH >= 24){
interpretacion = "Indicadores moderados. Se sugiere seguimiento.";
}else{
interpretacion = "Baja probabilidad según esta escala.";
}
}

// 🔥 PDF PREMIUM
const generarPDF = () => {

const pdf = new jsPDF();
const fecha = new Date().toLocaleDateString();

const color = [155,202,213];

pdf.setFillColor(...color);
pdf.rect(0,0,210,30,"F");

pdf.addImage(logo,"PNG",10,5,20,20);

pdf.setTextColor(255,255,255);
pdf.setFontSize(16);
pdf.text("Casa Terakids",105,15,{align:"center"});

pdf.setFontSize(11);
pdf.text("Reporte de Evaluación",105,23,{align:"center"});

pdf.setTextColor(0,0,0);

pdf.text(`Nombre: ${nombre}`,20,45);
pdf.text(`Edad: ${edad}`,20,55);
pdf.text(`Fecha: ${fecha}`,20,65);

pdf.line(20,75,190,75);

pdf.setFontSize(14);
pdf.text("Resultados",20,90);

pdf.setFontSize(12);

if(tipo==="autismo"){
pdf.text(`Indicadores marcados: ${totalAutismo}`,20,110);
}else{
pdf.text(`Inatención: ${inatencion}`,20,105);
pdf.text(`Hiperactividad: ${hiperactividad}`,20,115);
pdf.text(`Total: ${totalTDAH}`,20,125);
}

pdf.setFillColor(240,240,240);
pdf.roundedRect(20,140,170,20,5,5,"F");

pdf.text("Interpretación",105,150,{align:"center"});

pdf.setFontSize(11);
pdf.text(interpretacion,20,170,{maxWidth:170});

pdf.setFontSize(9);
pdf.setTextColor(120);
pdf.text("Este instrumento es de detección y no sustituye diagnóstico clínico.",20,210,{maxWidth:170});

pdf.setTextColor(0);
pdf.line(120,250,190,250);
pdf.text("Firma del profesional",125,258);

pdf.save(`Reporte_${nombre || "Paciente"}.pdf`);
};

// GUARDAR
const guardarResultado = ()=>{
const datos = JSON.parse(localStorage.getItem("resultados")) || [];

datos.push({
nombre,
edad,
tipo,
fecha:new Date().toLocaleDateString(),
resultado:interpretacion
});

localStorage.setItem("resultados",JSON.stringify(datos));
};

return (

<div style={{background:"#EFEAE1",minHeight:"100vh",padding:"40px"}}>

<h2>Selecciona evaluación</h2>

<select value={tipo} onChange={(e)=>{
setTipo(e.target.value);
setRespuestas(Array(
e.target.value==="autismo"
? preguntasAutismo.length
: preguntasTDAH.length
).fill("0"));
}}>
<option value="autismo">Autismo</option>
<option value="tdah">TDAH-5</option>
</select>

<br/><br/>

<input placeholder="Nombre" value={nombre} onChange={(e)=>setNombre(e.target.value)}/>
<input placeholder="Edad" value={edad} onChange={(e)=>setEdad(e.target.value)}/>

<div style={{marginTop:"20px"}}>

{preguntas.map((p,i)=>(
<div key={i} style={{background:"white",padding:"10px",marginBottom:"10px"}}>

<p>{i+1}. {p}</p>

{tipo==="autismo" ? (
<>
<label><input type="radio" name={i} onChange={()=>handleChange(i,"0")}/>Nunca</label>
<label><input type="radio" name={i} onChange={()=>handleChange(i,"1")}/>Sí</label>
</>
):(
<>
<label><input type="radio" name={i} onChange={()=>handleChange(i,"0")}/>Nunca</label>
<label><input type="radio" name={i} onChange={()=>handleChange(i,"1")}/>A veces</label>
<label><input type="radio" name={i} onChange={()=>handleChange(i,"2")}/>Frecuente</label>
<label><input type="radio" name={i} onChange={()=>handleChange(i,"3")}/>Muy frecuente</label>
</>
)}

</div>
))}

</div>

<div style={{background:"white",padding:"20px"}}>

<h3>Resultado</h3>

<p>{interpretacion}</p>

<button onClick={()=>{
guardarResultado();
generarPDF();
}}>
Descargar PDF
</button>

</div>

</div>

);
}