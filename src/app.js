const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utiles/geocode')
const forecast = require('./utiles/forcecast')

const app = express()
const port = process.env.PORT || 3000

//Define paths for Express configration
const publicDirctoryPath = path.join(__dirname, '../public') 
const viewPath = path.join(__dirname, '../templets/views')  
const patialPath = path.join(__dirname, '../templets/partials')

//setup handlebars engine and view locations
app.set('view engine', 'hbs') //for .hbs
app.set('views', viewPath) //for tamplets 
hbs.registerPartials(patialPath)

//setup static directory to serve
app.use(express.static(publicDirctoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Hassan El-Sayed'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Hassan El-Sayed'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        helptext: 'This is some helpful text',
        title: 'Help!',
        name: 'Hassan El-sayed'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide a address!'
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location } ={} ) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastdata) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                forecast: forecastdata,
                location,
                address: req.query.address
            })

        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term!'
        })
    }
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Hassan El-sayed',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Hassan El-sayed',
        errorMessage: '404 Page note found'
    })
})


app.listen(port, () => {
    console.log('server is up on port '+port)
})


