var particles = []
var gravity;
var wind;
var slider1;
var slider2;
var slider3;
var angle;
var vel;
var happy,sad, fear, anger;

function setup() {
    createCanvas(800, 600)
    particles.push(new Particle());
    
    slider1 = createSlider(-180, 0, -90, 10);
    
    slider1.position(10,10);
    slider1.style('width', '200px');
    console.log(slider1.value());
    
    slider2 = createSlider(0, 100, 50, 1);
    slider2.position(10,40);
    slider2.style('width', '200px');
    
    slider3 = createSlider(0, 10, 5, 1);
    slider3.position(10,70);
    slider3.style('width', '200px');

    happy = false;
    sad = false; 
    fear = false;
    anger = false;

}

function draw() {
    background(0);
    gravity = createVector(0, 0.1);
    var mouse = createVector(mouseX, mouseY);
    var centre = createVector(width/2, height/2);
    wind = p5.Vector.sub(centre, mouse);
    wind.setMag(0.2);
    //console.log(wind);
    
    if(key == 'a')
    {
        vel = 150;
        anger = true; 
        gravity = createVector(0, 10.0);
        happy = false; 
        sad = false; 
        fear = false; 
    }

    if(key == 'h')
    {
        vel = 150;
        happy = true; 
        gravity = createVector(0, 10.0);
        anger = false; 
        sad = false; 
        fear = false; 
    }

    if(key == 's')
    {
        vel = 3;
        sad = true; 
        gravity = createVector(0, 0.001);
        happy = false; 
        anger = false; 
        fear = false; 
    }

    if(key == 'f')
    {
        vel = 150;
        fear = true; 
        gravity = createVector(0, 10.0);
        happy = false; 
        sad = false; 
        anger = false; 
    }
    //particles[0].run();
    if(random(100) < slider2.value())
    {
        particles.push(new Particle());
    }
    
    for(var i = 0; i < particles.length; i++)
    {
        particles[i].run();
        particles[i].applyforce(gravity);
        if(key == 'w')
            particles[i].applyforce(wind);
        var friction = (particles[i].velocity).copy();
        friction.mult(-1);
        friction.normalize();
        friction.mult(0.01);
        particles[i].applyforce(friction);
    }
    
    for(var i = 0; i < particles.length; i++)
    {
        if(particles[i].age == 0)
        {
            particles.splice(1, [i]);
        }
    }
    
    rectMode(CENTER);
    push();
    translate(width / 2, height / 2);
    rotate(radians(slider1.value()));
    fill(255, 125);
    rect(0, 0, 50, 40);
    pop();
    
    //slider 1
    angle = slider1.value();
    
    //slider 3
    //vel = slider3.value();
}


function Particle() {
    //this.velocity = createVector(random(-4,4), random(-4,4));
    
    this.velocity = p5.Vector.fromAngle(radians(angle) + radians(random(-30,30)), 1);
    this.velocity.mult(random(2,vel));
    this.location = createVector(width / 2, height / 2);
    this.diam = 20;
    this.age = 1;
    this.acceleration = createVector(0, 0.01); 

    
    this.run = function() {
        this.display();
        this.move();
        this.borders();
        this.aging();
    }

    this.display = function() {
        noStroke();
        
        this.to = color(25,150,204,220);
        this.from = color(226,34,44,20);
        //colorMode(RGB);

        if(anger == true)
        {
            this.to = color(226,34,44,220);
            this.from = color(226,34,44,20);
            this.final = lerpColor(this.from, this.to, this.age);
            fill(this.final);
        }

        else if(happy == true)
        {
            this.to = color(255,127,80,220);
            this.from = color(255,140,0,20);
            this.final = lerpColor(this.from, this.to, this.age);
            fill(this.final);
        }
        
        else if(sad == true)
        {
            this.from = color(25,10,20,220);
            this.to = color(25,150,204,220);
            this.final = lerpColor(this.from, this.to, this.age);
            fill(this.final);
        }

        else if(fear == true)
        {
            this.to = color(226,34,44,220);
            this.from = color(226,34,44,20);
            this.final = lerpColor(this.from, this.to, this.age);
            fill(this.final);
        }
        
        ellipse(this.location.x, this.location.y, this.diam, this.diam);
    
    }

    this.move = function() {
        // if(fear == true)
        // {
        //     this.velocity.add(this.acceleration);
        //     let n = noise(age) * this.velocity;
        //     this.location.add(n);
        //     this.acceleration.mult(0);
        // }
        // else {
            this.velocity.add(this.acceleration);
            this.location.add(this.velocity);
            this.acceleration.mult(0);
        // }
    }
    
    this.borders = function() {
        if (this.location.x<0 || this.location.x>width) 
            this.velocity.x*=-0.95;
        if (this.location.y<0 || this.location.y>height) 
            this.velocity.y*=-0.95;
    }
    
    this.aging = function() {
        this.age -= 0.004;
        this.age = constrain(this.age, 0, 1);
    }
    
    this.applyforce = function(force) {
        this.acceleration.add(force);
    }
}
