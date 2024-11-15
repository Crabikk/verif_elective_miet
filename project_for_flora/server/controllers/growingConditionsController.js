const GrowingConditionsModel = require("../models/growingConditionsModel")
const { v4: uuidv4 } = require('uuid');

class GrowingConditionsController {

    getAllGrowingConditions(req, res) {
        GrowingConditionsModel.findAll()
            .then(plants => {
                res.json(plants)
            })
    }

    async createGrowingCondition(req, res) {
        const { plant_id, light_level, humidity, temperature } = req.body;
        const id = uuidv4();

        try {
            const existingPlant = await GrowingConditionsModel.findOne({ where: { plant_id } });

            if (existingPlant) {
                return res.status(400).json({ message: "Такое растение уже есть" });
            }

            await GrowingConditionsModel.create({ id, plant_id, light_level, humidity, temperature });

            res.json({ message: "Условия роста растения успешно добавлены" });
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: "Не удалось добавить условия роста растения" });
        }
    }

    deletePlant(req, res) {
        const { id } = req.body
        GrowingConditionsModel.destroy({
            where: { id }
        })
            .then(plants => {
                console.log(plants)
                if (plants === 0) {
                    res.send({ message: "Такое растение не найдено" }).status(400)
                }
                else {
                    res.json({ message: "Растение успешно удалено" })
                }
            })
            .catch(err => {
                console.log(err)
                res.json({ message: "Не удалось удалить растение" }).status(400)
            })
    }

    updatePlant(req, res) {
        const { id, plant_id, light_level, humidity, temperature } = req.body
        if (!plant_id || !light_level || !humidity || !temperature) {
            return res.status(400).json({ message: "Обновите хотя бы одно условие" })
        }
        GrowingConditionsModel.update(
            { plant_id, light_level, humidity, temperature },
            { where: { id } }
        )
            .then(([updatedCount]) => { 
                if (updatedCount === 0) {
                    return res.status(404).json({ message: "Такое растение не найдено" }).status(400)
                }
                else {
                    res.json({ message: "Условия роста растения успешно обновлены" })
                }
            })
            .catch(err => {
                console.log(err)
                res.json({ message: "Растение не найдено" }).status(400)
            })
    }
}


module.exports = new GrowingConditionsController