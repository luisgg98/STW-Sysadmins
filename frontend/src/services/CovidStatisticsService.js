import axios from "axios";

async function fetchHealthZones() {
    try {
        return await axios.get("https://stw-zitation.herokuapp.com/api/healthzone");
    } catch (error) {
        console.log(error)
    }
}

export {fetchHealthZones}
