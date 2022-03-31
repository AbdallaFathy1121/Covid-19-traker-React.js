import React from 'react'
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker} from 'react-leaflet'
import "./Map.css";
import { showDataOnMap } from "./Sort";

const Map = ({countries, casesType, center, zoom }) => {
    return (
        <div className="map">
            <MapContainer center={center} zoom={zoom} >
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {/* Loop through countries and draw circles on the screen */}
                {showDataOnMap(countries, casesType)}
            </MapContainer>
        </div>
    )
}

export default Map
