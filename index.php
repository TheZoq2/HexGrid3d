<?php
    require_once("map.php");

    //generateMap(100, 100);

    //Checking if the client has a player
    session_start();

    //unset($_SESSION["explored"]);

    require_once("functions.php");

    if(isset($_SESSION["Player"]) == false)
    {
        //Go to registration
        header('Location:player.php');
    }
?>

<!DOCTYPE html>
<html>
    <head>
        <title></title>
        <meta charset="UTF-8">
        
        <link rel="stylesheet" href="css/html5reset-1.6.1.css"/>
        <link rel="stylesheet" href="css/style.css"/>
        <link rel="stylesheet" href="css/game.css"/>
        <!--<script src="js/canvas/canvas.js"></script>
        <script src="js/canvas/drawing.js"></script>
        <script src="js/canvas/particleEffect.js"></script>
        <script src="js/canvas/images.js"></script>-->
        <script src="js/canvas/input.js"></script>
        <script src="js/3d.js"></script>
        <script src="js/setup.js"></script>
        <script src="js/game.js"></script>
        <script src="js/main.js"></script>
        <script src="js/requests.js"></script>
        <script src="js/dataReader.js"></script>
        <script src="js/UI.js"></script>
        <script src="js/resources.js"></script>

        <script src="js/3d/three.js"></script>
        <script src="js/3d/ObjLoader.js"></script>
        <script src="js/3d/ObjectLoaders.js"></script>
        <script src="js/3d/PLYloader.js"></script>
        <script src="js/3d/ColadaLoader.js"></script>
        <script src="js/3d/FPSCounter.js"></script>
    </head>
    <body>
        <!--Including Three.js-->

        <div id="UI_resources">
            <div class="UI_resource"> 
                <img src="img/UI/Apple.png" class="UI_resourceImg"/> <p class="UI_resource_p" id="UI_food"> :0</p>
            </div>
            <div class="UI_resource">
                <img src="img/UI/Ingot.png" class="UI_resourceImg"/> <p class="UI_resource_p" id="UI_metal"> :0</p>
            </div>
            <div class="UI_resource">
                <img src="img/UI/Crystal.png" class="UI_resourceImg"/> <p class="UI_resource_p" id="UI_crystal"> :0</p>
            </div>
            <div class="UI_resource">
                <img src="img/UI/Oil.png" class="UI_resourceImg"/> <p class="UI_resource_p" id="UI_oil">:0</p>
            </div>
        </div>

        <div id="UI_rightBar">
        </div>
        <div id="UI_controlBar">
            <a id="UI_b_endTurn" href="#">

            </a>
        </div>

        <div id="canvasContainer"></div>

        <script>
            setup();
        </script>
    </body>
</html>
