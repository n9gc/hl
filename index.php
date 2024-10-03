<?php
    if ($_SERVER["QUERY_STRING"]) {
        switch ($_SERVER["QUERY_STRING"]) {
            case "js":
                header('Content-type: text/javascript');
                $myfile = fopen("js.js", "r") or die("console.error('ScpoHL Error - Cannot Connect The Server.')");
                die(fread($myfile, filesize("js.js")));
            case "css":
                header('Content-type: text/css');
                $myfile = fopen("css.css", "r") or die();
                die(fread($myfile, filesize("css.css")));
            case "test":
                $myfile = fopen("test.html", "r") or die("<h1>Connect Failed!</h1>");
                die(fread($myfile, filesize("test.html")));
        }
        die("Error - Unrecognized Parameter.");
    } else {
?><!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ScpoHL</title>
    <script>
        function cui() {
            m.style.borderColor = b.clientWidth < b.scrollWidth ? "#000" : "#fff" ;
        }
        window.onresize = cui;
        window.onload = function() {
            cui();
            document.body.removeChild(h);
        }
    </script>
    <style>
        @font-face {
            font-family: 'consolas';
            src: url('//sc.seventop.top/consolas.ttf') format('truetype');
        }
    </style>
</head>
<body style="padding: 0;margin: 0;font-size: 0.8cm;overflow: hidden;">
    <div style="width: 100%;height: 100%;background: #fff;z-index: 999;" id="h" >
        <h1 style="margin-left: 1cm;">Loading...</h1>
    </div>
    <script>
        h.style.height = window.innerHeight + 'px'
    </script>
    <div style="padding: 0.5cm;padding-bottom: 0;">
        <h1 style="font-size: 1.5em;display: inline;font-family: consolas;">ScpoHL</h1><br />
        <h2 style="font-size: 0.8em;display: inline;font-family: consolas;"> - Hight Lighter by CCPIRA</h2>
    </div><hr style="max-width: 24cm; width: 100%;position: absolute;left: 0;" /><br />
    <div id="b" style="font-size: 0.6em;overflow: auto;width: 100%;padding: 0;margin: 0;width: 100%;">
        <div id="m" style="padding: 1em;white-space: nowrap;display: inline-block;border-style: solid;margin: 1em;">
            <p>
                ScpoHL is a very High-Levelful code Hight-Lihter by Scpos.
            </p><p>
                You can use<br />
                <code style="overflow: auto;">
                    &lt;link href="//scpohl.seventop.top/?css" rel="stylesheet"><br />
                    &lt;script src="//js.seventop.top/?scpoUsefulFunc.js">&lt;/script><br />
                    &lt;script src="//scpohl.seventop.top/?js">&lt;/script>
                </code><br />
                to get the ScpoHL.
            </p><p>
                If you have any problems,<br />
                please email Scpos@163.com.<br />
            </p><p>
                Being able to support your project is our pleasure.
            </p>
        </div>
    </div>
</body>
</html>
<?php 
}
?>