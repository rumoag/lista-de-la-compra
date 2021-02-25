const url_api= "https://api.airtable.com/v0/appU4eSR0p97dLVbc/Productos?maxRecords=3&view=Grid%20view";
const url_api_borrar= "https://api.airtable.com/v0/appU4eSR0p97dLVbc/Productos?records[]="
const Authorization = "Bearer keypFgW9ql6PGevJQ";
const url_api_update = "https://api.airtable.com/v0/appU4eSR0p97dLVbc/Productos ";
const url_api_create = "https://api.airtable.com/v0/appU4eSR0p97dLVbc/Productos";

new Vue({
    el: '#app',
    data: {
        productos: [],
        textoActualizar: '',
        nuevoProducto: '',
        productoEditar: false
    },
    mounted: function (){
        this.obtenerDatos();
    },
    methods: {
        obtenerDatos : function () {
            fetch(url_api, {
                headers: {
                    'Authorization' : Authorization,
                },
            })
                .then((response) => response.json())
                .then((json) => this.productos = json.records)

        },
        borrarProducto: function (id){
            fetch(url_api_borrar.concat(id), {
                headers: {
                    'Authorization' : Authorization,
                },
                method: 'DELETE'
            });
            this.productos = this.productos.filter(producto =>{
                return producto.id !== id
            })
        },
        actualizarProductoEnApi: function (id,nuevoTexto){
            this.productoEditar =false
            fetch(url_api_update, {
                headers: {
                    'Authorization': Authorization,
                    'Content-type': 'application/json'
                },
                //pacth un solo producto a la vez
                method: 'PATCH',
                body: JSON.stringify({
                    "records": [
                        {
                            "id": id,
                            "fields": {
                                "Nombre": nuevoTexto,
                            }
                        },
                    ]
                })
            })
                .then((json) => this.obtenerDatos())

        },
        actualizarAdqueridoEnApi: function (id,checked){
            fetch(url_api_update, {
                headers: {
                    'Authorization': Authorization,
                    'Content-type': 'application/json'
                },
                //pacth un solo producto a la vez
                method: 'PATCH',
                body: JSON.stringify({
                    "records": [
                        {
                            "id": id,
                            "fields": {
                                "Adquerido": checked,
                            }
                        },
                    ]
                })
            })
            this.productos = this.productos.map((producto) => {
                if (producto.id === id) {
                    let miProducto = producto;
                    miProducto.fields.Adquerido = checked;
                    return miProducto;
                } else {
                    return producto
                }
            })


        },
        anyadirProductoApi: function (nuevoTexto){
            fetch(url_api_create, {
                headers: {
                    'Authorization': Authorization,
                    'Content-type': 'application/json'
                },
                //pacth un solo producto a la vez
                method: 'POST',
                body: JSON.stringify({
                    "records": [
                        {
                            "fields": {
                                "Nombre": nuevoTexto,
                                "Adquerido": false,

                            }
                        },
                    ]
                })
            })
                .then((json) => this.nuevoProducto = '')
                .then((json) => this.obtenerDatos())

        },
        abrirEditar: function (id,nombre){
            this.productoEditar = id;
            this.textoActualizar = nombre
        }
    },
});