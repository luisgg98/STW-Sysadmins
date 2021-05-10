import axios from './APICall'

async function getHealthZones() {
    try {
        return await axios.get("https://stw-zitation.herokuapp.com/api/healthzone");
    } catch (error) {
        console.log(error)
    }
}

export {getHealthZones}
