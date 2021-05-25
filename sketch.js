var dog,dog1,happydog,foodS,database;
var lastFed,fedTime;
var foodObj;                                          ;
var foodStock=0;
var gamestatechange,getgamestate;
var bed_img,bathroom_img,garden_img,saddog;
var gameState = "";

function preload()
{

	dog1= loadImage("images/Dog.png");
  happydog = loadImage("images/happy dog.png");
  bed_img = loadImage("images/Bed Room.png");
  bathroom_img=loadImage("images/Wash Room.png")
  garden_img=loadImage("images/Garden.png")
  saddog = loadImage("images/Living Room.png");
}


function setup() {
  database = firebase.database();
	createCanvas(550,500);

  foodStock=database.ref('Food'); 
  foodStock.on("value",readStock);

  getgamestate = database.ref('gameState'); 
  getgamestate.on("value",function(data)
  {
    gameState = data.val();
  });

  dog= createSprite(300,250,1,1);
  dog.addImage(dog1);
  dog.scale=0.25;
  

  foodObj = new Food();
  
  button = createButton("ADD FOOD")
  button.position(360,100);
  button.mousePressed(addFood)

  button2 = createButton("FEED THE PET")
  button2.position(360,130);
  button2.mousePressed(feeddog)
}


function draw() {  

  background(46,139,87);
  

 fedTime = database.ref('FedTime');
 fedTime.on("value",function(data)
 {
   lastFed= data.val();
 });
  
 

 if(gameState!=="Hungry")
 {
  button.hide();
  button2.hide();
  dog.remove();
}
else
 {
   button.show();
   button2.show();
   dog.addImage(dog1);

 }


currentTime= hour();
if(currentTime==(lastFed+1))
{
  update("Playing");
  foodObj.garden();
}
else if(currentTime==(lastFed+2))
{
  update("Sleeping");
  foodObj.bedroom();
}
else if(currentTime>(lastFed+2) &&currentTime<=(lastFed+4))
{
  update("Bathing");
  foodObj.washroom();
}
else
{
  update("Hungry");
  foodObj.display();
  
}

 foodObj.display();
 
 drawSprites();
}

function readStock(data)
{
  foodS = data.val();
  foodObj.updateFoodStock(foodS);

}



function feeddog()
  {
     dog.addImage(happydog);
     if(foodObj.getFoodStock()<= 0)
     { 
       foodObj.updateFoodStock(foodObj.getFoodStock()*0);
     }
     else
     {
        foodObj.updateFoodStock(foodObj.getFoodStock()-1);
     }
     database.ref('/').update({
      Food:foodObj.getFoodStock(),
      FedTime: hour()
    });
  }

  function addFood()
{
   foodS++;
   database.ref('/').update({
   Food:foodS
  });
}

function update(state)
{
  database.ref('/').update({
    gameState:state
   });
}
