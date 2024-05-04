<?php 
  include('connection.php');

  $sql = "SELECT * FROM poi";
  $query = $db->query($sql);
  $rows = $query->fetchAll(PDO::FETCH_OBJ);
  echo json_encode($rows);
