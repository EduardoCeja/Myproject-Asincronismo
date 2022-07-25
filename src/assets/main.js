const API ="https://youtube-v31.p.rapidapi.com/search?channelId=UC9k0tTsh_qStx0HPuPftSsg&part=snippet%2Cid&order=date&maxResults=9"

const content = null || document.getElementById('content');

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'b339ca0f84mshb30fc4d580dbe07p181093jsn06e7ffc15086',
		'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
	}
};

//Lógica de async: ir por los datos, luego esperar por ellos y finalmente retornarlos hacia el usuario

//siempre await antes de function
async function fetchData(urlApi) { 
    //hacemos uso del fetch() y solo por esta vez le pasamos la opciones 
    const response = await fetch(urlApi, options); 
    //estructura de los datos transformandolos en json
    const data = await response.json(); 
    //retorna la información de la API que estamos solicitando
    return data; 
    }


(async () => {
    try{
        //Dentro de try se creara una constante llamada videos, que esto sera igual a await y posteriormente utilizaremos la funcion fetchData(API)
        const videos = await fetchData(API);
        //Ahora se tendra que crear un templeate, este templeate va ser un HTML que vamos a adapatar para que itere por cada uno de los elementos que esta en la respuesta, estos elementos seran presentados dentro del HTML, en el archivo que se esta utilizando en el apartado llaamado <!-- content --> 
        
        //Se creara un templeate, se creara una variable let llamada view, para poder hacer funciones de Javascript par la iteracion de los elementos 
 
        let  view = `
        ${videos.items.map(video =>`
        <div class="group relative">
            <div
                class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
                <img src="${video.snippet.thumbnails.high.url}" alt="${video.snippet.description}" class="w-full">
            </div>
            <div class="mt-4 flex justify-between">
                <h3 class="text-sm text-gray-700">
                <span aria-hidden="true" class="absolute inset-0"></span>
                ${video.snippet.title}
                </h3>
            </div>
         </div>
        `).slice(0,4).join('')}
        `;

        //innerHTML es igual a la vista que se ha creado e itera con el metodo map y devuelve un nuevo arreglo con los elementos que queremos obtener como el título, la descripción, la imagen miniatura de la API
        content.innerHTML = view;

    } catch {
        ////en caso que de que haya un error el catch lo captura e imprime qué tipo de error devolvió
        console.log(error)
    }
})();