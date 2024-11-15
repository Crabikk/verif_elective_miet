import { useEffect, useState } from "react";
import css from "./PlantList.module.css"
import PlantItem from "./components/PlantItem/PlantItem";

const PlantsList = () => {

    const [plants, setPlants] = useState([])
    const getPlants = async () => {
        const response = (await fetch("http://localhost:5000/plants"))
        const data = await response.json();
        setPlants(data)

    }
    console.log(plants)
    useEffect(() => {
        getPlants()
    }, [])
    console.log(plants)
    return (
        <section className={css.plantsList}>
            <h1>Список растений</h1>
           <div className={css.plantsList__grid}> {plants && plants.map(plant => (<PlantItem plant={plant}/>))}</div>
        </section>
    );
};

export default PlantsList;