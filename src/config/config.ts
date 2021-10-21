import * as dotenv from 'dotenv';

dotenv.config();

const MONGO_OPTIONS = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  socketTimeoutsMS:30000,
  keepAlive: true,
  poolSize: 50,
  autoIndex: false,
  retryWrites: false
}

const MONGO_USERNAME = process.env.MONGO_USERNAME || 'superuser'
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || 'password'
const MONGO_HOST = process.env.MONGO_HOST || 'some_string'

const MONGO = {
  host: MONGO_HOST,
  username: MONGO_USERNAME,
  password: MONGO_PASSWORD,
  options: MONGO_OPTIONS,
  url: `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}`
}

const SERVER_HOSTNAME = process.env.SERVER_PORT || 'localhost'
const SERVER_PORT = process.env.SERVER_PORT || 1337

const SERVER = {
  hostname: SERVER_HOSTNAME,
  port: SERVER_PORT
}

const config = {
  server: SERVER,
  mongo: MONGO
}

export default config
