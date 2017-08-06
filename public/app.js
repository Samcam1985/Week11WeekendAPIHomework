window.addEventListener('load', function() {
  var url = "http://hp-api.herokuapp.com/api/characters";
  var request = new XMLHttpRequest();
  request.open("GET", url);
  request.send();

  request.addEventListener('load', function() {
    loadHarryPotterCharacters(request.responseText);
  });


    var edinburgh = {lat: 55.9533, lng: -3.1883, name: "Edinburgh", description: "Edinburgh is the capital city of Scotland and one of its 32 council areas. It is located in Lothian on the Firth of Forth's southern shore."}
    var hogwarts_express = {lat: 51.5322, lng: -0.1240, name: "Hogwarts Express", description: " Jump on the Hogwarts Express at platform 9 3/4, to find the platform you need to go through a wall between platform 9 and 10."}
    var elephant_house = {lat: 55.9476, lng: -3.1917, name: "The Elephant House", description: " JK Rowling wrote the Potter books over coffee and cake in this relaxed writer/reader-friendly cafe."}

    var mapDiv = document.querySelector('#main-map');
    var mainMap = new MapWrapper(mapDiv, edinburgh, 10);
    mainMap.addMarker(edinburgh);
    mainMap.addMarker(hogwarts_express);
    mainMap.addMarker(elephant_house);
    mainMap.addClickEvent();

      var takeMeToHogwartsExpressButton = document.querySelector('#button-hogwartsExpress');
      takeMeToHogwartsExpressButton.addEventListener('click', mainMap.hogwartsExpressMarker.bind(mainMap));

      
      var takeMeToWhereJKRowlingWroteHarryPotter = document.querySelector('#button-theElephantHouse');
      takeMeToWhereJKRowlingWroteHarryPotter.addEventListener('click', mainMap.theElephantHouseMarker.bind(mainMap));
    

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



