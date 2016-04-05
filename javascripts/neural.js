var DELTAS = [[-1,0], [-1,1], [0,1], [1,1], [1,0], [1,-1], [0,-1], [-1,-1]];
function Neural(options){
  this.ctx = options.context;
  this.color = "white";
  this.width = options.width;
  this.height = options.height;
  this.neuronsArray = [];
  this.clearScreen();
  this.createNeurons();
  
};

Neural.prototype = {
  clearScreen: function(){
    this.ctx.beginPath();
    this.ctx.rect(0, 0, this.width, this.height);
    this.ctx.fillStyle = "black";
    this.ctx.fill();
  },
  createNeurons: function(){
    //center neuron
    var firstNeuron = new Neuron({x:(this.width/2), y:(this.height/2), level: 0});
    this.neuronsArray.push(firstNeuron);

    //create level one with 6 branches (selected at random)
    this.neuronsArray.push(new Neuron({parentNeuron: firstNeuron, level: 1, deltas: DELTAS[0]}));
    this.neuronsArray.push(new Neuron({parentNeuron: firstNeuron, level: 1, deltas: DELTAS[1]}));
    this.neuronsArray.push(new Neuron({parentNeuron: firstNeuron, level: 1, deltas: DELTAS[7]}));
    this.neuronsArray.push(new Neuron({parentNeuron: firstNeuron, level: 1, deltas: DELTAS[3]}));
    this.neuronsArray.push(new Neuron({parentNeuron: firstNeuron, level: 1, deltas: DELTAS[4]}));
    this.neuronsArray.push(new Neuron({parentNeuron: firstNeuron, level: 1, deltas: DELTAS[5]}));
    
    //iterate through array and draw each
    for(var i = 0; i < this.neuronsArray.length; i++){
      this.neuronsArray[i].createChildren();
    }
    
    for(var i = 0; i < this.neuronsArray.length; i++){
      var temp = this.neuronsArray[i];
      this.drawNeuralHead(temp);
      if(this.neuronsArray[i].parentNeuron){
        this.drawPathToParent(temp);
      }
    }  
  },
  drawPathToParent: function(temp){
    this.ctx.beginPath();
    this.ctx.moveTo(temp.x,temp.y);
    this.ctx.lineTo(temp.parentNeuron.x,temp.parentNeuron.y);
    this.ctx.strokeStyle = temp.color;
    this.ctx.stroke();
  },
  drawNeuralHead:function(temp){
    this.ctx.beginPath(); 
    this.ctx.arc(temp.x,temp.y, temp.radius, 0, Math.PI*2); 
    this.ctx.closePath(); 
    this.ctx.fillStyle = this.color; 
    this.ctx.fill(); 
  }
};