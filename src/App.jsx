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
const fecha = new Date().toLocaleDateString();

// 🎨 COLOR PRINCIPAL (Casa Terakids)
const color = [155, 202, 213];

// 🔷 HEADER
pdf.setFillColor(...color);
pdf.rect(0, 0, 210, 30, "F");

// LOGO
pdf.addImage(logo, "PNG", 10, 5, 20, 20);

// TÍTULO
pdf.setTextColor(255,255,255);
pdf.setFontSize(16);
pdf.text("Casa Terakids", 105, 15, { align: "center" });

pdf.setFontSize(11);
pdf.text("Reporte de Evaluación", 105, 23, { align: "center" });

// 🔄 RESET COLOR
pdf.setTextColor(0,0,0);

// 🔹 DATOS
pdf.setFontSize(12);
pdf.text(`Nombre: ${nombre}`, 20, 45);
pdf.text(`Edad: ${edad}`, 20, 55);
pdf.text(`Fecha: ${fecha}`, 20, 65);

// 🔹 SEPARADOR
pdf.setDrawColor(200);
pdf.line(20, 75, 190, 75);

// 🔹 RESULTADOS
pdf.setFontSize(14);
pdf.text("Resultados", 20, 90);

pdf.setFontSize(12);
pdf.text(`Indicadores actuales: ${actuales}`, 20, 105);
pdf.text(`Indicadores previos: ${antes}`, 20, 115);

// 🔥 CAJA DE PUNTAJE DESTACADA
pdf.setFillColor(240,240,240);
pdf.roundedRect(20, 125, 170, 20, 5, 5, "F");

pdf.setFontSize(14);
pdf.text(`Puntaje total: ${total} puntos`, 105, 138, { align: "center" });

// 🔹 INTERPRETACIÓN
pdf.setFontSize(14);
pdf.text("Interpretación clínica", 20, 160);

pdf.setFontSize(12);
pdf.text(interpretacion, 20, 170, { maxWidth: 170 });

// 🔹 NOTA
pdf.setFontSize(10);
pdf.setTextColor(100);
pdf.text(
"Este instrumento es una herramienta de detección y no constituye un diagnóstico clínico. Los resultados deben ser interpretados por un profesional.",
20,
210,
{ maxWidth: 170 }
);

// 🔹 FIRMA
pdf.setTextColor(0);
pdf.line(120, 250, 190, 250);
pdf.setFontSize(10);
pdf.text("Nombre y firma del profesional", 125, 258);

// 🔹 FOOTER
pdf.setFontSize(9);
pdf.setTextColor(150);
pdf.text("Casa Terakids - Psicología infantil y neurodesarrollo", 105, 285, { align: "center" });

// 🔹 GUARDAR
pdf.save(`Reporte_${nombre || "Paciente"}.pdf`);

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

<p>Indicadores actuales: <b>{actuales}</b></p>
<p>Indicadores previos: <b>{antes}</b></p>

<p>Total: <b>{total}</b> puntos</p>

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