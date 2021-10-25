const express = require('express')
const mongoose = require('mongoose')
const keys = require('./config/keys')
const passport = require('passport')
const path = require('path')

const authRoutes = require('./routes/auth')
const postsRoute = require('./routes/posts')
const profileRoute = require('./routes/profile')
const shopRoute = require('./routes/shop')
const orderRoute = require('./routes/order')
const analyticsRoutes = require('./routes/analytics')
const servisesRoutes = require('./routes/services')
const statisticsRoute = require('./routes/statistics')


const app = express()

mongoose.connect(keys.mongoURI,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true,
    useFindAndModify:true
})
    .then(()=>console.log('MongoDB connected'))
    .catch(error => console.log(error))

app.use(passport.initialize())
require('./middleware/passport')(passport)
app.use(express.json())
app.use('/uploads', express.static('uploads'))

app.use('/api/auth', authRoutes)
app.use('/api/posts', postsRoute)
app.use('/api/profile', profileRoute)
app.use('/api/shop', shopRoute)
app.use('/api/order', orderRoute)
app.use('/api/analytics', analyticsRoutes)
app.use('/api/services', servisesRoutes)
app.use('/api/control', servisesRoutes)
app.use('/api/statistics', statisticsRoute)


// app.use(express.static('angular'))


// app.get('*', (req, res) => {
//     res.sendFile(    
//         path.resolve(    
//             __dirname, 'angular', 'index.html'    
//         )    
//     )    
// })        

module.exports = app