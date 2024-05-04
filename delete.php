<?php
include('connection.php');


$lat = $_POST['lat'];
$lng = $_POST['lng'];
$sql = "DELETE FROM poi WHERE latitude = :lat AND longitude = :lng";

$stmt = $db->prepare($sql);
$stmt->bindParam(':lat', $lat);
$stmt->bindParam(':lng', $lng);


if ($stmt->execute()) {
    $response = array('status' => 'success', 'message' => 'Data berhasil dihapus');
} else {
    $response = array('status' => 'error', 'message' => 'Gagal menghapus data');
}
echo json_encode($response);
