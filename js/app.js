// App.js
import Categories from './modules/player-categories';

var catRequest = Categories.getInstance();

catRequest.getAll()
    .done((response) => console.log(response))
    .fail((xhr) => {throw new Error('API responded with status text: ' + xhr.statusText)});
