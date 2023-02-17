
export const formatearFechas = (fecha) => {
//Instacia un nuevo obj con la fecha 
 const fechaNueva = new Date(fecha);
 const opciones = {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
 }
 //FORMATEAR
  return fechaNueva.toLocaleDateString('es-ES', opciones);
}
