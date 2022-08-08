// IFI para que su contenido sea exclusivo de este archivo
(function(){
    let DB;
    
    const formulario = document.querySelector('#formulario');

    document.addEventListener('DOMContentLoaded', () => {
        conectarDB();
        formulario.addEventListener('submit', validarCliente);
    });



    function validarCliente (e) {
        e.preventDefault();
        // Seleccion de inputs
        const nombre = document.querySelector('#nombre').value;
        const email = document.querySelector('#email').value;
        const telefono = document.querySelector('#telefono').value;
        const empresa = document.querySelector('#empresa').value;

        if(nombre === '' || email === '' || telefono === '' ||empresa === ''){
            imprimirAlerta('Todos los campos son obligatorios','error');
            return;
        }

        // Crear un objeto con la informacion
        // Objeto literal - al repetirce el nombre de llave y valor solo se usa uno
        const cliente = {
            nombre,
            email,
            telefono,
            empresa,
        }

        cliente.id = Date.now();

        crearNuevoCliente(cliente);

    }

    function crearNuevoCliente(cliente){

        const transaction = DB.transaction(['crm'],'readwrite');
        const objectStore = transaction.objectStore('crm');

        objectStore.add(cliente);

        transaction.onerror = () => {
            imprimirAlerta('Hubo un error', 'error');
        }
        transaction.oncomplete = () => {
            imprimirAlerta('El cliente se agrego correctamente');
            
            setTimeout(() => {
                // Cambio de ventana
                window.location.href = 'index.html';
            }, 2000);
        }
    }
    
})();

