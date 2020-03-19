const express = require('express')
const app = express()
const cors = require('cors')

const mongoose = require('mongoose')

app.use(cors())
app.use(express.json())
app.use(express.static('build'))

require('dotenv').config()

const Gear = require('./models/gear.js')


const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(requestLogger)


app.get('/api/inventory', (request, response) => {
  Gear.find({}).then(inv => {
    response.json(inv.map(gear => gear.toJSON()))
  })
})

app.get('/', (req, res) => {
  res.send('<h1>Cyberpunk app!</h1>')
})

app.post('/api/inventory', (request, response) => {
  const body = request.body

  if (!body.name) {
    return response.status(400).json({
      error: 'content missing'
    })
  }

  const gear = new Gear({
    name: body.name,
    cost: body.cost,
    damage: body.damage,
    type: body.type,
    subtype: body.subtype,
    description: body.description,
    rarity: body.rarity
  })

  gear.save().then(savedGear => {
    response.json(savedGear.toJSON()).then(savedAndFormatted => {
      response.json(savedAndFormatted)
    })
    .catch(error => next(error))
  })
})

app.get('/api/inventory/:id', (request, response, next) => {
  Gear.findById(request.params.id)
    .then(gear => {
      if (gear) {
        response.json(gear.toJSON())
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.delete('/api/inventory/:id', (request, response, next) => {
  Gear.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.put('/api/inventory/:id', (request, response, next) => {
  const body = request.body

  const gear = {
    name: body.name,
    cost: body.cost,
    damage: body.damage,
    type: body.type,
    subtype: body.subtype,
    description: body.description
  }

  Gear.findByIdAndUpdate(request.params.id, gear, { new: true })
    .then(updatedNote => {
      response.json(updatedNote.toJSON())
    })
    .catch(error => next(error))
})


app.use(unknownEndpoint)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
