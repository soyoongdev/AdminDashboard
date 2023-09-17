import { Sequelize } from 'sequelize'
import keys from '~/v1/utils/keys'
import logging from '~/v1/utils/logging'

const NAMESPACE = '[config/database]'

const { dbname, username, password, host } = keys.mysql

const sequelize = new Sequelize(dbname, username, password, {
  host: host,
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
})

const createConnection = async () => {
  try {
    await sequelize
      .authenticate()
      .then(() => logging.info(NAMESPACE, 'Connection has been established successfully. 👏'))
      .catch((error) => logging.error(NAMESPACE, `Unable to connect to the database: ${error}`))
  } catch (error) {
    logging.error(NAMESPACE, 'Failed to connect to database')
  }
}

const closeConnection = async () => {
  try {
    await sequelize
      .close()
      .then(() => logging.info(NAMESPACE, 'Connection has been closed'))
      .catch((error) => logging.error(NAMESPACE, `Unable to close the database: ${error}`))
  } catch (error) {
    logging.error(NAMESPACE, 'Failed to closed connect database')
  }
}

export { closeConnection, createConnection, sequelize }
