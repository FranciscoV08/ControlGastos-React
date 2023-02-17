import { ControlPresupuesto } from "./ControlPresupuesto"
import { NuevoPresupuesto } from "./NuevoPresupuesto"



export const Header = ({ 
    presupuesto,
    setPresupuesto,
    isvalidPresupuesto,
    setIsvalidPresupuesto,
    gastos,
    setGastos,
}) => {



    return (
        <header>

            <h1>Control de Gastos</h1>
            
            {/* Ternario  */}
            {isvalidPresupuesto ? (                
                <ControlPresupuesto 
                setGastos={setGastos}
                presupuesto={presupuesto}
                setPresupuesto={setPresupuesto}
                gastos={gastos}
                setIsvalidPresupuesto={setIsvalidPresupuesto}
                />
            ) : (
                <NuevoPresupuesto
                    presupuesto={presupuesto}
                    setPresupuesto={setPresupuesto}
                    setIsvalidPresupuesto={setIsvalidPresupuesto}
                />
            )}
        </header>
    )
}
