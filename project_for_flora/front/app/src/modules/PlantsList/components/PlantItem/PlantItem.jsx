import { Card } from 'antd';
import { Link } from "react-router-dom"


const PlantItem = ({ plant }) => {
    return (
        <Link to={`/plant/${plant.id}`}>
            <Card
                title={plant.plant_name}
                bordered={false}
            >
                <p>{plant.description}</p>
            </Card>
        </Link>

    );
};

export default PlantItem;