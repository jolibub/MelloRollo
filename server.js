const express = require('express')
const mongoose = require('mongoose')
const basicAuth = require('express-basic-auth')
const creds = require('./creds')
const MellosRollo = require('./models/mellosRollo')
const app = express()

mongoose.connect('mongodb://localhost/mellosRollos', {
  useNewUrlParser: true, useUnifiedTopology: true
}).then(() => {
  console.log('Connected to Database')
}).catch((err) => {
  console.log(err)
})

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(basicAuth({
  users: creds,
  challenge: true
}))

app.get('/', async (req, res) => {
  const rolloCountTotal = await MellosRollo.countDocuments()

  const todayBeginning = new Date()
  todayBeginning.setUTCHours(0,0,0,0)

  const rolloCountToday = await MellosRollo.find({ rolloAteAt: { $gte: todayBeginning} }).countDocuments()
  res.render('index', { rolloCountTotal: rolloCountTotal, rolloCountToday: rolloCountToday})
})

app.get('/rollo', (req, res) => {
  res.render('rollo')
})

app.post('/addRollo', async (req, res) => {
  await MellosRollo.create({})
  res.redirect('/')
})

app.listen(process.env.PORT || 3000)