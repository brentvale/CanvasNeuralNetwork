var DELTAS = [[-1,0], [-1,1], [0,1], [1,1], [1,0], [1,-1], [0,-1], [-1,-1]];
function Neural(options){
  this.ctx = options.context;
  this.color = "#606060";
  WINDOW_WIDTH = options.width;
  WINDOW_HEIGHT = options.height;
  this.neuronsArray = [];
  this.clearScreen();
  this.createNeurons();
};

Neural.prototype = {
  clearScreen: function(){
    this.ctx.beginPath();
    this.ctx.rect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);
    this.ctx.fillStyle = "black";
    this.ctx.fill();
  },
  createNeurons: function(){
    //center neuron
    var firstNeuron = new Neuron({x:(WINDOW_WIDTH/2), y:(WINDOW_HEIGHT/2), level: 0});
    this.neuronsArray.push(firstNeuron);

    //create level one with 6 branches (selected at random)
    this.neuronsArray.push(new Neuron({parentNeuron: firstNeuron, level: 1, deltas: DELTAS[0]}));
    this.neuronsArray.push(new Neuron({parentNeuron: firstNeuron, level: 1, deltas: DELTAS[1]}));
    this.neuronsArray.push(new Neuron({parentNeuron: firstNeuron, level: 1, deltas: DELTAS[2]}));
    this.neuronsArray.push(new Neuron({parentNeuron: firstNeuron, level: 1, deltas: DELTAS[3]}));
    this.neuronsArray.push(new Neuron({parentNeuron: firstNeuron, level: 1, deltas: DELTAS[4]}));
    this.neuronsArray.push(new Neuron({parentNeuron: firstNeuron, level: 1, deltas: DELTAS[5]}));
    this.neuronsArray.push(new Neuron({parentNeuron: firstNeuron, level: 1, deltas: DELTAS[6]}));
    this.neuronsArray.push(new Neuron({parentNeuron: firstNeuron, level: 1, deltas: DELTAS[7]}));
    
    //iterate through array and draw each
    for(var i = 0; i < this.neuronsArray.length; i++){
      this.neuronsArray[i].createChildren();
    }
    
    for(var i = 0; i < this.neuronsArray.length; i++){
      var temp = this.neuronsArray[i];
      this.drawNeuralHead(temp);
      this.drawChildren(temp);
      if(this.neuronsArray[i].parentNeuron){
        this.drawPathToParent(temp);
      }
    }  
  },
  drawChildren: function(temp){
    if(temp.childNeurons.length == 0){
      return;
    }
    for(var i = 0; i < temp.childNeurons.length; i++){
      this.drawChildren(temp.childNeurons[i]);
      this.drawNeuralHead(temp);
      this.drawPathToParent(temp);
    }
  },
  drawPathToParent: function(temp){
    if(temp.parentNeuron){
      this.ctx.beginPath();
      this.ctx.moveTo(temp.x,temp.y);
      this.ctx.lineTo(temp.parentNeuron.x,temp.parentNeuron.y);
      // this.ctx.quadraticCurveTo(temp.parentNeuron.x, 10, 388, 10, 388, temp.parentNeuron.y);
      this.ctx.strokeStyle = temp.color;
      this.ctx.stroke();
    }
  },
  drawNeuralHead:function(temp){
    if(temp.parentNeuron){
      this.ctx.beginPath(); 
      this.ctx.arc(temp.x,temp.y, temp.radius, 0, Math.PI*2); 
      this.ctx.closePath(); 
      this.ctx.fillStyle = this.color; 
      this.ctx.fill(); 
    }
  }
};