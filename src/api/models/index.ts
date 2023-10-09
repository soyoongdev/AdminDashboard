import { Model, ModelStatic, Sequelize, SyncOptions } from 'sequelize'
import { dbconfig } from '~/config/database.config'
import logging from '~/utils/logging'

const NAMESPACE = 'model/index'

const { database, host, username, password } = dbconfig.development

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
;async () => {
  try {
    await sequelize
      .authenticate()
      .then(() => logging.info(NAMESPACE, 'Connection has been established successfully. 👏'))
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

export const syncModel = async (model: ModelStatic<Model>, options?: SyncOptions): Promise<void> => {
  try {
    await model.sync(options) // Set force to true to recreate tables (use with caution in production)
    console.log(`🛠️ ${model.name} model synced.`)
  } catch (error) {
    console.error(`Error syncing ${model.name} model:`, error)
  }
}

export default sequelize
