import { Gasto } from "./Gasto"

export const ListadoGastos = ({
  gastos,
  setGastoEditar,
  eliminarGastos,
  filtro,
  gastosFiltrados
}) => {

  return (
    <div className="listado-gastos contenedor">
      {/* ternario  */}

      {/* SI HAY UN FILTRO ITERA SOBRE EL STATE GASTOFILTRADO de lo contrario ITERA GASTOS */}
      {filtro ?
        (
          <>
            <h2>{gastosFiltrados.length ? 'Gastos' : 'No hay gastos aun'}</h2>

            {gastosFiltrados.map(gasto => (
              <Gasto
                key={gasto.id}
                gasto={gasto}
                setGastoEditar={setGastoEditar}
                eliminarGastos={eliminarGastos}
              />
            ))}
          </>
        ) : (
          <>
            <h2>{gastos.length ? 'Gastos' : 'No hay gastos aun'}</h2>
            {gastos.map(gasto => (
              <Gasto
                key={gasto.id}
                gasto={gasto}
                setGastoEditar={setGastoEditar}
                eliminarGastos={eliminarGastos}
              />
            ))}
          </>
        )
      }

    </div>
  )
}
