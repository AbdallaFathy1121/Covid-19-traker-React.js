import React from "react"
import numeral  from "numeral";
import {LayerGroup, Circle, Popup} from 'react-leaflet'

export const sortData = (data) => {
    
    const sortedData = [...data];

    return sortedData.sort((a, b) => a.cases > b.cases ? -1 : 1)

}


const casesTypeColors = {
    cases: {
        hex: "#CC1034",
        multiplier: 800,
    },
    recovered: {
        hex: "#7dd71d",
        multiplier: 1200,
    },
    deaths: {
        hex: "#fd4443",
        multiplier: 2000,
    }
};

export const showDataOnMap = (data, casesType='cases') => {
    data.map(country=> (
        <LayerGroup>
            <Circle
                center={[country.countryInfo.lat, country.countryInfo.long]}
                fillOpacity={0.4}
                color={casesTypeColors[casesType].hex}
                fillColor={casesTypeColors[casesType].hex}
                raduis={
                    Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
                }
            >

            <Popup>
                <h1>I Am Popup</h1>
            </Popup>

            </Circle>
        </LayerGroup>

    ))
}


