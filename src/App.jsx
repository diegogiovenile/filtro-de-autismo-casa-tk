import React, { useState } from "react";
import jsPDF from "jspdf";
import logo from "./assets/logo.png";

const preguntas = [
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

export default function App() {

const [respuestas, setRespuestas] = useState(Array(preguntas.length).fill("nunca"));
const [nombre,setNombre] = useState("");
const [edad,setEdad] = useState("");

const handleChange = (index,value)=>{
const nuevas=[...respuestas];
nuevas[index]=value;
setRespuestas(nuevas);
};

// 🔥 CÁLCULO CORRECTO
const actuales = respuestas.filter(r => r === "actual").length;
const antes = respuestas.filter(r => r === "alguna").length;

const total = (actuales * 2) + antes;

// 🔥 INTERPRETACIÓN CLÍNICA
const interpretacion = total >= 28
? "Existe la posibilidad de que la persona evaluada se encuentre dentro del espectro autista. Se recomienda acudir con un profesional para una evaluación diagnóstica."
: "El puntaje no sugiere características significativas dentro del espectro autista según este filtro.";

// 📄 PDF PROFESIONAL
const generarPDF = () => {

const pdf = new jsPDF();

pdf.addImage(logo, "PNG", 80, 10, 50, 30);

pdf.setFontSize(18);
pdf.text("Filtro Mexicano del Espectro Autista", 105, 50, {align:"center"});

pdf.setFontSize(12);
pdf.text(`Nombre: ${nombre}`,20,70);
pdf.text(`Edad: ${edad}`,20,80);

const fecha = new Date().toLocaleDateString();
pdf.text(`Fecha: ${fecha}`,20,90);

pdf.setFontSize(14);
pdf.text("Resultados:",20,110);

pdf.setFontSize(12);
pdf.text(`Actualmente: ${actuales} x 2 = ${actuales * 2}`,20,125);
pdf.text(`Alguna vez: ${antes} x 1 = ${antes}`,20,135);

pdf.setFontSize(14);
pdf.text(`Total: ${total} puntos`,20,150);

pdf.setFontSize(12);
pdf.text("Interpretación:",20,170);
pdf.text(interpretacion,20,180,{maxWidth:170});

pdf.setFontSize(10);
pdf.text("Este instrumento es de detección y no constituye un diagnóstico clínico.",20,210,{maxWidth:170});

pdf.save("resultado_filtro_autismo.pdf");

};

// 💾 GUARDAR RESULTADO
const guardarResultado = () => {

const resultados = JSON.parse(localStorage.getItem("resultados")) || [];

const nuevo = {
nombre,
edad,
fecha: new Date().toLocaleDateString(),
total,
actuales,
antes,
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
Filtro Mexicano del Espectro Autista
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

<p>Actualmente: <b>{actuales}</b> x2 = {actuales*2}</p>
<p>Alguna vez: <b>{antes}</b> x1 = {antes}</p>

<p>Total: <b>{total}</b></p>

<p>{interpretacion}</p>

<button
onClick={()=>{
guardarResultado();
generarPDF();
}}
style={{
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