const HabitatsModel = require("../models/habitatsModel")
const { v4: uuidv4 } = require('uuid');

class HabitatsController {

    getAllHabitats(req, res) {
        HabitatsModel.findAll()
            .then(habitats => {
                res.json(habitats)
            })
    }

    createHabitat(req, res) {
        const { habitat_name, description } = req.body
        const id = uuidv4()

        HabitatsModel.create({ id, habitat_name, description })
            .then(data => {
                res.json({ message: "Среда обитания успешно добавлена" })
            })
            .catch(err => {
                console.log(err)
                res.json({ message: "Не удалось создать среду обитания" }).status(400)
            })
    }

    async createHabitat(req, res) {
        const { habitat_name, description } = req.body;
        const id = uuidv4();

        try {
            const existingPlant = await HabitatsModel.findOne({ where: { habitat_name } });

            if (existingPlant) {
                return res.status(400).json({ message: "Такая среда обитания уже есть" });
            }

            await HabitatsModel.create({ id, habitat_name, description });

            res.json({ message: "Среда обитания успешно добавлена" });
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: "Не удалось создать среду обитания" });
        }
    }

    deleteHabitat(req, res) {
        const { id } = req.body
        HabitatsModel.destroy({
            where: { id }
        })
            .then(habitats => {
                console.log(habitats)
                if (habitats === 0) {
                    res.send({ message: "Среда обитания не найдена" }).status(400)
                }
                else {
                    res.json({ message: "Среда обитания успешно удалена" })
                }
            })
            .catch(err => {
                console.log(err)
                res.json({ message: "Не удалось удалить среду обитания" }).status(400)
            })
    }

    updateHabitat(req, res) {
        const { id, habitat_name, description } = req.body
        if (!habitat_name || !description) {
            return res.status(400).json({ message: "Обновите хотя бы одну среду обитания" })
        }
        HabitatsModel.update(
            { habitat_name, description },
            { where: { id } }
        )
            .then(([updatedCount]) => { 
                if (updatedCount === 0) {
                    return res.status(404).json({ message: "Среда обитания не найдена" }).status(400)
                }
                else {
                    res.json({ message: "Среда обитания успешно обновлена" })
                }
            })
            .catch(err => {
                console.log(err)
                res.json({ message: "Среда обитания не найдена" }).status(400)
            })
    }
}


module.exports = new HabitatsController