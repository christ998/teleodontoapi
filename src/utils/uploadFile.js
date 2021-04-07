const multer = require('multer')
const path = require('path')

var uploadFiles={} //Variable que agrupará todas las configuraciones diskStorage

var storage = multer.diskStorage({ //
    destination: function (req, file, cb) { //Se configura el destino o donde se guardarán los archivos
        multer({dest: 'consents/'+req.params.run}) // Con esta línea se crea SOLO la carpeta donde quedaran los pdf o jpg (aun no se especifica donde se guardaran los archivos)
        cb(null, 'consents/'+req.params.run) // Aqui se especifica la ruta donde se guardarán los archivos, tiene que calzar con la línea anterior, de lo contrario genera error, y el 1er parametro siempre es null, no se porque xd
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname) //Aqui se configura el nombre a guardar de los archivos, se deja con file.originalname para que se guarden con el mismo nombre que el original
    }
})
var imagesMG = multer.diskStorage({ //
    destination: function (req, file, cb) { //Se configura el destino o donde se guardarán los archivos
        multer({dest: path.join(__dirname,'../public/images_anam_medico/'+req.params.run)}) // Con esta línea se crea SOLO la carpeta donde quedaran los pdf o jpg (aun no se especifica donde se guardaran los archivos)
        cb(null, path.join(__dirname,'../public/images_anam_medico/'+req.params.run)) // Aqui se especifica la ruta donde se guardarán los archivos, tiene que calzar con la línea anterior, de lo contrario genera error, y el 1er parametro siempre es null, no se porque xd
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname) //Aqui se configura el nombre a guardar de los archivos, se deja con file.originalname para que se guarden con el mismo nombre que el original
    }
})
var imagesOG = multer.diskStorage({ //
    destination: function (req, file, cb) { //Se configura el destino o donde se guardarán los archivos
        multer({dest: path.join(__dirname,'../public/images_anam_odonto/'+req.params.run)}) // Con esta línea se crea SOLO la carpeta donde quedaran los pdf o jpg (aun no se especifica donde se guardaran los archivos)
        cb(null, path.join(__dirname,'../public/images_anam_odonto/'+req.params.run)) // Aqui se especifica la ruta donde se guardarán los archivos, tiene que calzar con la línea anterior, de lo contrario genera error, y el 1er parametro siempre es null, no se porque xd
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname) //Aqui se configura el nombre a guardar de los archivos, se deja con file.originalname para que se guarden con el mismo nombre que el original
    }
})

var reviews = multer.diskStorage({
    destination: function (req, file, cb) { //Se configura el destino o donde se guardarán los archivos
        let pathname = path.join(__dirname,'../public/reviews/'+req.params.run)
        multer({dest: pathname}) // Con esta línea se crea SOLO la carpeta donde quedaran los pdf o jpg (aun no se especifica donde se guardaran los archivos)
        cb(null, pathname) // Aqui se especifica la ruta donde se guardarán los archivos, tiene que calzar con la línea anterior, de lo contrario genera error, y el 1er parametro siempre es null, no se porque xd
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname) //Aqui se configura el nombre a guardar de los archivos, se deja con file.originalname para que se guarden con el mismo nombre que el original
    }
})

uploadFiles.subirPdf = multer({storage: storage}) //Aqui se le dice a multer cual configuración se va a usar para guardar archivos
uploadFiles.subirReview = multer({storage: reviews})
uploadFiles.imagesMG = multer({storage: imagesMG})
uploadFiles.imagesOG = multer({storage: imagesOG})
module.exports = {subir:uploadFiles}