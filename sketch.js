var player, playerimg

var parede_1, parede_2

var laser, lasergroup

var inimigo, inimigoGroup


var score, vidas

var sla_1, sla_2, sla_3
var i, time


function preload(){
  playerimg = loadImage("galaga-ship-png-Transparent-Images.png")

}

function setup() {
 createCanvas(windowWidth, windowHeight)

 player = createSprite(200,200)
 player.addImage("jogador", playerimg)
 player.scale = 0.1

 time = 10
 score = 0 
 sla_1 = 100
 sla_2 = 200
 vidas = 3

 parede_1 = createSprite(windowWidth - 200, windowHeight / 2, 400, windowHeight)
 parede_2 = createSprite(200, windowHeight / 2, 400, windowHeight)

 lasergroup = new Group()
 inimigoGroup = new Group()

}

function draw() {
  background(0)
  if(sla_1>=10){
    sla_1 = sla_1 - 1
  }
  if(sla_2>=10){
    sla_2 = sla_2 - 0.5
  }
  if(time>=1){
    time = time - 1
  }


  score = score + 10
  if (vidas >= 0){
    
    viloes()
 
  }

  if(inimigoGroup.isTouching(lasergroup)){
    kill(laser, inimigo)
    score = score + 1000
  }

 
 player.x = World.mouseX
 if(player.x >= parede_1.x - 220){
   player.x = parede_1.x - 220
 }

 player.y = World.mouseY
 if(player.x <= 420){
  player.x = 420
 }
 

 if(keyDown("z") && time == 0){
  atirar()
  time = 10
 }
 
 
 

 if(inimigoGroup.isTouching(player)){
  inimigoGroup.destroyEach()
   vidas = vidas - 1
   sla_1 = 200
   sla_2 = 300

 }


 if (vidas == 0){
   inimigoGroup.destroyEach()


 }
 

 

 
 inimigoGroup.bounceOff(parede_1)
 inimigoGroup.bounceOff(parede_2)


 drawSprites()
}





function atirar(){
  
  laser = createSprite(player.x, player.y - 35, 3, 20)
  laser.velocityY = -20
  laser.lifetime = 100
  lasergroup.add(laser)
}



function viloes(){

 if(frameCount % sla_1 === 0){
  for (i = 0; i <= 3; i++){
    inimigo = createSprite(random(420,windowWidth - 220), -25, 30,30)
    inimigo.velocityY = 10
    inimigo.lifetime = 100
    inimigoGroup.add(inimigo)
    }
  }
 



  if(frameCount % sla_2 === 0){
  for (i = 0; i <= 3; i++){
    inimigo = createSprite(random(420,windowWidth - 220), -25, 30,30)
    inimigo.velocityY = 15
   var teste 
   teste = Math.round(random(1,2))
   if(teste == 1){
    inimigo.velocityX = 20
   } else{
    inimigo.velocityX = -20
   }
   if(inimigo.x >= parede_1.x - 219 ){
    inimigo.velocityX = -20
   }
   if(inimigo.x <= 419){
    inimigo.velocityX = 20
   
   }
   inimigo.lifetime = 100
   inimigoGroup.add(inimigo)
  }
 }
 }




 function kill(laser, inimigo){

  inimigo.destroy()
  laser.destroy()
   

 }
