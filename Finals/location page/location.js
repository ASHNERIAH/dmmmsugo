        // declare map
        function initMap() {
            // gawa map object
    const map = new google.maps.Map(document.getElementById('map'), {
                // location lagay 
        center: { lat: 16.725, lng: 120.4000000 }, 
        zoom: 15.7
    });

            // mapmap search
            const input = document.getElementById('mapmap');

            // suggestion para sa mapmap
            const autocomplete = new google.maps.places.Autocomplete(input);

            // yung nasa map lang ang isusuggest
            autocomplete.bindTo('bounds', map);

            // no nag choice sa suggestion sa mapmap search
            autocomplete.addListener('place_changed', () => {
                // agited info about sa suggestion sa mapmap
                const place = autocomplete.getPlace();

                // pang check if meron
                if (!place.geometry) {
                    window.alert("No geometry details available for this place.");
                    return;
                }

                // defines the area para i show sa map.
                const bounds = new google.maps.LatLngBounds();

                // pang check if nakikita sa map
                bounds.extend(place.geometry.location);

                // mangfit 
                map.fitBounds(bounds);

                // marker pang pin sa map
                const marker = new google.maps.Marker({
                    // Set the marker's position to the place's location.
                    position: place.geometry.location,
                    // This tells the marker which map to appear on.
                    map: map,
                    // This is the text that appears when you hover over the marker.
                    title: place.name
                });
            });
        }
