var particle = new Array();

//Function for creating a new particle effect
function newParticle(index, partAmount, xCenter, yCenter, nxSpeed, nySpeed, nDropX, nDropY, nLife){
    particle[index] = new Array(partAmount);
    
    particle[index][0] = {//Defaults will be stored in slot 0
        life: nLife,

        xPos: xCenter,
        yPos: yCenter,

        xSpeed: nxSpeed,
        ySpeed: nySpeed,
        
        xSpread: 0.0,
        ySpread: 0.0,
        
        xSpawn: 0.0,
        ySpawn: 0.0,
        
        alive: nLife,
        
        //Setting the dropof
        xDrop: nDropX,
        yDrop: nDropY,

        getLife: function(){
            return this.life;
        },

        getX: function(){
            return this.xPos;
        },

        getY: function(){
            return this.yPos;
        },

        getxSpeed: function(){
            return this.xSpeed;
        },

        getySpeed: function(){
            return this.ySpeed;
        },
        
        getAlive: function(){
            return this.alive;
        },
        
        getDropX: function(){
            return this.xDrop;
        },
        
        getDropY: function(){
            return this.yDrop;
        },
        
        setX: function(nxPos){
            this.xPos = nxPos;
        },
        
        setY: function(nyPos){
            this.yPos = nyPos;
        }
    };
    
    for(var i = 1; i < partAmount; i++){
        particle[index][i] = {
            life: Math.random() * particle[index][0].life,
            
            xPos: particle[index][0].xPos,
            yPos: particle[index][0].yPos,
            
            xSpeed: particle[index][0].xSpeed * Math.random() * 2 - particle[index][0].xSpeed,
            ySpeed: particle[index][0].ySpeed * Math.random() * 2 - particle[index][0].ySpeed,
            
            alive: 0,
            maxAlive: particle[index][0].getAlive() * Math.random(),
            
            pSize: 5,
            
            //Regenerating the values
            regValues: function(){
                
                xSpeed: particle[index][0].xSpeed * Math.random() * 2 - particle[index][0].xSpeed;
                ySpeed: particle[index][0].ySpeed * Math.random() * 2 - particle[index][0].ySpeed;
                
                maxAlive: particle[index][0].getAlive() * Math.random();
            },
            
            getLife: function(){
                return this.life;
            },
            
            getX: function(){
                return this.xPos;
            },

            getY: function(){
                return this.yPos;
            },

            getxSpeed: function(){
                return this.xSpeed;
            },

            getySpeed: function(){
                return this.ySpeed;
            },
            
            getAlive: function(){
                return this.alive;
            },
            
            getMaxAlive: function(){
                return this.maxAlive;
            },
            
            setX: function(val){
                this.xPos = val;
            },
            
            setY: function(val){
                this.yPos = val;
            },
            
            incAlive: function(val){
                this.alive = this.alive + val;
            },
            
            resetAlive: function(val){
                this.alive = 0;
            },
            
            setSpeedX: function(val){
                this.xSpeed = val;
            },
            
            setSpeedY: function(val){
                this.ySpeed = val;
            }
        }
    }
}

function displayParticle(index){
    for(var i = 1; i < particle[index].length; i++){
        
        //drawEclipse(particle[index][i].getX(), particle[index][i].getY(), 5);
        drawRect(particle[index][i].getX()-2, particle[index][i].getY()-2, particle[index][i].getX()+2, particle[index][i].getY()+2)
        
        particle[index][i].setX(particle[index][i].xSpeed + particle[index][i].xPos);
        particle[index][i].setY(particle[index][i].ySpeed + particle[index][i].yPos);
        
        //Updating the time alive for the particle
        particle[index][i].incAlive(1);
        
        //Dropping the particles
        particle[index][i].setSpeedX( particle[index][i].getxSpeed() - particle[index][0].getDropX() );
        particle[index][i].setSpeedY( particle[index][i].getySpeed() - particle[index][0].getDropY() );
        
        //Checking if the particle has been alive for a longer time than the original particle
        if(particle[index][i].getAlive() > particle[index][i].getMaxAlive()){
            particle[index][0].xSpawn = 20;
            particle[index][0].ySpawn = 20;
            particle[index][i].setX(particle[index][0].getX() + (Math.random() * particle[index][0].xSpawn - particle[index][0].xSpawn / 2));
            particle[index][i].setY(particle[index][0].getY() + (Math.random() * particle[index][0].ySpawn - particle[index][0].ySpawn / 2));
            
            particle[index][i].resetAlive();
            
            //Regenerating the particle values
            particle[index][i].regValues();
            
            particle[index][i].setSpeedX(particle[index][0].xSpeed * Math.random() * 2 - particle[index][0].xSpeed);
            particle[index][i].setSpeedY(particle[index][0].ySpeed * Math.random() * 2 - particle[index][0].ySpeed);
        }
    }
}

function setParticlePosition(index, xPos, yPos){
    particle[index][0].setX(xPos);
    particle[index][0].setY(yPos);
}