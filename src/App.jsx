//Hook
import { useEffect, useState } from 'react'
//Component
import { Header } from './components/Header'
import { Modal } from './components/Modal'
import { ListadoGastos } from './components/ListadoGastos'
import { Filtros } from './components/Filtros'
//Funciones
import { generarId } from './helpers'
//Img
import IconoNuevoGasto from './img/nuevo-gasto.svg'

function App() {

  // <<----------STATES--------->>

  //EL COMPONENTE pASA POR TODO
  //STATE PARA GUARDAR EL NUMERO
  const [presupuesto, setPresupuesto] = useState(
    Number(localStorage.getItem('presupuesto')) ?? 0
  )
  //STATE PARA GUARDAR LA VALIDACIÖN
  const [isvalidPresupuesto, setIsvalidPresupuesto] = useState(false)
  //STATE PARA AGREGAR GASTOS
  const [modal, setModal] = useState(false)
  const [animarModal, setAnimarModal] = useState(false)
  const [gastos, setGastos] = useState(
    localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')) : []
    )
  const [gastoEditar, setGastoEditar] = useState({})
  const [filtro, setFiltro] = useState('')
  const [gastosFiltrados, setGastosFiltrados] = useState([])





  // <<----------EFFECT--------->>


  useEffect(() => {

    if (Object.keys(gastoEditar).length > 0) {
      setModal(true)

      //AYUDA A LA ANIMACIÖN
      setTimeout(() => {
        setAnimarModal(true)
      }, 500);

    }

    // setModal(true)
  }, [gastoEditar])

  useEffect(() => {
    localStorage.setItem('presupuesto', presupuesto ?? 0)
  }, [presupuesto])

  useEffect(() => {
    localStorage.setItem('gastos', JSON.stringify(gastos) ?? [])
  }, [gastos])


  useEffect(() => {
    const presupuestoLS = Number(localStorage.getItem('presupuesto')) ?? 0;
    if (presupuestoLS > 0) {
      setIsvalidPresupuesto(true)
    }

    // const gastosLS = localStorage.getItem()
    // if (Object.keys(gastos).length > 0){
    //   console.log('Hay gastos')
    // }

  }, [])

  useEffect(() => {
    if (filtro === '') {
      console.log('No tiene nada')
    }else{
      console.log('Filtrando...')

      const result = gastos.filter( gasto => gasto.categoria === filtro )
      setGastosFiltrados(result)
    }
  }, [filtro])







  // <<----------FUNCIONES--------->>

  const handleNuevoGasto = () => {

    setModal(true)

    setGastoEditar({})
    //AYUDA A LA ANIMACIÖN
    setTimeout(() => {
      setAnimarModal(true)
    }, 500);

  }
  const guardarGasto = (gasto) => {

    if (gasto.id) {
      //ACTUALIZAR
      //Identifica el gasto y retorna los demas que estan guardados
      const gastoActualizado = gastos.map(gastoState => gastoState.id === gasto.id ? gasto : gastoState)
      setGastos(gastoActualizado)
      setGastoEditar({})
    } else{
      //Nuevo Gasto
      //Creamos id en gasto y le guardamos el valor de la funcion
      gasto.id = generarId();
      gasto.fecha = Date.now();

      setGastos([...gastos, gasto])
    }
    //OCULTAR MODAL
    setAnimarModal(false)
    setTimeout(() => {
      setModal(false)

    }, 500);
  }

  const eliminarGastos = (id) => {
    const gastosActualizad = gastos.filter( gasto => gasto.id !== id);
    setGastos(gastosActualizad);
  }

  return (
    <div className= {modal ? 'fijar' : ''}>
      <Header
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isvalidPresupuesto={isvalidPresupuesto}
        setIsvalidPresupuesto={setIsvalidPresupuesto}
        gastos={gastos}
        setGastos={setGastos}
      />

      {/* EJECUTA EL CODIGO CUANDO ES TRUE */}
      {isvalidPresupuesto
      && (
        <>
          <main>
            <Filtros
              filtro={filtro}
              setFiltro={setFiltro}
            />

            <ListadoGastos
              gastos={gastos}
              setGastoEditar={setGastoEditar}
              eliminarGastos={eliminarGastos}
              filtro={filtro}
              gastosFiltrados={gastosFiltrados}

              />
          </main>

          <div className='nuevo-gasto'>
            <img
              src={IconoNuevoGasto}
              alt="icono-nuevo-gasto"
              onClick={handleNuevoGasto}
            />
          </div>
        </>
      )}


      {/* EJECUTA EL CODIGO CUANDO ES TRUE */}
      {modal
        &&
        <Modal
          setModal={setModal}
          animarModal={animarModal}
          setAnimarModal={setAnimarModal}
          guardarGasto={guardarGasto}
          gastoEditar={gastoEditar}
          setGastoEditar={setGastoEditar}
        />}
    </div>
  )
}

export default App
