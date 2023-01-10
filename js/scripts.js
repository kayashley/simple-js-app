//IIFE 

let pokemonRepository = (function () {
    let pokemonList = [];

    function add (pokemon) {
        pokemonList.push(pokemon);
    }

    function getAll() {
        return pokemonList;
    }
    return {
        getAll: getAll,
        add: add
    }
})();

pokemonRepository.add( {name: "Charmander", height: 6, type: ["fire"]} );
pokemonRepository.add( {name: "Pikachu", height: 5, type: ["electric"]});
pokemonRepository.add( {name: "Squirtle", height: 5, type: ["water"]} );

let pokemonList = pokemonRepository.getAll();

//forEach() loop
pokemonList.forEach(function(pokemon) {
        document.write(pokemon.name + ' is ' + pokemon.height + ' inches tall and is a ' + pokemon.type + ' type.')
  });






//OLD List of pokemon
//let pokemonList = [
//    {name: "Charmander", height: 6, type: ["fire"]},
//    {name: "Pikachu", height: 5, type: ["electric"]},
//    {name: "Squirtle", height: 5, type: ["water"]}
//  ];

//forEach() loop
//pokemonList.forEach(function(pokemon) {
//    console.log(pokemon.name + ' is ' + pokemon.height + ' inches tall and is a ' + pokemon.type + ' type.')
//  });

//OLD Loop of pokemon
//  for (let i=0; i < pokemonList.length; i++) {
//    //If the height is less than 7 and greater than 5 it is big
//    if (pokemonList[i].height <7 && pokemonList[i].height >5) {
//      document.write(pokemonList[i].name + " - height: " + pokemonList[i].height + " I'm a big one! ");
//   //If the pokemon is less than 5 then it is average
//    }else {
//      document.write(pokemonList[i].name + " - height: " + pokemonList[i].height + " I'm average. ");
//    }
//  }