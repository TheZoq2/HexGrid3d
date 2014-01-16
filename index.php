<?php
    require_once("map.php");

    //generateMap(50, 50);

    //Checking if the client has a player
    session_start();

    if(isset($_SESSION["Player"]) == false)
    {
        //Go to registration
        header('Location:player.php');
    }

    //unset($_SESSION["explored"]);

    $dataForm = "<form>";//A form for storing data that JS needs to get from PHP and can't be sent using ajax (for security, the values are taken out of the form by JS when the page is loaded)
    $dataForm .= "<input id='name' type='hidden' value='" . $_SESSION["Player"] . "'></input>";
    $dataForm .= "</form>";

    require_once("functions.php");
?>

<!DOCTYPE html>
<html>
    <head>
        <title></title>
        <meta charset="UTF-8">
        
        <link rel="stylesheet" href="css/html5reset-1.6.1.css"/>
        <link rel="stylesheet" href="css/style.css"/>
        <link rel="stylesheet" href="css/game.css"/>
        <script src="js/canvas/input.js"></script>
        <script src="js/3d.js"></script>
        <script src="js/setup.js"></script>
        <script src="js/game.js"></script>
        <script src="js/main.js"></script>
        <script src="js/requests.js"></script>
        <script src="js/dataReader.js"></script>
        <script src="js/UI.js"></script>
        <script src="js/resources.js"></script>
        <script src="js/pathfinder.js"></script>
        <script src="js/gridFunctions.js"></script>
        <script src="js/units.js"></script>

        <script src="js/3d/three.js"></script>
        <script src="js/3d/ObjLoader.js"></script>
        <script src="js/3d/ObjectLoaders.js"></script>
        <script src="js/3d/PLYloader.js"></script>
        <script src="js/3d/ColadaLoader.js"></script>
        <script src="js/3d/FPSCounter.js"></script>
    </head>
    <body>

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
            <p>Buildings</p>
            <div id="UI_buildingButtons"></div>
            <p>Units</p>
            <div id="UI_unitButtons"></div>
        </div>
        <div id="UI_controlBar">
            <a id="UI_b_endTurn" href="#">

            </a>
        </div>

        <div id="canvasContainer"></div>

        <?php
            echo($dataForm);
        ?>

        <script>
            setup();
        </script>
    </body>
</html>
