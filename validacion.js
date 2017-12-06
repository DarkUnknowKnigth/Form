//split
//array asociativo las etiquetas son la posicion del array
//variables
var t_numero=false;
var contador=0;
var error=$("#error");
//verifica que un campo esta seleccionado
function ratiobtn_v()
{
    if($("#rhombre").prop("checked") || $("#rmujer").prop("checked"))
    {
        return true;
    }
    else
    {
        error.text("no selecciono un sexo");
        return false;
    }
}
//devuelve que input radio se selecció
function what_s_select()
{
    if(ratiobtn_v())
    {
        if($("#rhombre").prop("checked"))
        {
            return $("#rhombre").val();
        }
        else if($("#rmujer").prop("checked"))
        {
            return $("#rmujer").val();
        }
    }
    else
    {
        error.text("seleccione su sexo");
    }
}
//fucnione que valida todo el formulario
function valida_campos()
{
    var correo=$("#email").val();
    var ccorreo=$("#c_email").val();
    var nombre=$("#nombre").val();
    var direccion=$("#direccion").val();
    var edad=$("#edad").val();
    var telefono=$("#telefono").val();
    if(ratiobtn_v() && test_telefono(telefono) && test_nom(nombre) && test_correo(correo,ccorreo) && test_direccion(direccion) && test_edad(edad) && t_numero)
    { 
        contador++;
        var parametros =
        {
            "name" : nombre,
            "age" : edad,
            "address": direccion,
            "mail": correo,
            "cmail":ccorreo,
            "phone": telefono,
            "sexo": what_s_select()
        };
        var status = $.post("conexion.php",
        parametros).done(function( data )
        {
            $("#error").css("color","#009933");
            $("#error").html("Registro enviado correctamente");
        }).fail(function(data){
            $("#error").css("color","#ff0000");
            $("#error").html("No se pudo enviar el registro");

        });
        // $.post("conexion.php",parametros).done(function(data) 
        // {
        //   ("#error").html("Data Loaded: " + data );
        // });
        // $.ajax({
        //         type:  'post', //método de envio
        //         url:   'conexion.php',
        //         data:  parametros, //datos que se envian a traves de ajax
        //          //archivo que recibe la peticion
        //         beforeSend: function () {
        //                 $("#error").html("Procesando, espere por favor...");
        //         },
        //         success:  function (response) { //una vez que el archivo recibe el request lo procesa y lo devuelve
        //                 $("#error").html(response);
        //         }
        // });
        //$("#reg").submit();
        setvalues();
        //error.text("");
        return true;
    }   
    else
    {  
        $("#error").css("color","#ff0000");
        //$("#error").html("error en la vaidacion");
        return true; 
    }  
}
//setea los valores de los campos 
function setvalues()
{
    $("#rhombre").prop("checked",false);
    $("#rmujer").prop("checked",false);
    t_numero=false;
    $("#telefono").prop("min","0");
    $("#edad").prop("min","0");
    $("#nombre").val("");
    $("#telefono").val("");
    $("#email").val("");
    $("#c_email").val("");
    $("#edad").val("")
    $("#direccion").val("");
}
//verifica los numeros  
function test_numero(evento)
{  
    {
        //verificar campos no permitidos
        if(evento.keyCode==69 || evento.keyCode==101 || evento.keyCode==45 || evento.keyCode==43) 
        {
            evento.preventDefault();
            error.text("solo numeros");     
            t_numero=false;      
        }  
        else if($("#"+evento.target.id).val()>0)
        {
            t_numero=true;
        } 
        else if($("#"+evento.target.id).val()<0)
        {
           $("#"+evento.target.id).val("");
            error.text("no se permiten numeros negativos");
           t_numero=false;    
        }
        else
        {
            error.text("solo numeros");
        }
    }
}
//comprueba el nombres
function test_nom(nombre)
{
    if(/^[A-z\.\-\s]+$/.test(nombre))
    {
        return true;
    }
    else
    {
        error.text("nombre invalido");
        return false;
    }
}
//valida el correo y comprueba que sean iguales
function test_correo(correo,ccorreo)
{
    if(/^[\w]+@{1}[\w]+\.[a-z]{2,3}$/.test(correo) && /^[\w]+@{1}[\w]+\.[a-z]{2,3}$/.test(ccorreo))
    {     
        if(correo==ccorreo)
        {
            return true;
        }
        else
        {
            error.text("los correos no conciden");
            return false;
        }    
    }
    else
    {
        error.text("correo invalido");
        return false;
    }   
}
//comprueba las direcicones
function test_direccion(direccion)
{
    if(direccion.toString().length>0)
    {
        return true;
    }
    else
    {
        error.text("direccion invalida");
        return false;
    }
}
//comprueba el numero de telefono
function test_telefono(telefono)
{
    if(telefono>0 && telefono.length==10 )
    { 
        return true;
    }
    else
    {
        error.text("telefono invalido (10 digitos)");
        return false;
    }
}
//comprobar edad
function test_edad(edad)
{
    if(edad<120 && edad>0)
    { 
        return true;
    }
    else
    {
        error.text("edad incorrecta (1 a 100)");
        return false;
    }
}
//borra los campos del form
function clear_inputs()
{
    $("#rhombre").prop("checked",false);
    $("#rmujer").prop("checked",false);
    t_numero=false;
    $("#nombre").val("");
    $("#telefono").val("");
    $("#email").val("");
    $("#c_email").val("");
    $("#edad").val("")
    $("#direccion").val("");
}
//inicializa todas las funciones
function master()
{
    if(jQuery=="undefined")
    {
        //comprueba si jquery se cargo
        console.log("no se cargo jquery");
    }
    else
    {
        //console.log("se cargo jquery");
        //inicializa todas las variabels y pone valores en los campos
        setvalues();
        //listeners a los botones 
        $("#edad").click(function(event){
            test_numero(event);
        });
        $("#edad").keypress(function(event){
            test_numero(event); 
        });
        $("#telefono").click(function(event){
            test_numero(event);
        });
        $("#telefono").keypress(function(event){
            test_numero(event); 
        });
        $("#reset").click(clear_inputs);
        $("#envio").click(valida_campos);
    }
}
$(document).ready(master);
//window.onload=master;
