// IIFE 

let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    function add(pokemon) {
        if (
            typeof pokemon === 'object' &&
            'name' in pokemon
            // 'height' in pokemon &&
            // 'type' in pokemon
        ) {
            pokemonList.push(pokemon);
        } else {
            document.write('Not a pokemon.')
        }
    }
  
    function getAll() {
        return pokemonList;
    }

    function addListItem(pokemon) {
        let pokemonList = document.querySelector('.pokemon-list');
        let listItem = document.createElement('li');
        let button = document.createElement('button');
        button.innerText = pokemon.name;
        button.classList.add('button-class');
        listItem.appendChild(button);
        pokemonList.appendChild(listItem);
        button.addEventListener('click', function(event) {
            showDetails(pokemon);
        });s
    }

    // function showDetails(pokemon) {
    //     console.log(pokemon);
    // }

    // Promise & fetch function
    function loadList() {
        return fetch(apiUrl).then(function (response) {
            return response.json();
        }).then(function (json) {
            json.results.forEach(function (item) {
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                };
                add(pokemon);
                // console.log(pokemon);
            });
        }).catch(function (e) {
            console.log(e);
        })
    }

    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) {
            // Now we add the details to the item
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.types = details.types;
        }).catch(function (e) {
            console.error(e);
        });
    }
  
    function showDetails(item) {
        pokemonRepository.loadDetails(item).then(function () {
            console.log(item);
        });
    }

    return {
        getAll: getAll,
        add: add,
        addListItem : addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails
    };
})();

pokemonRepository.loadList().then(function() {
    // Now the data is loaded!
    pokemonRepository.getAll().forEach(function(pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});

pokemonRepository.add({
    name: "Wartortle",
    type: "water",
    height: 1
});

console.log(pokemonRepository.getAll());


// pokemonRepository.getAll().foreach(function (pokemon) {
//     pokemonRepository.addListItem(pokemon);
// });




// OLD List of pokemon
//let pokemonList = [
//    {name: "Charmander", height: 6, type: ["fire"]},
//    {name: "Pikachu", height: 5, type: ["electric"]},
//    {name: "Squirtle", height: 5, type: ["water"]}
//  ];

// forEach() loop
// pokemonList.forEach(function(pokemon) {
//     if (pokemon.height > 5) {
//         document.write(pokemon.name + ' is a big pokemon!');
//     } else if (pokemon.height === 5) {
//         document.write(pokemon.name + ' is an average pokemon!');
//     } else {
//         document.write(pokemon.name + 'is a small pokemon!')
//     }
// });

//forEach() loop
//pokemonList.forEach(function(pokemon) {
//    console.log(pokemon.name + ' is ' + pokemon.height + ' inches tall and is a ' + pokemon.type + ' type.')
//  });

// OLD Loop of pokemon
//  for (let i=0; i < pokemonList.length; i++) {
//    //If the height is less than 7 and greater than 5 it is big
//    if (pokemonList[i].height <7 && pokemonList[i].height >5) {
//      document.write(pokemonList[i].name + " - height: " + pokemonList[i].height + " I'm a big one! ");
//   //If the pokemon is less than 5 then it is average
//    }else {
//      document.write(pokemonList[i].name + " - height: " + pokemonList[i].height + " I'm average. ");
//    }
//  }