const PlantHabitatsModel = require("../models/plantHabitatsModel")
const { v4: uuidv4 } = require('uuid');

class PlantHabitatController {

    getAllPlantHabitats(req, res) {
        PlantHabitatsModel.findAll()
            .then(plantshabitats => {
                res.json(plantshabitats)
            })
    }

    createPlantHabitats(req, res) {
        const { plant_id, habitat_id, notes, data_recorded, is_active } = req.body
        const id = uuidv4()

        PlantHabitatsModel.create({ id, plant_id, habitat_id, notes, data_recorded, is_active })
            .then(data => {
                res.json({ message: "Описание среды растения успешно добавлена" })
            })
            .catch(err => {
                console.log(err)
                res.json({ message: "Описание среды растения не удалось добавить" }).status(400)
            })
    }

    deletePlantHabitats(req, res) {
        const { id } = req.body
        PlantHabitatsModel.destroy({
            where: { id }
        })
            .then(plants => {
                console.log(plants)
                if (plants === 0) {
                    res.send({ message: "Описание среды растения не найдено" }).status(400)
                }
                else {
                    res.json({ message: "Описание среды растения успешно удалено" })
                }
            })
            .catch(err => {
                console.log(err)
                res.json({ message: "Не удалось удалить описание среды растения" }).status(400)
            })
    }

    updatePlantHabitats(req, res) {
        const { id, plant_id, habitat_id, notes, data_recorded, is_active } = req.body
        if (!plant_id || !habitat_id || !notes) {
            return res.status(400).json({ message: "Обновите хотя бы одно описание среды растения" })
        }
        PlantHabitatsModel.update(
            { plant_id, habitat_id, notes, data_recorded, is_active },
            { where: { id } }
        )
            .then(([updatedCount]) => { 
                if (updatedCount === 0) {
                    return res.status(404).json({ message: "Такое описание среды растения не найдено" }).status(400)
                }
                else {
                    res.json({ message: "Описание среды растения успешно обновлено" })
                }
            })
            .catch(err => {
                console.log(err)
                res.json({ message: "Описание среды растения не найдено" }).status(400)
            })
    }
}


module.exports = new PlantHabitatController