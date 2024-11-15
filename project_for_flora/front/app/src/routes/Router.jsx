import { Routes, Route } from "react-router-dom"
import PlantsList from "../modules/PlantsList/PlantsList";
import PlantPage from "../modules/PlantPage/PlantPage";

const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<PlantsList />}/>
            <Route path="/plant/:id" element={<PlantPage/>}/>
            <Route path="*" element={<PlantsList />}/>
        </Routes>

    );
};

export default Router;