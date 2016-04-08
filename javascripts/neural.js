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
  this.tick();
};

Neural.prototype = {
  clearScreen: function(){
    this.ctx.beginPath();
    this.ctx.rect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);
    this.ctx.fillStyle = "black";
    this.ctx.fill();
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
    //currentActionPotentialNode, use to propogate potential
    this.currentActionPotentialNode = firstNeuron;
    
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
  },
  drawParentNeurons: function(){
    for(var i = 0; i < this.neuronsArray.length; i++){
      var tempNode = this.neuronsArray[i];
      this.drawNeuralHead(tempNode);
      this.drawChildren(tempNode);
      if(this.neuronsArray[i].parentNeuron){
        this.drawPathToParent(tempNode);
      }
    }
  },
  drawChildren: function(tempNode){
    if(tempNode.childNeurons.length == 0){
      return;
    }
    for(var i = 0; i < tempNode.childNeurons.length; i++){
      this.drawChildren(tempNode.childNeurons[i]);
      this.drawNeuralHead(tempNode);
      this.drawPathToParent(tempNode);
    }
  },
  drawPathToParent: function(tempNode, color, line){
    if(tempNode.parentNeuron){
      this.ctx.beginPath();
      this.ctx.moveTo(tempNode.x,tempNode.y);
      this.ctx.lineTo(tempNode.parentNeuron.x,tempNode.parentNeuron.y);
      this.ctx.strokeStyle = color || tempNode.color;
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
  propogateActionPotential: function(){
    this.currentActionPotentialNode.color = "#424242"
    
    var nextChildIndex = Math.floor(Math.random() * this.currentActionPotentialNode.childNeurons.length);
    var nextChild = this.currentActionPotentialNode.childNeurons[nextChildIndex];
    nextChild.color = "#def0ff";
    
    if(nextChild.childNeurons.length == 0){
      this.currentActionPotentialNode = this.originNeuron;
    } else {
      this.currentActionPotentialNode = nextChild;
    }
      
  },
  tick: function(){
    var that = this;
    this.tickInterval = setInterval(function(){
      that.clearScreen();
      //child neurons drawn as a function of parent neurons
      that.drawParentNeurons();
      that.propogateActionPotential();
    }, 50)
  }
  
};







