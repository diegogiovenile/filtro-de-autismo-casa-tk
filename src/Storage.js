export const guardar = (data)=>{
const prev = JSON.parse(localStorage.getItem("pacientes")) || [];
prev.push(data);
localStorage.setItem("pacientes", JSON.stringify(prev));
};

export const obtener = ()=>{
return JSON.parse(localStorage.getItem("pacientes")) || [];
};