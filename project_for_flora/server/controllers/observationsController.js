const ObservationsModel = require("../models/observationsModel")
const { v4: uuidv4 } = require('uuid');
const UsersModel = require("../models/usersModel");

class ObservationController {

    getAllObservations(req, res) {
        ObservationsModel.findAll() 
            .then(observations => {
                res.json(observations)
            })
    }

    async createObservation(req, res) {
        const { user_id, plant_id, observation_date, quantity } = req.body;
        const id = uuidv4();
    
        try {
          const existingObservation = await ObservationsModel.findOne({ where: { user_id } });
    
          if (existingObservation) {
            return res.status(400).json({ message: "Такое наблюдение уже есть" });
          }
    
          await ObservationsModel.create({ id, user_id, plant_id, observation_date, quantity });
    
          res.json({ message: "Наблюдение успешно добавлено" });
        } catch (err) {
          console.log(err);
          res.status(500).json({ message: "Не удалось добавить наблюдение" });
        }
      }

    deleteObservation(req, res) {
        const {id} = req.body
        ObservationsModel.destroy({
            where: {id} 
        })
            .then(observations => {
                console.log(observations)
                if(observations===0){
                    res.send({message: "Такое наблюдение не найдено"}).status(400)
                }
                else {
                    res.json({message: "Наблюдение успешно удалено"})
                }
            })
            .catch(err => {
                console.log(err)
                res.json({message: "Не удалось удалить наблюдение"}).status(400)
            })
    }

    updateObservation(req, res) {
        const {id, user_id, plant_id, observation_date, quantity} = req.body
        if(!user_id || !plant_id || !observation_date || !quantity){
            return res.status(400).json({message: "Обновите хотя бы один параметр"})
        }
        ObservationsModel.update(
            {user_id, plant_id, observation_date, quantity},
            {where: {id}}
        )
        .then(([updatedCount]) => { 
            if (updatedCount === 0) {
                return res.status(404).json({ message: "Такое наблюдение не найдено" });
            } else {
                return res.json({ message: "Наблюдение успешно обновлено" });
            }
        })
            .catch(err => {
                console.log(err)
                res.json({message: "Наблюдение не найдено"}).status(400)
            })
    }
}

module.exports = new ObservationController