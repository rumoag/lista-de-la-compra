const url_api= "https://api.airtable.com/v0/appU4eSR0p97dLVbc/Productos?maxRecords=3&view=Grid%20view";
const url_api_borrar= "https://api.airtable.com/v0/appU4eSR0p97dLVbc/Productos?records[]="
const Authorization = "Bearer keypFgW9ql6PGevJQ";

new Vue({
    el: '#app',
    data: {
        productos: [],
        textoActualizar: '',
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
            
        }
    },
});