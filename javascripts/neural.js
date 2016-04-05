var DELTAS = [[-1,0], [-1,1], [0,1], [1,1], [1,0], [1,-1], [0,-1], [-1,-1]];
function Neural(options){
  this.ctx = options.context;
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
    var firstNeuron = new Neuron({x:(this.width/2), y:(this.height/2), context:this.ctx, level: 0});
    
    
    this.neuronsArray.push(firstNeuron);
    
    //create level one with 6 branches (selected at random)
    this.neuronsArray.push(new Neuron({parentNeuron: firstNeuron, context:this.ctx, level: 1, deltas: DELTAS[0]}));
    this.neuronsArray.push(new Neuron({parentNeuron: firstNeuron, context:this.ctx, level: 1, deltas: DELTAS[1]}));
    this.neuronsArray.push(new Neuron({parentNeuron: firstNeuron, context:this.ctx, level: 1, deltas: DELTAS[7]}));
    this.neuronsArray.push(new Neuron({parentNeuron: firstNeuron, context:this.ctx, level: 1, deltas: DELTAS[3]}));
    this.neuronsArray.push(new Neuron({parentNeuron: firstNeuron, context:this.ctx, level: 1, deltas: DELTAS[4]}));
    this.neuronsArray.push(new Neuron({parentNeuron: firstNeuron, context:this.ctx, level: 1, deltas: DELTAS[5]}));
    
    //iterate through array and draw each
    for(var i = 0; i < this.neuronsArray.length; i++){
      this.neuronsArray[i].drawNeuralHead();
      if(this.neuronsArray[i].parentNeuron){
        this.neuronsArray[i].drawPathToParent();
      }
    }
  },
  
};