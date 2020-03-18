const mongoose = require('mongoose')

if ( process.argv.length<3 ) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://jussis:${password}@cyberpunkstorage-qojec.mongodb.net/test?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const gearSchema = new mongoose.Schema({
  name: String,
  cost: Number,
  damage: String,
  type: String,
  subtype: String,
  description: String
})

const Gear = mongoose.model('Gear', gearSchema)

const gear = new Gear({
  name: 'Shooty McShooty',
  cost: 1,
  damage: "100d6",
  type: "weapon",
  subtype: "shotgun",
  description: "Goes bang bang"
})


gear.save().then(response => {
  console.log('gear saved!');
  mongoose.connection.close();
})


Gear.find({}).then(result => {
  result.forEach(gear => {
    console.log(gear)
  })
  mongoose.connection.close()
})
