<?php
//cadena de coneccion ala base de datos (ip,user,passwrd,db)
//cabeceras
$connection = mysqli_connect('localhost', 'root', '', 'registro') or die("no se pudo ingresar a la base de datos");
//obtener valores del formulario
//$_POST es un array asociativo al cual accedes por el nombre de las etiquetas que se enviaron en el enlace 
$nombre=$_POST['name'];
$edad=$_POST['age'];
$direccion=$_POST['address'];
$correo=$_POST['mail'];
$ccorreo=$_POST['cmail'];
$telefono=$_POST['phone'];
$sexo=$_POST['sexo'];
//echo  $nombre.' '.$edad.' '.$direccion.' '.$correo.' '.$telefono;
//comprobar que los campos se completaron

$req=(strlen($nombre)*strlen($edad)*strlen($direccion)*strlen($correo)*strlen($telefono)) or die("no se llenaron todos los campos");
//realizar la consulta
try 
{
    if($correo==$ccorreo)
    mysqli_query($connection,"INSERT INTO user (nombre,edad,sexo,telefono,correo,direccion) VALUES('".$nombre."',".(int) $edad.",'".$sexo."',".(int) $telefono.",'".$correo."','".$direccion."')") or die("<h2>No se pudo realizar el registro</h2>");
    else
    echo 'no pude enviar ala bd';
} 
catch(Exception $e) 
{
    echo $e;
}
?>