window.onload = () => {
    let method = 'dynamic';

    // if you want to statically add places, de-comment following line
    // method = 'static';

    if (method === 'static') {
        let places = staticLoadPlaces();
        renderPlaces(places);
    }

    if (method !== 'static') {

        // first get current user location
        return navigator.geolocation.getCurrentPosition(function (position) {

            // than use it to load from remote APIs some places nearby
            dynamicLoadPlaces(position.coords)
                .then((places) => {
                    renderPlaces(places);
                })
        },
            (err) => console.error('Error in retrieving position', err),
            {
                enableHighAccuracy: true,
                maximumAge: 0,
                timeout: 27000,
            }
        );
    }
};

function staticLoadPlaces() {
    return [
        {
            name: "Shop",
            latitude: 49.839111, // add here latitude if using static data
            longitude: 25.493607, // add here longitude if using static data
        },
        {
            name: 'East',
            latitude: 49.835494,
            longitude: 25.496392,
        },
        {
            name: 'West',
            latitude: 49.835841,
            longitude: 25.488656,
        }
    ];
}

// getting places from REST APIs
function dynamicLoadPlaces(position) {    
    // CORS Proxy to avoid CORS problems
    let corsProxy = 'https://cors-anywhere.herokuapp.com/';

    let endpoint = `http://localhost:3000/api/locations`;
    return fetch(endpoint)
        .then((res) => {
            return res.json()
                .then((resp) => {
                    console.log(resp)
                    return resp;
                })
        })
        .catch((err) => {
            console.error('Error with places API', err);
        })
};

function renderPlaces(places) {
    let scene = document.querySelector('a-scene');

    places.forEach((place) => {
        const latitude = place.latitude
        const longitude = place.longitude;

        // add place link
        const aLink = document.createElement('a-link');
        aLink.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude}`);
        aLink.setAttribute('title', place.name);
        // icon.setAttribute('src', '../assets/map-marker.png');

        // for debug purposes, just show in a bigger scale, otherwise I have to personally go on places...
        aLink.setAttribute('scale', '20, 20');

        aLink.addEventListener('loaded', () => window.dispatchEvent(new CustomEvent('gps-entity-place-loaded')));

        const clickListener = function (ev) {
            ev.stopPropagation();
            ev.preventDefault();

            const name = ev.target.getAttribute('title');

            const el = ev.detail.intersection && ev.detail.intersection.object.el;

            if (el && el === ev.target) {
                const label = document.createElement('span');
                const container = document.createElement('div');
                container.setAttribute('id', 'place-label');
                label.innerText = name;
                container.appendChild(label);
                document.body.appendChild(container);

                setTimeout(() => {
                    container.parentElement.removeChild(container);
                }, 1500);
            }
        };

        aLink.addEventListener('click', clickListener);

        scene.appendChild(aLink);
    });
}