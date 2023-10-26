import { Sequelize } from 'sequelize-typescript'
import { mysqlConfig } from '~/config/database.config'
import logging from '~/utils/logging'

const NAMESPACE = 'model/index'

const { database, host, username, password } = mysqlConfig.development

const sequelize = new Sequelize(database, username, password, {
  host: host,
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
})

// eslint-disable-next-line semi
;async () => {
  try {
    await sequelize
      .authenticate()
      .then(() => {
        logging.info(NAMESPACE, 'Connection has been established successfully. 👏')
      })
      .catch((error) => logging.error(NAMESPACE, `Unable to connect to the database: ${error}`))
  } catch (error) {
    logging.error(NAMESPACE, 'Failed to connect to database')
  }
}

export const closeConnection = async () => {
  try {
    await sequelize
      .close()
      .then(() => logging.info(NAMESPACE, 'Connection has been closed'))
      .catch((error) => logging.error(NAMESPACE, `Unable to close the database: ${error}`))
  } catch (error) {
    logging.error(NAMESPACE, 'Failed to closed connect database')
  }
}

export default sequelize
