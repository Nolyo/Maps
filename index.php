<?php
$monuments = array(
    'accounting',
    'airport',
    'amusement_park',
    'aquarium',
    'art_gallery',
    'atm',
    'bakery',
    'bank',
    'bar',
    'beauty_salon',
    'bicycle_store',
    'book_store',
    'bowling_alley',
    'bus_station',
    'cafe',
    'campground',
    'car_dealer',
    'car_rental',
    'car_repair',
    'car_wash',
    'casino',
    'cemetery',
    'church',
    'city_hall',
    'clothing_store',
    'convenience_store',
    'courthouse',
    'dentist',
    'department_store',
    'doctor',
    'electrician',
    'electronics_store',
    'embassy',
    'establishment',
    'finance',
    'fire_station',
    'florist',
    'food',
    'funeral_home',
    'furniture_store',
    'gas_station',
    'general_contractor',
    'grocery_or_supermarket',
    'gym',
    'hair_care',
    'hardware_store',
    'health',
    'hindu_temple',
    'home_goods_store',
    'hospital',
    'insurance_agency',
    'jewelry_store',
    'laundry',
    'lawyer',
    'library',
    'liquor_store',
    'local_government_office',
    'locksmith',
    'lodging',
    'meal_delivery',
    'meal_takeaway',
    'mosque',
    'movie_rental',
    'movie_theater',
    'moving_company',
    'museum',
    'night_club',
    'painter',
    'park',
    'parking',
    'pet_store',
    'pharmacy',
    'physiotherapist',
    'place_of_worship',
    'plumber',
    'police',
    'post_office',
    'real_estate_agency',
    'restaurant',
    'roofing_contractor',
    'rv_park',
    'school',
    'shoe_store',
    'shopping_mall',
    'spa',
    'stadium',
    'storage',
    'store',
    'subway_station',
    'synagogue',
    'taxi_stand',
    'train_station',
    'travel_agency',
    'university',
    'veterinary_care',
    'zoo'
)
?>
<!doctype html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>My Maps</title>
    <link rel="stylesheet" href="css/chosen.min.css"/>
    <link rel="stylesheet" href="css/main.css"/>
</head>
<body>
    <section class="big">
        <div class="form">
            <form action="#" id="formMap">
                <input class="form-control" type="text" placeholder="Départ" id="start" autocomplete="off"><button type="button" class="geoloc" id="geoStart" title="Me Géolocalisé"></button>
                <input class="form-control" type="text" placeholder="Arrivé" id="finish" autocomplete="off"><button type="button" class="geoloc" id="geoFinish" title="Me Géolocalisé"></button>
                <input class="btn btn-success" type="submit" value="Chercher itinéraire">
            </form>
            <div id="choice_mode">
                <div id="car" class="bt"></div>
                <div id="walking"></div>
                <div id="bycycle"></div>
                <div id="transit"></div>
            </div>
            <div class="clr"></div>
            <div class="panel_info">
                <label class="info">Distance :</label>
                <span class="dist"></span>
                <label class="info">Durée du voyage :</label>
                <span class="duration"></span>
            </div>
        </div>
    </section>

    <section class="print_map">
        <div class="bloc_maps">
            <div id="canvasMap"></div>
            <div id="panel"></div>
            <div class="moreOption">
                <span class="title">Inclure des visites à mon parcour :</span>
                <select name="searchType" id="searchType" class="chosen" data-placeholder="Sélectionnez vos choix" multiple>
                    <?php foreach ($monuments as $monument):?>
                        <option value="<?= $monument ?>"><?= $monument ?></option>
                    <?php endforeach?>

                </select>
            </div>

        </div>
        <img class="fullscreen" src="img/fullscreen.png" alt="Mettre en plein ecran"/>
    </section>
    <!--    <a class="btn btn-success" id="showChat">Chattez !</a>-->
    <script src="js/jquery.min.js"></script>
    <script src="http://maps.google.com/maps/api/js?sensor=false&amp;libraries=places&amp;language=fr&amp;signed_in=true"></script>
    <script src="js/jquery.geocomplete.min.js"></script>
    <script src="js/chosen/chosen.jquery.min.js"></script>
    <script src="js/main.js"></script>
</body>
</html>