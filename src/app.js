var express = require("express");
const cors = require('cors');
var cookieParser = require('cookie-parser')
var session = require("express-session")
const validaToken = require('./middlewares/auth')
const path= require('path')
var app = express();

app.use('/static', express.static(__dirname + '/public'));
app.use(
    session({
        key:"userId",
        secret: process.env.SECRET,
        resave:false,
        saveUninitialized:false,
        cookie:{
            expires: 60*60*24,
        },
    })
)

// Settings 
app.set('port', process.env.PORT || 4000);

// Middlewares
app.use(cors({origin: true, credentials:true}))



app.use(express.json());
app.use(cookieParser())

// Routes
app.use('/list', validaToken,require('./routes/list'))
app.use('/person', validaToken,require('./routes/person'))
app.use('/contact', validaToken,require('./routes/contact'))
app.use('/carer', validaToken, require('./routes/carer'))
app.use('/medical-consultation', validaToken, require('./routes/medical-consultation'))
app.use('/geriatrical-medical-anamnesis', validaToken,require('./routes/geriatrical-medical-anamnesis'))
app.use('/general-anamnesis',validaToken, require('./routes/general-anamnesis'))
app.use('/user', validaToken, require('./routes/user'))
app.use('/file', validaToken, require('./routes/file'))
app.use('/consultation-appointment',validaToken, require('./routes/consultation-appointment'))
app.use('/referral', validaToken, require('./routes/referral'))
app.use('/soft-tissues-exam', validaToken, require('./routes/soft-tissues-exam'))
app.use('/geriatrical-odonto-anamnesis', validaToken, require('./routes/geriatrical-odonto-anamnesis'))
app.use('/extra-oral-exam', validaToken, require('./routes/extra-oral-exam'))
app.use('/review', validaToken, require('./routes/review'))
app.use('/photo', validaToken, require('./routes/photo'))
app.use('/odontogram', validaToken,require('./routes/odontogram'))

app.use('/mobile', require('./routes/mobile'))
app.use('/session', require('./routes/session.js'))

module.exports = app;


