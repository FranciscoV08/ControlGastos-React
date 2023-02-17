import { useEffect, useState } from "react"
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export const ControlPresupuesto = ({ gastos, setGastos, presupuesto, setPresupuesto,setIsvalidPresupuesto }) => {

    const [porcentaje, setPorcentaje] = useState(0)
    const [disponible, setDisponible] = useState(0)
    const [gastado, setGastado] = useState(0)


    useEffect(() => {
        // Array.Reduce(acumulador, iterador => .. + .. ,valueInitial) 
        const totalGastado = gastos.reduce((total, gasto) => gasto.cantidad + total, 0)
        const totalDisponible = presupuesto - totalGastado;

        //Calcular el porcentaje gastado
        const nuevoPorcentaje = (((presupuesto - totalDisponible) / presupuesto) * 100).toFixed(2);

        setDisponible(totalDisponible);
        setGastado(totalGastado);

        setTimeout(() => {
            setPorcentaje(nuevoPorcentaje)

        }, 500);
    }, [gastos])


    const formatearCantidad = (cantidad) => {

        return cantidad.toLocaleString('en-US', {
            style: 'currency', //moneda
            currency: 'USD'       //Tipo de moneda 
        })
    }

    const handleResetApp = () => {
        const resultado = confirm('¿Deseas Reiniciar Presupuestos y Gastos?')
        if (resultado) {
            setGastos([])
            setPresupuesto(0)
            setIsvalidPresupuesto(false)
        }
    }

    return (
        <div className="contenedor-presupuesto contenedor sombra dos-columnas">
            <div>
                <CircularProgressbar
                    styles={buildStyles({
                        pathColor: porcentaje > 100 ? '#DC2626' : '#3b82f6' ,
                        trailColor: '#f5f5f5',
                        textColor:  porcentaje > 100 ? '#DC2626' : '#3b82f6'
                    })}
                    value={porcentaje}
                    text={`${porcentaje}% Gastado`}

                >

                </CircularProgressbar>
            </div>
            <div className="contenido-presupuesto">
                <button 
                    className="reset-app"
                    type="button"
                    onClick={handleResetApp}
                >
                    Resetear App
                </button>
                <p>
                    <span>Presupuesto: </span>{formatearCantidad(presupuesto)}
                </p>
                <p className={`${disponible < 0 ? `negativo` : ''}`}>
                    <span>Disponible: </span>{formatearCantidad(disponible)}
                </p>
                <p>
                    <span>Gastado: </span>{gastado}
                </p>
            </div>
        </div>
    )
}
