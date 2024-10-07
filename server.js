require('dotenv').config()

const express = require('express')
const app = express()

// la data
const libros = [
  {
    id: "1234",
    title: "Señor de los anillos",
    author: "Tolkien"
  },
  {
    id: "3as5",
    title: "Dune",
    author: "Frank Herbert"
  },
  {
    id: "8i9o",
    title: "Harry Potter",
    author: "JK Rowling"
  }
]

// configuraciones
const morgan = require("morgan")
app.use(morgan("dev"))

// configuramos la ubicaciones de todos los elementos estaticos del servidor (css, js, imagenes, videos, audios)
app.use( express.static("public") )

// middleware => algo que quiero que siempre se ejecute independientemente de la ruta de acceso

app.use((req, res, next) => {
  console.log("Esto siempre se ejecuta")

  // autenticación
  // validar usuario
  // verificaciones de error
  // comportamientos de usuario

  // pasar alguna data del middleware a la ruta
  req.informacionAdicional = "Video de Moo Deng"

  // despues de la ejecución, ejecutamos next
  next() // continua con las rutas correspondientes
}) // "use" es algo que siempre se ejecuta

// Esto es una Ruta de Servidor que cuando el usuario vaya a "/" proceso lo que hay dentro.
app.get('/', (req, res) => {
  console.log(req.informacionAdicional)
  res.send(`Hello World! ${req.informacionAdicional}`)
})

app.get("/patata", (req, res) => {
  res.send("Aqui tienes muchas patatas y una sala brava")
})

app.get("/books", (req, res) => {
  res.json(libros)
})

app.get("/books/random", (req, res) => {
  const randomBookIndex = Math.floor( Math.random() * libros.length )
  res.json(libros[randomBookIndex])
})

app.get("/inicio", (req, res) => {

  console.log(__dirname) // indica la dirección absoluta hasta donde se esté siendo llamado
  res.sendFile(__dirname + "/views/home.html")

})

app.get("/conocenos", (req, res) => {

  res.sendFile(__dirname + "/views/about.html")

})


const port = process.env.PORT
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})