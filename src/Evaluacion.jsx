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

export default function Evaluacion() {

const [respuestas, setRespuestas] = useState(Array(preguntas.length).fill("nunca"));
const [nombre, setNombre] = useState("");
const [edad, setEdad] = useState("");

const handleChange = (index, value) => {
const nuevas = [...respuestas];
nuevas[index] = value;
setRespuestas(nuevas);
};

const total = respuestas.reduce((acc, r) => {
  if (r === "alguna") return acc + 1;
  if (r === "actual") return acc + 2;
  return acc;
}, 0);

const interpretacion =
total >= 28
? "Se identifican indicadores compatibles con características del espectro autista. Se recomienda valoración diagnóstica."
: "El puntaje no sugiere características significativas dentro del espectro autista según este filtro.";

const generarPDF = () => {

const pdf = new jsPDF();

// 🎨 COLOR HEADER
pdf.setFillColor(155, 202, 213);
pdf.rect(0, 0, 210, 40, "F");

// LOGO
pdf.addImage(logo, "PNG", 10, 5, 30, 30);

// TÍTULO
pdf.setTextColor(255,255,255);
pdf.setFontSize(18);
pdf.text("Evaluación Clínica", 105, 20, { align: "center" });

pdf.setFontSize(12);
pdf.text("Filtro de Autismo", 105, 30, { align: "center" });

// RESET COLOR
pdf.setTextColor(0,0,0);

// 🧾 TARJETA DE DATOS
pdf.setFillColor(240, 240, 240);
pdf.roundedRect(10, 50, 190, 40, 5, 5, "F");

pdf.setFontSize(11);
pdf.text(`Nombre: ${nombre || "No especificado"}`, 20, 65);
pdf.text(`Edad: ${edad || "No especificado"}`, 20, 75);
pdf.text(`Fecha: ${new Date().toLocaleDateString()}`, 120, 65);

// 🧠 RESULTADO
pdf.setFontSize(14);
pdf.text("Resultado", 10, 105);

pdf.setFontSize(12);
pdf.text(`Indicadores marcados: ${total}`, 10, 115);

// 📊 CAJA INTERPRETACIÓN
pdf.setFillColor(239, 234, 225);
pdf.roundedRect(10, 125, 190, 50, 5, 5, "F");

pdf.setFontSize(12);
pdf.text("Interpretación clínica:", 15, 135);

pdf.setFontSize(11);
pdf.text(interpretacion, 15, 145, { maxWidth: 170 });

// ⚠️ NOTA
pdf.setFontSize(9);
pdf.text(
"Este instrumento es un filtro clínico y no constituye un diagnóstico.",
10,
190
);

// FIRMA
pdf.setFontSize(10);
pdf.text("__________________________________", 120, 250);

// GUARDAR
pdf.save("reporte_autismo.pdf");

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
Evaluación Clínica
</h1>

<p>Filtro de detección para autismo</p>

</div>

<div style={{
background:"white",
padding:"20px",
borderRadius:"10px",
marginTop:"20px",
display:"flex",
gap:"20px"
}}>

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

<div style={{marginTop:"30px"}}>

{preguntas.map((p,i)=>(
<div key={i} style={{
background:"white",
padding:"15px",
marginBottom:"15px",
borderRadius:"10px"
}}>

<p><b>{i+1}. {p}</b></p>

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
borderRadius:"10px",
marginTop:"20px"
}}>

<h2>Resultado</h2>

<p>Total de indicadores: <b>{total}</b></p>
<p>{interpretacion}</p>

<button
onClick={generarPDF}
style={{
background:"#9BCAD5",
border:"none",
padding:"12px 20px",
borderRadius:"8px",
cursor:"pointer",
marginTop:"10px"
}}
>
Descargar PDF
</button>

</div>

</div>

);
}