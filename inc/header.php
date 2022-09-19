<?php
$page_name = basename($_SERVER['SCRIPT_NAME'], '.php');
if ($page_name == 'cv') $page_name = 'story';
?>

<!doctype html>
<html>

<head>
    <meta charset="utf-8">
    <title><?php echo ucfirst($page_name); ?></title>

    <link href="https://fonts.googleapis.com/css2?family=Mulish:wght@400;700&display=swap" rel="stylesheet">

    <link rel="stylesheet" href="css/normalize.css">
    <link rel="stylesheet" href="css/cv.css">

    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- Global site tag (gtag.js) - Google Analytics -->
    <!-- <script async src="https://www.googletagmanager.com/gtag/js?id=G-WQZ71XEKDC"></script> -->
    <!-- <script>
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());

                    gtag('config', 'G-WQZ71XEKDC');
                </script> -->
</head>

<body>
    <main>