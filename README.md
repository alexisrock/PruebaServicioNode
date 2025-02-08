<h1 align="center"> ApiPrueba</h1>

<h2 align="left"> Descripcion</h2>
<p>
Esta api rest fue  realizada como  prueba tecnica.
</p>
<h2 align="left"> Arquitectura</h2>
<p>
Esta api fue creada con una arquitectura limpia, la capa de infraestructura esta creada de tal forma que no tenga ninguna dependencia con el orm.
</p>
<h2 align="left"> Tecnologias utilizadas</h2>
<p>
    <li>Express</li>
    <li>Nodejs</li>
    <li>Typescript</li>
    <li>typeorm</li>
</p>

<h2 align="left"> Prerequisitos</h2>
<p>
     
<ul> 
        <li> se debe tener instalado sql server o tener acceso auna instancia sql server</li> 
        <li> crear la base de datos BuildingDB </li> 
        <li> crear el usuario de base de datos  UsrDeveloper con la misma contraseña  </li> 
        <li> ubicar la carpeta  ScriptSql </li> 
        <li> abrir el archivo InitialQuery.sql que esta en la carpeta anteriormente mencionada </li> 
        <li> ejecutar el script </li> 


</ul>
</p>


<h2 align="left"> Instalacion</h2>
<p>
     
<ul> 
        <li> se debe primero tener instalado el sdk de net 6 </li> 
        <li> ubicar la carpeta Api y dentro de esa carpeta ejecutar el comadno "dotnet restore"  </li> 
        <li> luego  ejecutar el comadno "dotnet build --no-restore"  </li> 
        <li> luego  ejecutar el comadno "dotnet public -o rutaarchivos"  </li> 
</ul>
</p>

<h2 align="left"> Version del aplicativo</h2>
<p> V.0.0.1</p>