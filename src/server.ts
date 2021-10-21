import * as  http from 'http'
import * as express from 'express'
import * as bodyParser from "body-parser";
import logging from "./config/logging";
import config from "./config/config";
import * as sampleRoutes from './routes/sample'

const NAMESPACE = 'Server'
const router = express()

/**
 * Logging the request
 */
router.use((req, res, next) => {
  logging.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}]`)

  req.on('finish', () => {
    logging.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}], STATUS - [${res.statusCode}]`)
  })

  next()
})

// Parse the request
router.use(bodyParser.urlencoded({extended: false}))
router.use(bodyParser.json())

/** Rules of API
 */
router.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Header', ' X-Requested-With, Content-Type, Accept, Authorisation')
  if (req.method == 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE PUT POST')
    return res.status(200).json({})
  }
  next()
})
/*
  Routes
 */
router.use('/sample', sampleRoutes)

/*
  Error Handling
 */
router.use((req, res, next) => {
  const error = new Error('Not Found')

  return res.status(404).json({
    message: error.message
  })
  next()

})

/*
  Create Server
 */
const httpServer = http.createServer(router)
httpServer.listen(config.server.port, () => logging.info(NAMESPACE, `Server running on ${config.server.hostname}:${config.server.port}`))
