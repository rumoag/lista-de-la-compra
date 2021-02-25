
const url_api= "https://api.airtable.com/v0/appLQkpWuUrYmsvG7/Table%201?view=Grid%20view";

const url_api_create = "https://api.airtable.com/v0/appLQkpWuUrYmsvG7/Table%201";


const Authorization = "Bearer keypFgW9ql6PGevJQ";


new Vue({
    el: '#app',
    data: {
        articulos: [],

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
                .then((json) => this.articulos = json.records)

        },
    },
});