// Define the URL for the earthquake data
const earthquakeDataUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_day.geojson"; // 1.0_day.geojson last 7 days
const tectonicPlatesDataUrl = "static/GeoJSON/PB2002_boundaries.json"; // local GeoJSON file

// Create the map object and set its initial view to a given location and zoom level
let map = L.map("map").setView([37.7749, -122.4194], 3); // Adjust latitude, longitude, and zoom as needed

// Define different base maps
let satelliteMap = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
});

let grayscaleMap = L.tileLayer("https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
    attribution: "&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
});

let outdoorsMap = L.tileLayer("https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png", {
    attribution: "Map data: &copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
});

// Add the satellite map as the default base map
satelliteMap.addTo(map);

// Create the baseMaps object to hold the different base maps
let baseMaps = {
    "Satellite": satelliteMap,
    "Grayscale": grayscaleMap,
    "Outdoors": outdoorsMap
};

// Create layer groups for the earthquakes and tectonic plates
let earthquakes = new L.LayerGroup();
let tectonicPlates = new L.LayerGroup();

// Fetch the earthquake data and plot it on the map
d3.json(earthquakeDataUrl).then(data => {
    // get the data
    console.log(data)

    data.features.forEach(earthquake => {
        let coords = earthquake.geometry.coordinates;
        let magnitude = earthquake.properties.mag;
        let depth = coords[2];
        let lat = coords[1];
        let lon = coords[0];

        // Create a circle marker with size based on magnitude and color based on depth
        L.circleMarker([lat, lon], {
            radius: markerSize(magnitude),
            fillColor: markerColor(depth),
            color: "#000",
            weight: 1,
            opacity: 1,
            fillOpacity: 0.8
        }).bindPopup(`<h3>Magnitude: ${magnitude}</h3><hr><p>Depth: ${depth} km</p><p>${earthquake.properties.place}</p>`).addTo(earthquakes);
    });

    // Add the earthquakes layer to the map
    earthquakes.addTo(map);
});

// Fetch the tectonic plates data and plot it on the map
d3.json(tectonicPlatesDataUrl).then(data => {
    L.geoJson(data, {
        style: function () {
            return { color: "#FF6500", weight: 2 }; // Styling for the tectonic plates
        }
    }).addTo(tectonicPlates);

    // Add the tectonic plates layer to the map
    tectonicPlates.addTo(map);
});

// Create a legend to provide context for the data
let legend = L.control({ position: "bottomright" });

legend.onAdd = function () {
    let div = L.DomUtil.create("div", "info legend");
    let grades = [-10, 10, 30, 50, 70, 90];
    let colors = [
        "#7CFC00",
        "#ADFF2F",
        "#FFD700",
        "#FF8C00",
        "#FF4500",
        "#FF0000"
    ];

    // Add a title to the legend
    div.innerHTML += '<strong>Depth (km)</strong><br>';

    // Loop through the intervals to generate a label with a colored square for each interval
    for (let i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + colors[i] + '; width: 18px; height: 18px; float: left; margin-right: 8px; opacity: 0.8;"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }

    return div;
};

// Add the legend to the map
legend.addTo(map);

// Create the overlayMaps object to hold the earthquake and tectonic plates layers
let overlayMaps = {
    "Earthquakes": earthquakes,
    "Tectonic Plates": tectonicPlates
};

// Add a layer control to the map, allowing users to switch between base maps and overlays
L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
}).addTo(map);

// Functions to determine the marker size and color based on earthquake magnitude and depth
function markerSize(magnitude) {
    return magnitude * 4; // Adjust the multiplier for different sizing
}

function markerColor(depth) {
    if (depth > 90) return "#FF0000";
    if (depth > 70) return "#FF4500";
    if (depth > 50) return "#FF8C00";
    if (depth > 30) return "#FFD700";
    if (depth > 10) return "#ADFF2F";
    return "#7CFC00";
}
