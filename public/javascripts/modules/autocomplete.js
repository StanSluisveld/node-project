function autocomplete(input, latInput, lngInput){
    if (!input) return; // skip if there is no input
    const dropdown = new google.maps.places.Autocomplete(input);

    dropdown.addListener('place_changed', () => {
        const place = dropdown.getPlace();
        // get all available data
        //console.log(place)

        latInput.value = place.geometry.location.lat()
        lngInput.value = place.geometry.location.lng()
    });

    // catch click so doesnt send entire form

    input.on('keydown', (e) => {
        if(e.keyCode === 13) e.preventDefault();
    })
}

export default autocomplete;