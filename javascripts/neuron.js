function Neuron(options){
  this.color = options.color || "white";
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
    var deltaX = this.parentNeuron.x + 50*this.deltas[0] + Math.floor(Math.random() * 20);
    return deltaX;
  },
  setYFromParent: function(){
    var deltaY = this.parentNeuron.y + 50*this.deltas[1] + Math.floor(Math.random() * 20);
    return deltaY;
  },
  addChild: function(child){
    this.childNeurons.push(child);
  },
  createChildren: function(){
    if(this.level == 10){
      return;
    };
    var children = [];
    //create between 1 and 8 children
    var totalChildren = Math.floor(Math.random() * 2);
    for(var i = 0; i < totalChildren; i++){
      var newChild = new Neuron({parentNeuron: this, level: (this.level + 1), deltas: this.deltas});
      this.addChild(newChild);
    }
  }
}