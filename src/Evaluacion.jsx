import React, { useState } from "react";
import jsPDF from "jspdf";
import logo from "./assets/logo.png";

const preguntas = [
"Utiliza los juguetes acomodándolos, alineándolos o apilándolos.",
"Parece interesarse más por los objetos que por las personas. \n (El interés principal suele estar en los objetos y no tanto en el contacto social).",
"Muestra retraso significativo en la adquisición del lenguaje.",
"Prefiere jugar con cualquier objeto más que con juguetes.",
"Prefiere estar sola a interactuar o jugar con otros infantes.",
"Nunca ha hablado. \n (Este enunciado debe calificarse únicamente como LO PRESENTA ACTUALMENTE o NUNCA LO HA PRESENTADO).",
"Se interesa sólo por una parte de los objetos, juguetes y/o personas. \n (Ej. Solo por las ruedas de los carritos, por el pelo de las personas o por las aspas del ventilador).",
"Rehúye la mirada cuando se le quiere mirar a los ojos.",
"Es selectiva o repetitiva en su alimentación. \n (Ej. No tolera ciertas consistencias o alimentos nuevos).",
"Repite preguntas o frases que ha oído. (de personas, televisión, radio, etc.), inclusive con una voz similar a la que escuchó.",
"Presenta berrinches inexplicables, sin causa aparente.",
"Muestra poco interés para convivir con personas de su misma edad y si lo hace, parece no saber cómo relacionarse con ellas.",
"Es sensible al contacto de ciertas prendas de vestir: le lastiman las etiquetas de las playeras, prefiere estar descalza, le incomodan ciertas telas, etc.",
"Habla en tercera persona. \n (Ej. Si quiere comer dice, QUIERES COMER; dice LLEGÓ TU MAMÁ cuando se refiere a LLEGÓ MI MAMÁ).",
"En eventos sociales (fiestas, reuniones familiares, etc.) frecuentemente termina jugando sola.",
"Tiene un tono de voz monótono y/o aplanado.",
"Pronunció palabras que dejó de decir sin causa aparente. \n (Este enunciado se refiere a que la persona dijo sus primeras palabras y posteriormente dejó de decirlas sin algún motivo específico).",
"Puede permanecer mucho tiempo realizando una misma actividad siempre y cuando sea de su interés.",
"Al interactuar dice comentarios imprudentes o fuera de lugar, sin darse cuenta de ello.",
"Le desagradan ciertos olores, o huele todo lo que llega a sus manos, o parece no incomodarse con olores que, para otras personas, son desagradables.",
"Cuando quiere algo que no puede obtener por ella misma, le lleva de la a usted tomándolo de la mano hacia el objeto que desea, pero sin mirarle ni hablarle.",
"Lleva a cabo rutinas y rituales que difícilmente permite que sean alteradas, llegando a mostrar ansiedad ante los cambios, y/o personas y/o situaciones nuevas.",
"Muestra poco interés en conocer las ideas del otro, y/o no se puede adaptar a los temas de conversación de los demás, y/o habla repetitivamente sólo de temas de su interés.",
"Rechaza tocar ciertas texturas (rugosas, ásperas, viscosas) o por el contrario, parece agradarle el sentirlas. \n (Ej. La persona evita tocar arena, pasto o tierra porque le incomodan; o pasa mucho tiempo metiendo las manos en la arena, frotándola y dejándola caer).",
"Entiende lo que se le dice de una forma muy literal. No entiende las bromas, los juegos de palabras ni las metáforas.",
"Es ingenua. \n (Ej. No se da cuenta de engaños, burlas, no sabe mentir u ocultar sus intenciones).",
"Emplea palabras muy formales para su edad \n (Ej. Grifo, vehículo, neumático, combustible, malhechor, picaporte, etc.).",
"Presenta facilidad para aprenderse letras, números, figuras, colores y datos.",
"Utiliza frases aprendidas en situaciones sociales para saludar, o despedirse de modo especial o ritualizado, o usa fórmulas de cortesía impropias o inusuales. \n (La persona utiliza frases que ha escuchado en televisión, videos, películas y/o en otras personas).",
"Presenta dificultad para explicar, predecir e interpretar con precisión las emociones de los demás vinculadas a situaciones específicos; es decir, los gestos faciales, el lenguaje corporal y las palabras o frases.",
"Tiene dificultades para dormir.",
"Aún y cuando no utiliza el lenguaje de manera verbal para comunicarse, ocasionalmente dice alguna palabra suelta.",
"No mide riesgos ni peligros."
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