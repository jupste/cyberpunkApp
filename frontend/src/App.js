import React, { useState, useEffect }  from 'react';
import Gear from './components/Gear'
import gearService from './services/gear'

const App = () =>{
  const [gear, setGear] = useState([])
  const [newGear, setNewGear] = useState('')
  const [newCost, setNewCost] = useState('')
  const [newType, setNewType] = useState('')

  useEffect(() => {
    console.log("helo")
    gearService
      .getAll()
      .then(initialInv => {
        console.log("all is well")
        setGear(initialInv)

      })}, [])



  const addGear = (event) => {
    event.preventDefault()
    const gearObject = {
      name: newGear,
      cost: newCost,
      type: newType,
      id: gear.length + 1,
    }
    setGear(gear.concat(gearObject))
    setNewGear('')
  }

  const handleGearChange = (event) => {
    console.log(event.target.value)
    setNewGear(event.target.value)
  }

    return (
      <div>
        <h1>Cybershop</h1>
        <ul>
          {gear.map((g, i) =>
            <Gear key={i} gear={g} />
          )}
          </ul>
          <form onSubmit={addGear}>
          <input
            value={newGear}
            onChange={handleGearChange}
            />
            <button type="submit">save</button>
            </form>
            </div>
          );
      }
export default App;
