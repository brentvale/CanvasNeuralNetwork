function Neuron(options){
  this.color = options.color || "#424242";
  this.radius = options.radius || 2;
  this.level = options.level;
  this.childNeurons = [];
  this.parentNeuron = options.parentNeuron || null;
  this.deltas = options.deltas;
  this.y = options.y || this.setYFromParent();
  this.x = options.x || this.setXFromParent();
};
Neuron.prototype = {
  
  setXFromParent: function(){
    //[-1, 0]
    if(this.deltas){
      var deltaX = this.parentNeuron.x + 40*this.deltas[0] + Math.floor(Math.random() * 100 - 50);
      return deltaX;
    }
  },
  setYFromParent: function(){
    if(this.deltas){
      var deltaY = this.parentNeuron.y + 40*this.deltas[1] + Math.floor(Math.random() * 100 - 50);
      return deltaY;
    }
  },
  createChildren: function(){
    if(this.x < -50 || this.y < -50 || this.x > (WINDOW_WIDTH + 50) || this.y > (WINDOW_HEIGHT + 50)){
      return;
    } 
    if(this.level > 15){
      return;
    }
    //create between 1 and 8 children
    var totalChildren = 2;
    if(this.level > 5){
      totalChildren = 1;
    } else {
      totalChildren = Math.floor(Math.random() * 2) + 3;
    }
    
    for(var i = 0; i < totalChildren; i++){
      var newChild = new Neuron({parentNeuron: this, level: (this.level + 1), deltas: this.deltas});
      newChild.createChildren();
      this.childNeurons.push(newChild);
    }
  },
}