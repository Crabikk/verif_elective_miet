const PlantsModel = require("../models/plantsModel")
const { v4: uuidv4 } = require('uuid');


class PlantsController {

    // Получение растения по ID
    //получение id код Максима
    getPlantById (req, res) {
       const {id} = req.params
       console.log(id);
       if(!id) {
           res.status(400).json({message: "id is not definde"})
           return
       }

       PlantsModel.findOne({
           where: {
               id: id
           }
       })
           .then(data => {
               if(data) res.json(data).status(200)
               else return res.status(404).json({message: "plant not found"})
           })
           .catch(err => res.status(400).json({message: err}))
    }


getAllPlants(req, res) {
    PlantsModel.findAll()
        .then(plants => {
            res.json(plants)
        })
}

    async createPlant(req, res) {
    const { plant_name, scientific_name, type, family, description, date_added } = req.body;
    const id = uuidv4();

    try {
        const existingPlant = await PlantsModel.findOne({ where: { plant_name } });

        if (existingPlant) {
            return res.status(400).json({ message: "Такое растение уже есть" });
        }

        await PlantsModel.create({ id, plant_name, scientific_name, type, family, description, date_added });

        res.json({ message: "Растение успешно добавлено" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Не удалось добавить растение" });
    }
}



deletePlant(req, res) {
    const { id } = req.body
    PlantsModel.destroy({
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
    const { id, plant_name, scientific_name, type, family, description, date_added } = req.body
    if (!plant_name || !scientific_name || !type || !family || !description) {
        return res.status(400).json({ message: "Обновите хотя бы одно растение" })
    }
    PlantsModel.update(
        { plant_name, scientific_name, type, family, description, date_added },
        { where: { id } }
    )
        .then(([updatedCount]) => {
            if (updatedCount === 0) {
                return res.status(404).json({ message: "Такое растение не найдено" });
            } else {
                return res.json({ message: "Растение успешно обновлено" });
            }
        })
        .catch(err => {
            console.log(err)
            res.json({ message: "Растение не найдено" }).status(400)
        })
        
}
}


module.exports = new PlantsController