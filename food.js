 class Food
{
    constructor()
    {
         this.foodStock=0;
         this.lastFed;
         this.image = loadImage("images/milk.png");
    }

    updateFoodStock(foodStock)
    {
        this.foodStock = foodStock;
    }

    getFedTime(lastFed)
    {
        this.lastFed = lastFed;
    }
    
    deductfoodStock()
    {
      if(this.foodStock > 0)
      {
          this.foodStock = this.foodStock - 1;
      }
      return this.foodStock;
    }

    getFoodStock()
{
    return this.foodStock;
}

   display()
    {

        if(gameState == "Hungry") {       
    var x=80,y=100;
    imageMode(CENTER);
    image(this.image,720,220,70,70);
    if(this.foodStock!=0)
    {
        for(var i= 0 ;i<this.foodStock;i++)
        {
            if(i%10==0)
            {
                x=80;
                y=y+50;
            }
            image(this.image,x,y,50,50);
            x=x+30;
        }
    }
}
    } 
    bedroom()
  {
      background(bed_img,550.500)

  }

 washroom()
 {
    background(bathroom_img,550.500)
 }

 garden()
 {
    background(garden_img,550.500)
 }   
}