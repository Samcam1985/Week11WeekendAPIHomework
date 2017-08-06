window.addEventListener('load', function() {
  var url = "http://hp-api.herokuapp.com/api/characters";
  var request = new XMLHttpRequest();
  request.open("GET", url);
  request.send();

  request.addEventListener('load', function() {
    loadHarryPotterCharacters(request.responseText);
  });

  var createImage = function(imageUrl){
    var image = document.createElement('img');
    image.style.width = '100px';
    image.style.height = '100px';
    image.src = imageUrl;
    return image;
  };

  var createList = function(name, house){
    var ul = document.createElement('ul');
    var li = document.createElement('li');
    var li1 = document.createElement('li');
    li.innerHTML = name;
    li1.innerHTML = house;
    ul.appendChild(li);
    ul.appendChild(li1);
    return ul;
  }

  var loadHarryPotterCharacters = function(responseText) {
    housePopulationData = [];
    var charactersArray = JSON.parse(responseText);


    
    console.log(characters);
    var characters = document.querySelector('#characters');

    var index = 1;

    charactersArray.forEach(function(character) {
      var check = housePopulationData.filter(function(house){
        return house.name === character.house
      });

      if (check.length == 0){
        housePopulationData.push({
          name: character.house,
          y: 1
        });
      }
      else{
       check[0].y = check[0].y + 1;
      }
     

      var container = document.createElement('div');
      var characterImageDiv = document.createElement('div');
      var characterDetailsDiv = document.createElement('div');
      container.className = 'container';
      characterImageDiv.className = 'characterImageDiv';
      characterDetailsDiv.className = 'characterDetailsDiv';
      characterImageDiv.appendChild(createImage(character.image));
      characterDetailsDiv.appendChild(createList(character.name, character.house));

      if(index % 2)
      {
        container.className = 'characterLeft';
      }
      else
      {
        container.className = 'characterRight';
      }

      container.appendChild(characterImageDiv);
      container.appendChild(characterDetailsDiv);
      characters.appendChild(container);

      index++;
    });

    new PieChart("House Population Percentages", housePopulationData);
  }


});



