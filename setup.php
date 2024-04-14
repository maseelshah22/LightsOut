<?php
$size = 0;

if (isset($_GET['board_size'])) {
    $size = $_GET['board_size'];
}

$tiles = $size * $size;
$onLights = [];

$randLitCount = 0;

if ($tiles <= 10) {
    for ($row = 0; $row < $size; $row++) {
        for ($col = 0; $col < $size; $col++) {
            $onLights[] = ['row' => $row, 'col' => $col];
        }
    }
} else {
    while ($randLitCount < 10) {
        $loc = ['row' => rand(0, $size - 1), 'col' => rand(0, $size - 1)];
        if (!in_array($loc, $onLights)) {
            $onLights[] = $loc;
            $randLitCount++;
        }
    }
}

echo json_encode($onLights);
