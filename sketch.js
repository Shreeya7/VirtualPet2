//Create variables here
    var dogImage1,dogImage2;
    var database;
    var dog;
    var food,foodStock;
   var fedTime;
   var lastFed;
   var addFood;
   var foodObj;
   var feed;


function preload()
{
  //load images here
  dogImage1 = loadImage("images/dogImg.png");
  dogImage2 = loadImage("images/dogImg1.png");
}

function setup() {
	createCanvas(1200, 800);
  
database = firebase.database();

foodStock = database.ref('Food');
foodStock.on("value",readStock);

foodObj = new Food();

dog = createSprite(1000,500,100,100);
dog.addImage(dogImage1);
dog.scale = 0.2;

feed = createButton("Feed the Dog");
feed.position(700,95);
feed.mousePressed(feedDog);

addFood = createButton("Add Food");
addFood.position(800,95);
addFood.mousePressed(addFoods);


}

function draw() {  
  background("lightpink");

  foodObj.display();

  drawSprites();

  fedTime = database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed = data.val();
  });
  
fill(255,255,254);
textSize(15);

if(lastFed >= 12)
{
  text("Last Feed : "+ lastFed % 12 + "PM",350,30)
}


else if(lastFed == 0){
  text("Last Feed : 12 AM",350,30);
}

else {
  text("Last Feed : " + lastFed + "AM",350,30);
}


}

function readStock(data)
{
  food = data.val();
  foodObj.updateFoodStock(food);
}

function addFoods()
{
  food ++;
  database.ref('/').update({
    Food : food
  })
}

function feedDog()
{
  dog.addImage(dogImage2);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food : foodObj.getFoodStock(),
    FeedTime : hour()
  })
}

