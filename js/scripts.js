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
        let pokeButton = document.createElement('button');
        pokeButton.innerText = pokemon.name;
        pokeButton.classList.add('button-class');


        listItem.appendChild(pokeButton);
        pokemonList.appendChild(listItem);
        
        pokeButton.addEventListener('click', function(event) {
            showDetails(pokemon);
        });
    }

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

let pokeModal = (function(pokemon) {
    function showModal() {
        let pokeDetailsModal = document.querySelector('#modal-container');
        pokeDetailsModal.innerHTML = '';

        let pokeName = document.createElement('h1');
        pokeName.innerText = pokemon.name;

        let pokeImage = document.createElement('img');
        
        let pokeDetails = document.createElement('p');
        pokeDetails.innerText = pokemon.height;

        let closeButton = document.createElement('button');
        closeButton.classList.add('modal-close');
        closeButton.innerText = 'Close';
        closeButton.addEventListener('click', hideModal);

        pokeDetailsModal.appendChild(pokeName);
        pokeDetailsModal.appendChild(pokeImage);
        pokeDetailsModal.appendChild(pokeDetails);
        pokeDetailsModal.appendChild(closeButton);
        modalContainer.appendChild(pokeDetailsModal);

        pokeDetailsModal.classList.add('.is-visible');
    }

    function hideModal() {
        let pokeDetailsModal = document.querySelector('#modal-container');
        modalContainer.classList.remove('.is-visible');
    }

    function showModal() {
        let pokeDetailsModal = document.querySelector('#modal-container');
        modalContainer.classList.add('.is-visible');
    }

})();

// Press ESC to close out modal
window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && document.querySelector('.is-visible')) 
    hideModal();
});

// Close the modal when user clicks outside of the modal
// modalContainer.addEventListener('click', (e) => {
//     let target = e.target;
//     if (target === modalContainer) {
//         hideModal();
//     }
// });


pokemonRepository.loadList().then(function() {
    // Now the data is loaded!
    pokemonRepository.getAll().forEach(function(pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});











// pokemonRepository.add({
//     name: "Wartortle",
//     type: "water",
//     height: 1
// });

// console.log(pokemonRepository.getAll());


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