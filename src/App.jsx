import { useEffect, useState } from 'react'
import './App.css'
import { statusValues } from './constants'

function App() {

  const randomNumbers = [
    Math.floor(Math.random() * 100),
    Math.floor(Math.random() * 100)
  ]

  const [status, setStatus] = useState(statusValues.initial)
  const [size, setSize] = useState("6em")
  const [timer, setTimer] = useState(60)
  const [position, setPosition] = useState(randomNumbers)
  const [score, setScore] = useState(0)

  const handleClick = () => {
    setScore(prevScore => prevScore + 1)
    setPosition(randomNumbers)

    console.log(position)
  }

  useEffect(() => {
    let interval
    if (status === statusValues.playing) {
      interval = setInterval(() => setTimer((timer => timer - 1)), 1000);
    }
    return () => clearInterval(interval)
  }, [status])

  useEffect(() => {
    if (timer === 0) {
      setStatus(statusValues.finished)
    }
  }, [timer])

  return (
    <main>
      <header>
        <h1>{timer} segundos</h1>
        <h2>{score} puntos</h2>
      </header>

      <section style={{ position: 'relative' }}>
        {status === statusValues.playing && <figure
          onClick={handleClick}
          style={{
            width: size,
            height: size,
            position: 'absolute',
            top: `${position[0]}%`,
            left: `${position[1]}%`
          }} />
        }
      </section>

      {(status === statusValues.finished || timer === 0) &&
        <section className='card'>
          <h2>Tu puntaje es {score}</h2>
          <button onClick={() => {
            setStatus('initial')
            setTimer(60)
            setScore(0)
          }} >Reiniciar</button>
        </section>}

      {status === statusValues.initial && <button className='play' onClick={() => setStatus('chooseDifficulty')} >Jugar</button>}

      {status === statusValues.chooseDifficulty &&
        <div className='card'>
          <h2>Seleccione la dificultad: </h2>
          <button className='easy' onClick={() => {
            setSize('6em')
            setStatus('chooseTimer')
          }}>Facil</button>
          <button className='medium' onClick={() => {
            setSize('4em')
            setStatus('chooseTimer')
          }}>Medio</button>
          <button className='hard' onClick={() => {
            setSize('2em')
            setStatus('chooseTimer')
          }}>Dificil</button>
        </div>
      }

      {status === statusValues.chooseTimer &&
        <div className='card'>
          <h2>Seleccione el tiempo: </h2>
          <button onClick={() => {
            setTimer(15)
            setStatus('playing')
          }}>15</button>
          <button onClick={() => {
            setTimer(30)
            setStatus('playing')
          }}>30</button>
          <button onClick={() => {
            setTimer(60)
            setStatus('playing')
          }}>60</button>
        </div>
      }


      {status === statusValues.playing && <button className='play' onClick={() => setStatus('finished')} >Terminar</button>}



    </main>
  )
}

export default App
