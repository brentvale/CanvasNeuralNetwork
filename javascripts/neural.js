var DELTAS = [[-1,0], [-1,1], [0,1], [1,1], [1,0], [1,-1], [0,-1], [-1,-1]];
function Neural(options){
  this.ctx = options.context;
  this.nodeNum = options.nodeNum;
  this.color = "#606060";
  WINDOW_WIDTH = options.width;
  WINDOW_HEIGHT = options.height;
  this.neuronsArray = [];
  this.clearScreen();
  this.createNeurons();
  this.createActionPotential();
};

Neural.prototype = {
  clearScreen: function(){
    if(this.nodeNum === 0){
      this.ctx.beginPath();
      this.ctx.rect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);
      this.ctx.fillStyle = "black";
      this.ctx.fill();
    }
  },
  createNeurons: function(){
    //4 origins from where action potentials start
    var thisX = WINDOW_WIDTH/3;
    var thisY = WINDOW_HEIGHT/3;

    switch(this.nodeNum){
      case 0:
        thisX = thisX;
        thisY = thisY;
        break;
      case 1:
        thisX = thisX*2;
        thisY = thisY;
        break;
      case 2:
        thisX = thisX*2;
        thisY = thisY*2;
        break;
      case 3:
        thisX = thisX;
        thisY = thisY*2;
        break;
    }
    
    var firstNeuron = new Neuron({x:thisX, y:thisY, level: 0});
    this.originNeuron = firstNeuron;
    
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
    //go from 1 becuase origins children created manually above
    for(var i = 0; i < this.neuronsArray.length; i++){
      this.originNeuron.childNeurons.push(this.neuronsArray[i]);
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
  drawPathToParent: function(temp, color, line){
    if(temp.parentNeuron){
      this.ctx.beginPath();
      this.ctx.moveTo(temp.x,temp.y);
      this.ctx.lineTo(temp.parentNeuron.x,temp.parentNeuron.y);
      this.ctx.strokeStyle = color || temp.color;
      this.ctx.lineWidth = line || 2;
      this.ctx.stroke();
    }
  },
  drawNeuralHead:function(temp, color, radius){
    var tempRadius = radius || temp.radius;
    this.ctx.beginPath(); 
    this.ctx.arc(temp.x,temp.y, tempRadius, 0, Math.PI*2); 
    this.ctx.closePath(); 
    this.ctx.fillStyle = color || this.color; 
    this.ctx.fill(); 
  },
  createActionPotential:function(){
    var that = this;
    setTimeout(function(){
      setInterval(function(){
        that.propogateActionPotential(that.originNeuron)
      }, 600);
    }, 500);
  },
  propogateActionPotential: function(currentNode){
    if(currentNode.childNeurons.length == 0){
      return;
    }
    var nextChildIndex = Math.floor(Math.random() * currentNode.childNeurons.length);
    var nextChild = currentNode.childNeurons[nextChildIndex];
    
    var that = this;
    
    setTimeout(function(){
      that.drawPathToParent(nextChild, "#def0ff", 1);
      that.drawNeuralHead(nextChild, "#def0ff", 2);
      that.propogateActionPotential(nextChild);
    },30);
    setTimeout(function(){
      that.drawPathToParent(nextChild, "#424242", 2);
      that.drawNeuralHead(nextChild, "#424242", 3);
    },40);
    
  }
  
};







