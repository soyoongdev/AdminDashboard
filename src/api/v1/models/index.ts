import { Model, ModelStatic } from 'sequelize'

export async function syncModel(model: ModelStatic<Model>): Promise<void> {
  try {
    await model.sync({ force: false }) // Set force to true to recreate tables (use with caution in production)
    console.log(`🛠️ ${model.name} model synced.`)
  } catch (error) {
    console.error(`Error syncing ${model.name} model:`, error)
  }
}
