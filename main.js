//var refUsuarios = fireBd.ref('usuarios');
var refConexion = fireBd.ref('conexiondemo');
//var refConexion = refUsuarios.child(sessionStorage.getItem('session')).child('conexiondemo');

function guardar() {
	if ($('#textNombre').val().length != 0 && $('#textDireccion').val().length != 0) {

		var ConexionKey = refConexion.push().key
		refConexion.child(ConexionKey).set({
			nombre: $('#textNombre').val(),
			descripcion: $('#textDescripcion').val(),
			telefono: $('#textTelefono').val(),
			direccion: $('#textDireccion').val()
		}, function (error) {
			if (error) {
				alert("error los datos no se pudieron guardar");
			} else {
				alert('Los datos se guardaron correctamente');
				cancelar();
			}
		});

	} else {
		alert('campos incompletos');
	}
}

function editar(element) {
	var id = $(element).data('id');
	var editId = refConexion.child(id);

	editId.on('value', function (snapshot) {

		$('#textNombre').val(snapshot.child('nombre').val());
		$('#textDescripcion').val(snapshot.child('descripcion').val());
		$('#textTelefono').val(snapshot.child('telefono').val());
		$('#textDireccion').val(snapshot.child('direccion').val());
	});

	$('#contAccion').html('<button onClick="cancelar()" type="button" class="btn btn-warning ">Cancelar</button><button data-id="' + id + '" onClick="actualizar(this)" type="button" class="btn btn-primary">Actualizar</button>');

}

function actualizar(element) {
	var idactualizar = $(element).data('id');
	refConexion.child(idactualizar).set({
		nombre: $('#textNombre').val(),
		descripcion: $('#textDescripcion').val(),
		telefono: $('#textTelefono').val(),
		direccion: $('#textDireccion').val()
	}, function (error) {
		if (error) {
			alert("error los datos no se pudieron actualizar");
		} else {
			alert('Los datos se actualizaron correctamente');
			cancelar();
		}
	});
}

function cancelar() {
	$('.borrar').val('');
	$('#contAccion').html('<button onClick="cancelar()" type="button" class="btn btn-warning ">Cancelar</button><button onClick="guardar()" type="button" class="btn btn-primary">Guardar</button>');
}

function eliminar(elemt) {
	var id = $(elemt).data('id');
	refConexion.child(id).remove();
	cancelar();
}

function crearHTML(data, key) {
	var html = '<td>' + data.nombre + '</td><td>' + data.descripcion + '</td><td>' + data.direccion + '</td><td>' + data.telefono + '</td><td class="td-actions"><button onClick="editar(this)" data-id="' + key + '" type="button" class="btn btn-primary btn-sm">Editar</button><button onClick="eliminar(this)" data-id="' + key + '" type="button" class="btn btn-danger btn-sm">Eliminar</button></td>';
	return html;
}

//DETECTA NUEVAS INSERCIONES
refConexion.on('child_added', function (snapshot) {
	var key = snapshot.key;
	var data = snapshot.val();
	var creadotr = document.createElement("tr");
	var idtr = snapshot.key;
	creadotr.setAttribute("id", key);
	var data = snapshot.val();
	creadotr.innerHTML = crearHTML(data, key);
	document.getElementById('datosEmpresa').appendChild(creadotr);
});
// DETECTA ACTUALIZACIONES
refConexion.on("child_changed", function (snapshot) {
	var key = snapshot.key
	var data = snapshot.val();
	$('#' + snapshot.key).html(crearHTML(data, key));
});
//DETECTA ELEMENTOS ELIMINADOS
refConexion.on("child_removed", function (snapshot) {
	$('#' + snapshot.key).remove();
});


/*
function crearSeccion(){
	 
	 auten.signInWithEmailAndPassword(data.correo, data.contra).then(function (result) {
            var user = result.user;

            var refUserRegistrado = refUsuarios.child(user.uid);
	 });
}


function iniciar(){
	  auten.signInWithEmailAndPassword(
		   $('#textcorreo').val(),
           $('#textcontra').val()
	  ).then(function (result) {
                var user = result.user;
              var refer = refUsuarios.child(user.uid);
		   refer.child('estado').set('activo');
		  sessionStorage.setItem('session', user.uid);
            var refConexion = refUsuarios.child(user.uid).child('conexiondemo');
                
                 alert('sesión iniciada');
            }).catch(function (error) {

                alert('No se pudo "iniciar sesión" ');

            });
}
*/