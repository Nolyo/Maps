$(document).ready(function () {

    /* API google*/
    var map;
    var pos;
    var panel;
    var calculate;
    var direction;
    var fullscreen;
    var divPanel;
    var travelModePerso = google.maps.DirectionsTravelMode.DRIVING // Type de transport
    var geocoder = new google.maps.Geocoder();
    var typeMonument;

    /*
     *LES FONCTIONS
     */

    function initialize() {
        var mapOptions = {
            zoom: 7
        };
        map = new google.maps.Map(document.getElementById('canvasMap'),
            mapOptions);

        // Auto completion des ville by plugin geocomplete
        $("#start, #finish").geocomplete();

        // Geolocalisation par HTML 5
        GeoLoc();

        panel = document.getElementById('panel');
        direction = new google.maps.DirectionsRenderer({
            map   : map,
            panel : panel,
            draggable: true
        });
    }

    function handleNoGeolocation(errorFlag) {
        if (errorFlag) {
            var content = 'Erreur: Le service de Géolocalisation à échoué.';
        } else {
            var content = 'Erreur: Votre navigateur ne peut atteindre la Géolocalisation';
        }

        var options = {
            map: map,
            position: new google.maps.LatLng(70, 105),
            content: content
        };

        var infowindow = new google.maps.InfoWindow(options);
        map.setCenter(options.position);
    }


    function GeoLoc(){
        if(navigator.geolocation) {

            navigator.geolocation.getCurrentPosition(function(position) {
                pos = new google.maps.LatLng(position.coords.latitude,
                    position.coords.longitude);

                var infowindow = new google.maps.InfoWindow({
                    map: map,
                    position: pos,
                    content: 'Localisé ici'
                });

                map.setCenter(pos);
            }, function() {
                handleNoGeolocation(true);
            });
        }
        else {
            // Browser doesn't support Geolocation
            handleNoGeolocation(false);
        }
    }

    function resize(){
        $('.print_map').css('width','100%');
        $('#canvasMap').css({
            'height': $(window).height(),
            'width' : $(window).width()
        })
        google.maps.event.trigger(map,'resize');
    }

    function renderRoad(travelModePerso){
        var request = {
            origin      : start,
            destination : finish,
            travelMode  : travelModePerso
        }

        var directionsService = new google.maps.DirectionsService(); // Service de calcul d'itinéraire
        directionsService.route(request, function(response, status){ // Envoie de la requête pour calculer le parcours
            console.log('statut: '+status)

            if(status == google.maps.DirectionsStatus.OK){
                $('.moreOption').css('display','block')
                route = response.routes[0]

                distance = route.legs[0].distance.text;
                duration = route.legs[0].duration.text;

                $('.panel_info').fadeIn();
                $('.dist').html(distance);
                $('.duration').html(duration);

                // Trace l'itinéraire sur la carte et les différentes étapes du parcours
                direction.setDirections(response);

                // Parcour des différente trajectoires
                path = route.overview_path;
                marker = []
                for (i=0; i<path.length ;i++){
                    console.log(path.length)
                    markerLat = path[i].lat()
                    markerLng = path[i].lng()
                    newMarker  = new google.maps.LatLng(markerLat, markerLng);

                    typeMonument = $('#searchType').val();
                    if ( typeMonument != null){
                        var request = {
                            location: newMarker,
                            radius: 100,
                            types: typeMonument
                        };
                        eventTourist(request)
                        sleep(100)
                    }// fin di if
                } //Fin du for
            }

        });
    }

    function sleep(milliSeconds){
        var startTime = new Date().getTime();
        while (new Date().getTime() < startTime + milliSeconds);
    }

    function eventTourist(request){

        var service = new google.maps.places.PlacesService(map);
        service.nearbySearch(request, callback);

    }

    function callback(results, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length; i++) {
                createMarker(results[i]);
            }
        }
    }

    function createMarker(place) {
        var placeLoc = place.geometry.location;
        marker = new google.maps.Marker({
            map: map,
            draggable:true,
            animation: google.maps.Animation.DROP,
            position: place.geometry.location
        });
    }

    var trafficLayer = new google.maps.TrafficLayer();
    trafficLayer.setMap(map);

    // LAncement de l'evenement
    google.maps.event.addDomListener(window, 'load', initialize);


    /*
     * Evenements
     * */

    $('.chosen').chosen(
        {
            no_results_text: "Oops, Aucun résultats trouvé!"
        }
    )

    // Clique sur geoloc sur form
    $('#formMap').on('click','button', function (e) {
        e.preventDefault();
        t = $(this);
        var request = {location: pos};
        if(t.attr('id') == 'geoStart'){
            geocoder.geocode(request, function (results, status) {
                $('#start').val(results[0].formatted_address)
            })
        }else{
            geocoder.geocode(request, function (results, status) {
                $('#finish').val(results[0].formatted_address)
            })
        }
    })


    // Selection du mode transport
    $('#choice_mode').on('click','div',function(e){
        t = $(this);
        $('#panel').css('display','inline-block');
        divPanel= true;
        if(t.attr('id') == 'walking'){
            travelModePerso = google.maps.DirectionsTravelMode.WALKING
            $('#car').removeClass('bt')
            $('#bycycle').removeClass('bt')
            $('#transit').removeClass('bt')
            $('#walking').addClass('bt')
            if($('#start').val().length >0 && $('#finish').val().length >0){
                renderRoad(travelModePerso);
            }
        }
        else if(t.attr('id') == 'car'){
            travelModePerso = google.maps.DirectionsTravelMode.DRIVING
            $('#walking').removeClass('bt')
            $('#bycycle').removeClass('bt')
            $('#transit').removeClass('bt')
            $('#car').addClass('bt')
            if($('#start').val().length >0 && $('#finish').val().length >0){
                renderRoad(travelModePerso);
            }
        }
        else if(t.attr('id') == 'bycycle'){
            travelModePerso = google.maps.DirectionsTravelMode.BICYCLING
            $('#walking').removeClass('bt')
            $('#car').removeClass('bt')
            $('#transit').removeClass('bt')
            $('#bycycle').addClass('bt')
            if($('#start').val().length >0 && $('#finish').val().length >0){
                renderRoad(travelModePerso);
            }
        }
        else if(t.attr('id') == 'transit'){
            travelModePerso = google.maps.DirectionsTravelMode.TRANSIT
            $('#walking').removeClass('bt')
            $('#car').removeClass('bt')
            $('#bycycle').removeClass('bt')
            $('#transit').addClass('bt')
            if($('#start').val().length >0 && $('#finish').val().length >0){
                renderRoad(travelModePerso);
            }
        }
    })



    //Selection des Point de depart et arrivé
    $('#formMap').submit(function (e) {
        e.preventDefault();
        $('#panel').css('display','inline-block');
        divPanel= true;
        start = $('#start').val();
        finish = $('#finish').val();
        if(start && finish){
            renderRoad(travelModePerso);
        }
    })


    $('#showChat').on('click', function (e) {
        e.preventDefault();
        $(this).fadeOut();
    })

    //    Clic sur plein ecran
    $('.fullscreen').click(function (e) {
        if (fullscreen == true){
            resize();
            $('.print_map').css('width','1345px');
            $('#canvasMap').css({
                'height': '600px',
                'width' : '800px',
                'position': 'relative'
            })
            fullscreen = false;
        }else{
            fullscreen = true;
            resize();
        }
    })


    //    Enlever plein ecran
    $('body').keydown(function (e) {
        if(e.keyCode == 27){
            fullscreen = false;
            resize();
            $('.print_map').css('width','1345px');
            $('#canvasMap').css({
                'height': '600px',
                'width' : '800px',
                'position': 'relative'
            })
        }


    })
})


