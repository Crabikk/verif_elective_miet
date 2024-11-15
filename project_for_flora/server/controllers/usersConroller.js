const UsersModel = require("../models/usersModel")
const { v4: uuidv4 } = require('uuid');

class UsersController {
    

    getAllUsers(req, res) {
        UsersModel.findAll() 
            .then(users => {
                res.json(users)
            })
    }

    async createUser(req, res) {
        const { name, email, registration_date} = req.body;
        const id = uuidv4();
    
        try {
          const existingUser = await UsersModel.findOne({ where: { name } });
    
          if (existingUser) {
            return res.status(400).json({ message: "Такой пользователь уже есть" });
          }
    
          await UsersModel.create({ id, name, email, registration_date });
    
          res.json({ message: "Пользователь успешно добавлен" });
        } catch (err) {
          console.log(err);
          res.status(500).json({ message: "Не удалось добавить пользователя" });
        }
      }

    deleteUser(req, res) {
        const {id} = req.body
        UsersModel.destroy({
            where: {id} 
        })
            .then(users => {
                console.log(users)
                if(users===0){
                    res.send({message: "Такой пользователь не найден"}).status(400)
                }
                else {
                    res.json({message: "Пользователь успешно удален"})
                }
            })
            .catch(err => {
                console.log(err)
                res.json({message: "Не удалось удалить пользователя"}).status(400)
            })
    }

    updateUser(req, res) {
        const { id, name, email, registration_date } = req.body;
    
        // Проверяем, что хотя бы один параметр для обновления присутствует
        if (!name && !email && !registration_date) {
            return res.status(400).json({ message: "Обновите хотя бы один параметр" });
        }
    
        UsersModel.update(
            { name, email, registration_date },
            { where: { id } }
        )
        .then(([updatedCount]) => { 
            if (updatedCount === 0) {
                return res.status(404).json({ message: "Такое пользователя не найден" });
            } else {
                return res.json({ message: "Пользователь успешно обновленн" });
            }
        })
        .catch(err => {
            console.error(err);
            return res.status(500).json({ message: "Ошибка при обновлении пользователя" });
        });
    }
    
}


module.exports = new UsersController