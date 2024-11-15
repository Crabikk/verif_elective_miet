import { useParams } from "react-router-dom";


const PlantPage = () => {
    const {id} = useParams()
    console.log(id)
    return (
        <div>
            This is my plant page
            <p>{id}</p>
        </div>
    );
};

export default PlantPage;