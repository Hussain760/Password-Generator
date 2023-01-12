import { useState, useEffect } from 'react'
import Swal from 'sweetalert2'

function App() {
  const [FormData, setFormData] = useState({
    upperCase: true,
    lowerCase: true,
    numbers: true,
    symbols: true,
    range: 8,
  })

  if (FormData.range > 40) {
    setFormData(pre => {
      return {
        ...pre,
        range: 40,
      }
    })
  }

  function handleChange(event) {
    setFormData(prev => {
      const { name, type, value, checked } = event.target
      return {
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      }
    })
  }

  function randomUpperCase() {
    const randomCharacter = String.fromCharCode(
      Math.floor(Math.random() * 26 + 65)
    )
    return randomCharacter
  }

  function randomLowerCase() {
    const randomCharacter = String.fromCharCode(
      Math.floor(Math.random() * 26 + 97)
    )
    return randomCharacter
  }

  function randomNumber() {
    const randomCharacter = String.fromCharCode(
      Math.floor(Math.random() * 10 + 48)
    )
    return randomCharacter
  }

  function randomSymbols() {
    const symbols = '!@#$%^&*()=+/*-|[]{}<>?`;:.,'
    return symbols[Math.floor(Math.random() * symbols.length)]
  }

  function randomPassword() {
    let result = []
    for (let i = 0; i < FormData.range; i++) {
      const arr = [
        FormData.upperCase && randomUpperCase(),
        FormData.lowerCase && randomLowerCase(),
        FormData.numbers && randomNumber(),
        FormData.symbols && randomSymbols(),
      ]
      const fillterArr = arr.filter(Boolean)
      result.push(fillterArr[Math.floor(Math.random() * fillterArr.length)])
    }
    return result
  }

  function handleSubmit(event) {
    event.preventDefault()
    setFormData(prev => {
      return {
        ...prev,
      }
    })
  }

  function handleCopy() {
    const element = document.querySelector('.result')
    navigator.clipboard.writeText(element.textContent)
    Swal.fire({
      icon: 'success',
      title: 'Copied...',
      text: 'Your Password is Copied!',
    })
  }

  return (
    <main>
      <section className='container'>
        <p className='result'>{randomPassword()}</p>
        <h1 id='title'>Generate Random Password</h1>
        <form>
          <div className='check-container'>
            <input
              className='inputs'
              type='checkbox'
              id='upperCase'
              name='upperCase'
              checked={FormData.upperCase}
              onChange={handleChange}
            />
            <label htmlFor='upperCase'>Include Uppercase Letters</label>
          </div>
          <div className='check-container'>
            <input
              className='inputs'
              type='checkbox'
              id='lowerCase'
              name='lowerCase'
              checked={FormData.lowerCase}
              onChange={handleChange}
            />
            <label htmlFor='lowerCase'>Include Lowercase Letters</label>
          </div>
          <div className='check-container'>
            <input
              className='inputs'
              type='checkbox'
              id='numberic'
              name='numbers'
              checked={FormData.numbers}
              onChange={handleChange}
            />
            <label htmlFor='numberic'>Include Numbers</label>
          </div>
          <div className='check-container'>
            <input
              className='inputs'
              type='checkbox'
              id='symbols'
              name='symbols'
              checked={FormData.symbols}
              onChange={handleChange}
            />
            <label htmlFor='symbols'>Include Symbols</label>
          </div>
          <input
            type='number'
            value={FormData.range}
            name='range'
            onChange={handleChange}
            id='rangeValue'
          />
          <input
            type='range'
            id='range'
            min='0'
            max='40'
            name='range'
            value={FormData.range}
            onChange={handleChange}
          />
        </form>
        <div className='btn-container'>
          <button className='btn copy' onClick={handleCopy}>
            Copy
          </button>
          <button className='btn' onClick={handleSubmit}>
            Genrate
          </button>
        </div>
      </section>
    </main>
  )
}

export default App
