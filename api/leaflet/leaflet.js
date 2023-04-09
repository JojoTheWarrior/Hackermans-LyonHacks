// all this is just for debugging purposes, can safely ignore - since e is a circular structure, we need a custom stringifier to avoid infinite recursion
JSON.safeStringify = (obj, indent = 2) => {
    let cache = [];
    const retVal = JSON.stringify(
    obj,
    (key, value) =>
        typeof value === "object" && value !== null
        ? cache.includes(value)
            ? undefined // Duplicate reference found, discard key
            : cache.push(value) && value // Store value in our collection
        : value,
    indent
    );
    cache = null;
    return retVal;
};

// creates one massive geoJson file of the world - pangaea...
var theWorld = {
    "type":"FeatureCollection",
    "features": [],
    "style":{
        "stroke":"#000000",
        "fill":"#3498DB",
        "stroke-width":1,
        "fill-opacity":0.6
    }
}

theWorld.features = theWorld.features.concat(north_america_data.features);
theWorld.features = theWorld.features.concat(south_america_data.features);

// initializes the empty map with no controls
console.log("joojthewarrior");
var map = L.map('map', {
    center: [51.505, -0.09],
    minZoom: 2.9,
    maxZoom: 5,
    dragging: false,
    zoomControl: false,
    doubleClickZoom: false,
    scrollWheelZoom: false
});

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

map.setView([28, 12.121257773548779], 2.9);

//simple robin karp hash, uses the name of the country to randomize a color for it
function colorHash(name){
    var base = 233, mdl = 1000000007, hash = 0, place = 1, hex = 16777215 + 1;
    for (i = 0; i < name.length; i++){
        if (name.charAt(i) == ' ') continue;
        hash += (place * (name.charAt(i).charCodeAt()) % mdl);
        hash %= mdl;
        place = (place * base) % mdl;
        //console.log(`hash = ${hash}, base = ${base}, char = ${name.charAt(i).charCodeAt()}`);
    }
    hash %= hex;
    //console.log(name + " " + hash.toString(16).padStart(6, '0'));
    return "#" + hash.toString(16).padStart(6, '0');
}

// styles the inputted "feature" (the feature is basically a country)
function style(feature){
    return {
        fillColor: colorHash(feature.properties.name),
        weight: 1,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.3
    };
}

// darkens each of the three colors (RGB) 
function darken(col){
    var R = col.substring(0, 2), G = col.substring(2, 4), B = col.substring(4, 6);
    // adds 22 to each pair in the hex - equivalent to adding 34 in decimal
    R = Math.min(255, parseInt(R, 16) + 34);
    G = Math.min(255, parseInt(G, 16) + 34);
    B = Math.min(255, parseInt(B, 16) + 34);
    //console.log(R.toString(16) + G.toString(16) + B.toString(16));
    return "#" + R.toString(16) + G.toString(16) + B.toString(16);
}

// what happens when you hover over this country
function highlightFeature(e){
    var country = e.target;
    console.log(country.feature.properties.name);

    country.setStyle({
        weight: 1,
        fillColor: darken(country.options.fillColor.substring(1)),
        dashArray: '',
        fillOpacity: 0.8
    });

    country.bringToFront();
}

// simply resets the style back to normal
function resetHighlight(e){
    original_world.resetStyle(e.target);
}

function displaySidebar(country){
    document.getElementById("sidebar").style.display = "block";
    // document.getElementById("name") = country.feature.properties.name; 
}

function zoomInCountry(e) {
    var country = e.target;
    map.fitBounds(country.getBounds());
    displaySidebar(country);
}

// describes the interactivity of each country
function onEachFeature(feature, layer){
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomInCountry
    });
}

//console.log(JSON.safeStringify(north_america_data));

var original_world = L.geoJson(theWorld, {
    style: style,
    onEachFeature: onEachFeature
}).addTo(map);

/* example of how to add markers / polygons / lines to the map
var marker = L.marker([51.5, -0.09]);
marker.addTo(map);
*/

/* example of event listeners for when the map changes
map.on('move', () => {
    var ll = map.getCenter();
    console.log(`${ll.lat}, ${ll.lng}`);
});
*/
