let pokemonRepository = (function () {
    let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";
    let pokemonList = [];
    let modalContainer = document.querySelector(".pokemon-modal");
  
    function add(pokemon) {
      if (typeof pokemon === "object" && "name" in pokemon) {
        pokemonList.push(pokemon);
      } else {
        console.log("pokemon is not correct");
      }
    }
  
    function getAll() {
      return pokemonList;
    }
  
    function addListItem(pokemon) {
      let pokemonItem = document.querySelector(".pokemon-list");
      let itemPokemon = document.createElement("li");
      pokemonItem.classList.add("list-group-item");
      pokemonItem.classList.add("col-sm-4", "col-md-6", "col-lg-12")
      let button = document.createElement("button");
      button.classList.add("pokemonButton", "btn");
      button.innerText = pokemon.name;
    $(button).addClass('button-class btn-block btn m1');
      button.setAttribute("data-toggle", "modal");
     button.setAttribute("data-target", ".pokemon-modal");
      itemPokemon.appendChild(button);
      pokemonItem.appendChild(itemPokemon);
      button.addEventListener("click", function () {
        showDetails(pokemon);
      });
    }
  
    function loadList() {
      return fetch(apiUrl)
        .then(function (response) {
          return response.json();
        })
        .then(function (json) {
          json.results.forEach(function (item) {
            let pokemon = {
              name: item.name,
              detailsUrl: item.url
            };
  
            add(pokemon);
          });
        })
        .catch(function (e) {
          console.error(e);
        });
    }
  
    function loadDetails(pokemon) {
      let url = pokemon.detailsUrl;
      return fetch(url)
        .then(function (response) {
          return response.json();
        })
        .then(function (details) {
          pokemon.imageUrl = details.sprites.front_default;
          pokemon.height = details.height;
          pokemon.types = details.types.map((type) => type.type.name).join(',');
          pokemon.name = details.name;
          pokemon.weight = details.weight;
          pokemon.abilities = details.abilities.map((ability) => ability.ability.name).join(',');
        })
        .catch(function (e) {
          console.error(e);
        });
    }

    
  
    function showDetails(pokemon) {
      loadDetails(pokemon).then(function () {
        showModal(pokemon);
        console.log(pokemon);
      });
    }

    /*
    return {
        add: function (pokemon) {
          pokemonList.push(pokemon);
        },
        getAll: function () {
          return pokemonList;
        },
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails
      };
      */


  function showModal(pokemon) {
    let modalContainer = document.querySelector(".pokemon-modal")
    let modalBody = $(".modal-body");
    let modalTitle = $(".modal-title");
    modalTitle.empty();
    modalBody.empty();
    // Name
    let nameElement = $('<h1>' + pokemon.name + '</h1>');
    // Pokemon image
    let imageElement = $('<img class="pokemon-img">')
    imageElement.attr("src", pokemon.imageUrl);
    // Height
    let heightElement = $('<p>' + 'Height : ' + pokemon.height + '</p>');
    // Weight
    let weightElement = $('<p>' + 'Weight : ' + pokemon.weight + '</p>');
    // Type
    let typeElement = $('<p>' + 'Types : ' + pokemon.types + '</p>');
    // Abilities
    let abilitiesElement = $('<p>' + 'Abilities : ' + pokemon.abilities + '</p>');
    modalTitle.append(nameElement);
    modalBody.append(imageElement);
    modalBody.append(heightElement);
    modalBody.append(weightElement);
    modalBody.append(typeElement);
    modalBody.append(abilitiesElement);
  }
  /*
  return {
    add: add,         //Calling add function
    getAll: getAll,    //Calling getAll function
    addListItem: addListItem,  //Calling addListItem function
    loadList: loadList,
    showDetails: showDetails,
    loadDetails: loadDetails
  };
*/

  return {
    add: function (pokemon) {
      pokemonList.push(pokemon);
    },
    getAll: function () {
      return pokemonList;
    },
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
    showModal: showModal
    
  };
})();

  /*    

    function showModal(item) {
      let modalContainer = document.querySelector("#pokemon-Modal");
      modalContainer.innerHTML = "";
      let modal = document.createElement("div");
      modal.classList.add("modal");
      let closeButtonElement = document.createElement("button");
      closeButtonElement.classList.add("modal-close");
      closeButtonElement.innerText = "Close";
      closeButtonElement.addEventListener("click", hideModal);
  
      let titleElement = document.createElement("h1");
      titleElement.innerText = item.name;
  
      let contentElement = document.createElement("p");
      contentElement.innerText = item.height;
  
      let imgElement = document.createElement("img");
      imgElement.classList.add("img-element");
      imgElement.src = item.imageUrl;
  
      modal.appendChild(closeButtonElement);
      modal.appendChild(titleElement);
      modal.appendChild(contentElement);
      modalContainer.appendChild(modal);
      modal.appendChild(imgElement);
  
      modalContainer.classList.add("is-visible");
      modalContainer.addEventListener("click", (e) => {
        // Since this is also triggered when clicking INSIDE the modal
        // We only want to close if the user clicks directly on the overlay
        let target = e.target;
        if (target === modalContainer) {
          hideModal();
        }
      });
    }
  
    function hideModal() {
      let modalContainer = document.querySelector("#modal-container");
      modalContainer.classList.remove("is-visible");
    }
  
    window.addEventListener("keydown", (e) => {
      let modalContainer = document.querySelector("#modal-container");
      if (e.key === "Escape" && modalContainer.classList.contains("is-visible")) {
        hideModal();
      }
    });
  
    document.querySelector("#show-modal").addEventListener("click", () => {
      showModal("Modal title", "This is the modal content!");
  });
 
    return {
      add: function (pokemon) {
        pokemonList.push(pokemon);
      },
      getAll: function () {
        return pokemonList;
      },
      addListItem: addListItem,
      loadList: loadList,
      loadDetails: loadDetails
    };
  })();




  //console.log(pokemonRepository.getAll());
  //pokemonRepository.add({ name: "Pikachu", height: "1.4", types: "Mouse" });
  //console.log(pokemonRepository.getAll());

  */
  pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function (pokemon) {
      pokemonRepository.addListItem(pokemon);
      pokemonRepository.showModal(pokemon)
    });
  });
