import axios from './APICall'

async function fetchHealthZones() {
    try {
        return await axios.get("https://stw-zitation.herokuapp.com/api/healthzone");
    } catch (error) {
        console.log(error)
    }
}

export {fetchHealthZones}
