//********************--Previous Queue - do not delete!--********************//
											/************* Queue class ************************/
											function Queue(){ 
												this.arr=new Array();
											}

											/************* Queue methods **********************/
											Queue.prototype.isEmpty=function(){
												if(this.arr.length == 0)
													return true;
												return false;
											 }

											Queue.prototype.enqueue=function(item){
												//adds new item to the beginning of the queue
												this.arr.unshift(item); 			
											}
											 
											Queue.prototype.dequeue=function(){
												//removes and returns the last element of the queue
												if (this.isEmpty == true) 
													return null;
												return this.arr.pop();				
											} 

											Queue.prototype.getHead=function(){
												//returns the last element of the queue
												if (this.isEmpty == true) 
													return null;
												return this.arr[this.arr.length-1];
											}
//********************--^^Previous Queue - Intended for deletion^^--********************//
//********************-- New Queue - Heap (Start)*******************//
// Heap class (Minimum Heap)//

function Heap() {
    this.n = 0;
    this.arr = new Array();
	this.pointers = new Array();
}


//Heap Functions//



Heap.prototype.cloneH = function (q) { // clone heap for animation
let i;
for(i=0;i<q.arr.length;i++){
this.arr[i] = q.arr[i];
}
this.n = q.n;
}


Heap.prototype.isEmpty = function () { // Return true if heap is empty
    if (this.n == 0)
        return true;
    return false;
}



Heap.prototype.enqueue = function (item) { // insert to heap
	
    this.arr[this.n] = item;
	this.pointers[item.index] = this.n; //
    this.n++;
    this.HeapifyUp(this.n-1);
}

Heap.prototype.changePriority = function (verIndex,to) { // insert to heap

	let ind = this.pointers[verIndex];
    this.arr[ind].key = to;
	this.HeapifyDown(ind);
    this.HeapifyUp(ind);

}

Heap.prototype.extract_min = function () { // extract min
    let min;
    if(this.n < 1)
        return;
    min = this.arr[0];
	this.pointers[min.index]=-1; // Change<<<<<
	this.arr[0] = this.arr[this.n-1];
	this.pointers[this.arr[0].index]=0;
    this.n--;
    this.HeapifyDown(0);
	this.arr.pop(); // for  keeping array at right length
    return min;
}

Heap.prototype.HeapifyDown = function (i) { 
    let l,r,n,min,temp;
    l = (i+1)*2-1; // left child index
    r = (i+1)*2; // right child index
    n = this.n; // heap length
    min = i;
    if(l<n && this.arr[l].key < this.arr[i].key)
        min = l;
    if(r<n && this.arr[r].key < this.arr[min].key)
        min = r;
    if(min != i){
        temp = this.arr[i];
        this.arr[i] = this.arr[min];
        this.arr[min] = temp;
		this.pointers[this.arr[min].index] = min;
		this.pointers[this.arr[i].index] = i;
        this.HeapifyDown(min);
    }

}

Heap.prototype.HeapifyUp = function (i) {
    let p,n,min,temp;
    p = (i-1); 
    p = Math.floor(p/2); // parent index
    n = this.n;
    min = i;
    if(p >= 0 && this.arr[p].key > this.arr[i].key)
        min = p
    if(min != i){ // then min = p
        temp = this.arr[i];
        this.arr[i] = this.arr[min];
        this.arr[min] = temp;
		this.pointers[this.arr[min].index] = min;
		this.pointers[this.arr[i].index] = i;
        this.HeapifyUp(min);
    }


    
}

//********************-- New Queue - Heap (End)*******************//


/************* vertex class ************************/
function vertex(index, x, y, color){
    	this.index = index;
    	this.x = x;
    	this.y = y;
		this.color = color;
		
		//attributes for Dijkstra
		this.Dijkstra_prev = -1; 			//previous vertex
		this.Dijkstra_d = 10000; 				//distance from S 
		this.Dijkstra_color = "white"; 		//color vertex while running Dijkstra or animation
		this.Dijkstra_animation = false; 	//for animation
		
		//attributes for BellmanFord
		this.BellmanFord_prev = -1; 			//previous vertex
		this.BellmanFord_d = 10000; 				//time of finding 
		this.BellmanFord_color = "white"; 		//color vertex while running BellmanFord or animation
		this.BellmanFord_animation = false; 	//for animation
		
		//attributes for Johnson
		this.Johnson_prev = -1; 			//previous vertex
		this.Johnson_d = 10000; 				//time of finding 
		this.Johnson_h = 10000; 				//for reweighting
		this.Johnson_color = "white"; 		//color vertex while running Johnson or animation
		this.Johnson_animation = false; 	//for animation
}

/************* vertex methods **********************/
vertex.prototype.draw = function(){

	if ((alg == -1) || (alg == 0 && this.Dijkstra_animation == false) 
			|| (alg == 1 && this.BellmanFord_animation == false)|| (alg == 2 && this.Johnson_animation == false))
			drawVertex(this.index,null,null,this.x, this.y, this.color); 
	
	else if (alg == 0 && this.Dijkstra_animation == true) //Dijkstra
			drawVertex(this.index,this.Dijkstra_d,this.Dijkstra_prev,this.x, this.y, this.Dijkstra_color);
			
	else if (alg == 1 && this.BellmanFord_animation == true) //Dijkstra
			drawVertex(this.index,this.BellmanFord_d,this.BellmanFord_prev,this.x, this.y, this.BellmanFord_color);
			
	else if (alg == 2 && this.Johnson_animation == true) //Dijkstra
			drawVertex(this.index,this.Johnson_d,this.Johnson_prev,this.x, this.y, this.Johnson_color);
	
}

/************* edge class ************************/
function edge(u,v,weight,curve){ // was - function edge(u,v,weight,curve,weight)
	this.u = u;
	this.v = v;
	this.color = "black";
	this.curve = curve;
	this.weight = weight;
	
	//attributes for Dijkstra
	this.Dijkstra_color = "black"; 			//color edge while running Dijkstra
	this.Dijkstra_flag = true; 				// if the algorithm hasn't passed on this edge
	this.Dijkstra_animation  = false; 		//for animation
	
	//attributes for BellmanFord
	this.BellmanFord_color = "black"; 			//color edge while running BellmanFord
	this.BellmanFord_flag = true; 				//if the algorithm hasn't passed on this edge
	this.BellmanFord_animation = false;			//for animation
	
	//attributes for Johnson
	this.Johnson_color = "black"; 			//color edge while running Johnson
	this.Johnson_flag = true; 				//if the algorithm hasn't passed on this edge
	this.Johnson_animation = false;			//for animation
}

/************* graph class ************************/
function graph(){
	this.vertices = [];
	this.edges = [];
	this.n = 0;
	this.m = 0;
	this.directed = directed; 		//if the graph is directed-graph or digraph
	
	this.Dijkstratime=0;				  	//Dijkstra timer
	this.BellmanFordtime=0;					//BellmanFord timer
	this.Johnsontime=0;					    //Johnson timer
	
	
	this.matrix = null; 			//matrix of neighbours, value = index of edge in edges[] or -1
}

/************* graph basic methods ****************/
graph.prototype.cloneGraph = function(el){

let i,j;
this.n = el.n;
this.m = el.m;
this.directed = el.directed;
this.Dijkstratime = el.Dijkstratime;
this.BellmanFordtime = el.BellmanFordtime;
this.Johnsontime = el.Johnsontime;
this.matrix = [];
if(el.matrix != null)
for(i=0;i<el.matrix.length;i++){
	this.matrix[i]=[];
		for(j=0;j<el.matrix[i].length;j++)
			this.matrix[i][j] = el.matrix[i][j];
}



for(i=0;i<el.vertices.length;i++){
	this.vertices[i] = new vertex(el.vertices[i].index,el.vertices[i].x,el.vertices[i].y,el.vertices[i].color);
		//attributes for Dijkstra
		this.vertices[i].Dijkstra_prev = el.vertices[i].Dijkstra_prev; 			//previous vertex
		this.vertices[i].Dijkstra_d = el.vertices[i].Dijkstra_d; 				//distance from S 
		this.vertices[i].Dijkstra_color = "white"; 		//color vertex while running Dijkstra or animation
		this.vertices[i].Dijkstra_animation =true; 	//for animation
		
		//attributes for BellmanFord
		this.vertices[i].BellmanFord_prev = el.vertices[i].BellmanFord_prev; 			//previous vertex
		this.vertices[i].BellmanFord_d = el.vertices[i].BellmanFord_d; 				//time of finding 
		this.vertices[i].BellmanFord_color = el.vertices[i].BellmanFord_color; 		//color vertex while running BellmanFord or animation
		this.vertices[i].BellmanFord_animation = true; 	//for animation
		
		//attributes for Johnson
		this.vertices[i].Johnson_prev = el.vertices[i].Johnson_prev; 			//previous vertex
		this.vertices[i].Johnson_d = el.vertices[i].Johnson_d; 				//time of finding 
		this.vertices[i].Johnson_h = el.vertices[i].Johnson_h; 				// for reweighting
		this.vertices[i].Johnson_color = el.vertices[i].Johnson_color; 		//color vertex while running Johnson or animation
		this.vertices[i].Johnson_animation = true; 	//for animation
	}
	
for(i=0;i<el.edges.length;i++){
this.edges[i] = new edge(el.edges[i].u,el.edges[i].v,el.edges[i].weight,el.edges[i].curve);


	this.color = el.edges[i].color ;
	
	//attributes for Dijkstra
	this.edges[i].Dijkstra_color = el.edges[i].Dijkstra_color; 			//color edge while running Dijkstra
	this.edges[i].Dijkstra_flag = el.edges[i].Dijkstra_flag; 				// if the algorithm hasn't passed on this edge
	this.edges[i].Dijkstra_animation  = el.edges[i].Dijkstra_animation; 		//for animation
	
	//attributes for BellmanFord
	this.edges[i].BellmanFord_color = el.edges[i].BellmanFord_color; 			//color edge while running BellmanFord
	this.edges[i].BellmanFord_flag = el.edges[i].BellmanFord_flag; 				//if the algorithm hasn't passed on this edge
	this.edges[i].BellmanFord_animation = true;			//for animation
	
	//attributes for Johnson
	this.edges[i].Johnson_color = el.edges[i].Johnson_color; 			//color edge while running Johnson
	this.edges[i].Johnson_flag = el.edges[i].Johnson_flag; 				//if the algorithm hasn't passed on this edge
	this.edges[i].Johnson_animation = true;			//for animation


//
}
}


graph.prototype.isEmpty = function(){
	if (this.vertices.length == 0) 
		return true;
	return false;
}

graph.prototype.addVertex = function(x, y, color){
	this.n++;
    this.vertices.push(new vertex(this.n, x ,y, color));
	this.Dijkstratime=0;				  	
	this.BellmanFordtime=0;					
	this.Johnsontime=0;	
	clearAlg();
}

graph.prototype.addEdge = function(u,v){
		
	if (this.existsEdge(u,v)){ mygraph.draw(); return;} 
	if(this.existsEdge(v,u) && document.getElementById("type").value == "digraph") {mygraph.draw(); return;} // <<-------------Itay prevent double digraphe edges, need to erase duplicated edges after changing from directed to digraph
	let c=30;
	if(this.existsEdge(v,u))
		c=-30;
	this.m++;
    this.edges.push(new edge(u,v,1,c));
	this.Dijkstratime=0;				  	
	this.BellmanFordtime=0;					
	this.Johnsontime=0;	
	clearAlg();
}

graph.prototype.existsEdge = function(u,v){
	for (var i=0; i<this.edges.length; i++){
		if ((u == this.edges[i].u && v == this.edges[i].v) ){
			return true;
		}
	}
	return false;
}

graph.prototype.deleteVertex = function(index){
	var i = this.getIndex(index);
	if (index != -1) this.vertices.splice(i,1);
	for(i = this.edges.length-1; i>=0; i--){
		if(this.edges[i].u == index || this.edges[i].v == index)
			this.edges.splice(i,1);
				contentContainer.removeChild(document.getElementById(i));
	}
	this.n--;
	mygraph.rstDijkstratime(); 
	mygraph.rstBellmanFordtime(); 
	mygraph.rstJohnsontime(); 
	clearAlg();
}

graph.prototype.updateWeight = function(w,id){

	
		this.edges[id].weight = w;
	
}

	
	
	
graph.prototype.clearAll = function(){
	var i;
	for(i=this.vertices.length; i>0; i--){
		this.vertices.pop();
	}
	this.n = 0;
	for(i=this.edges.length; i>0; i--){
		this.edges.pop();
	}
	this.m = 0;
	this.rstDijkstratime();   
	this.rstBellmanFordtime(); 
	this.rstJohnsontime(); 
	clearAlg();
}

/************** graph drawings *************/
graph.prototype.draw = function(){
    	this.drawEdges();
    	var i;
    	for(i=0; i < this.vertices.length; i++){
			this.vertices[i].draw();
	}
}

graph.prototype.drawEdges = function(){
	var from,to,i;
	
	for(i=0; i<this.edges.length; i++){
		from = this.getCoords(this.edges[i].u); // get coor' of index source edge
		to = this.getCoords(this.edges[i].v); // get coor' of index dest edge
		
		if ((alg == -1) || (alg == 0 && this.edges[i].Dijkstra_animation == false) 
			|| (alg == 1 && this.edges[i].BellmanFord_animation == false)|| (alg == 2 && this.edges[i].Johnson_animation == false))
			drawEdge(from.x, from.y, to.x, to.y,this.edges[i].color,i,this.edges[i].weight,this.edges[i].curve);
		else if (alg == 0) //Dijkstra
			drawEdge(from.x, from.y, to.x, to.y,this.edges[i].Dijkstra_color,i,this.edges[i].weight,this.edges[i].curve);
		else if (alg == 1) //BellmanFord
			drawEdge(from.x, from.y, to.x, to.y,this.edges[i].BellmanFord_color,i,this.edges[i].weight,this.edges[i].curve);
		else if (alg == 2) //Johnson
			drawEdge(from.x, from.y, to.x, to.y,this.edges[i].Johnson_color,i,this.edges[i].weight,this.edges[i].curve);
	}
}
/************ graph vertices methods *************/
graph.prototype.getIndex = function(index){ // gets u index, return index in array
	for(var i=0; i<this.vertices.length; i++){
		if (this.vertices[i].index == index){
		 	return i;
		 }
	}
	return -1;
}

graph.prototype.getCoords = function(index){
	var i  = this.getIndex(index);
	if (i != -1) {return {x: this.vertices[i].x , y: this.vertices[i].y};}
	else {return {x: 100 , y:100};}
}

graph.prototype.vertexPosition = function(index, x, y){
	var i = this.getIndex(index);
	if(this!= -1){
		this.vertices[i].x = x;
		this.vertices[i].y = y;
	}
}

graph.prototype.inVertex = function(x, y){
	var delta = radius;
	var i;
	for(i=0; i<this.vertices.length ; i++){
		if (Math.abs(x - this.vertices[i].x) <= delta 	&& Math.abs(y - this.vertices[i].y) <= delta ){
			return this.vertices[i].index;
		}
	}
	return -1;
}

/*************** graph algorithms ***************/
graph.prototype.getDijkstratime = function(){
	return this.Dijkstratime;
}

graph.prototype.getBellmanFordtime = function(){
	return this.BellmanFordtime;
}

graph.prototype.getJohnsontime = function(){
	return this.Johnsontime;
}

graph.prototype.rstBellmanFordtime = function(){
	this.BellmanFordtime = 0;
}
graph.prototype.rstDijkstratime = function(){
	this.Dijkstratime = 0;
}
graph.prototype.rstJohnsontime = function(){
	this.Johnsontime = 0;
}



graph.prototype.creatMatrix = function(){
	//update current type
	this.directed=directed;
	
	//initialization matrix
	this.matrix=[];
	var i,j;
	
	for (i=0;i<this.n;i++){
		this.matrix[i]=[];
		for(j=0;j<this.n;j++)
			this.matrix[i][j]=-1;
	}
	//update neighbours
	var u;
	var v;
	for (i = 0 ; i < this.edges.length ; i++){		//i= index of edge		
		u = this.edges[i].u -1;
		v = this.edges[i].v -1;
				
		this.matrix[u][v]=i;
		
		if (this.directed == false) 	//the graph is digraph
			this.matrix[v][u]=i;
	}
}


//----Algorithms--//

// Dijkstra algorithm (Start)
graph.prototype.Dijkstra = function(){
				var i; 		//index of vertex
				var j; 		//index of vertex
				var u; 		//index of vertex i in vertices[]
				var v; 		//index of vertex j in vertices[]
				let cloneHeap,cloneG;
				for(i=0;i<this.edges.length;i++){
						if(this.edges[i].weight < 0){ // check if weights are legal
						document.querySelector("#choosenAlgo").innerHTML+='<br><span style="color: red"> Weights should be non negative</span>';
						clearAlg(); //restart
						return;
						}
					}
				//initialization source
				var s = this.getIndex(source); 		//index of source in vertices[]
				if (s == -1){
				s = 0;
				source = this.vertices[s].index;
				}
									
				this.vertices[s].Dijkstra_color = "red";
				this.vertices[s].Dijkstra_d = 0;
				this.vertices[s].Dijkstra_prev = -1;
									
				this.Dijkstratime=0;
				
								
				var Q = new Heap(); 	//new Heap
				for(i=0;i<this.vertices.length;i++){ // making first minimum heap
					 Q.enqueue({key:this.vertices[i].Dijkstra_d,index: this.vertices[i].index});
				}
				var edgeIndex;
				while (Q.isEmpty() != true){ // for each u
					//u<-head(Q)
					this.Dijkstratime++;
					i=Q.extract_min();
					u=this.getIndex(i.index);
					this.vertices[u].Dijkstra_color="red"; 	
					for(j = 1 ; j <= this.n ; j++){ // for each vertix v
						edgeIndex=this.matrix[i.index-1][j-1];
							if (edgeIndex != -1 && this.edges[edgeIndex].Dijkstra_flag == true){ //for each v=neighbour of u
								v=this.getIndex(j);
									cloneHeap = new Heap();
									cloneHeap.cloneH(Q);
									cloneG = new graph();
									cloneG.cloneGraph(this);
									cloneG.vertices[u].Dijkstra_color="red";
								myAnimation.Dijkstra_trip.enqueue({start:cloneG.vertices[u],end:cloneG.vertices[v],queue: cloneHeap,graph: cloneG});
								if(this.vertices[u].index != this.vertices[v].index) this.Dijkstratime++;
									if(this.vertices[u].Dijkstra_d + this.edges[edgeIndex].weight< this.vertices[v].Dijkstra_d){
													this.vertices[v].Dijkstra_d = this.vertices[u].Dijkstra_d + this.edges[edgeIndex].weight;
													this.vertices[v].Dijkstra_prev = i.index;
													Q.changePriority(this.vertices[v].index,this.vertices[v].Dijkstra_d);
													this.edges[edgeIndex].Dijkstra_flag = false;
													}

												cloneHeap = new Heap();
												cloneHeap.cloneH(Q);
												cloneG = new graph();
												cloneG.cloneGraph(this);
												cloneG.vertices[u].Dijkstra_color="red";
												myAnimation.Dijkstra_trip.enqueue({start:cloneG.vertices[v],end:cloneG.vertices[u], queue: cloneHeap,graph: cloneG});
											}		
										}
										
										
										this.vertices[u].Dijkstra_color="red"; 	//color (u)<-white red
										cloneHeap = new Heap();
										cloneHeap.cloneH(Q);
										cloneG = new graph();
										cloneG.cloneGraph(this);
										myAnimation.Dijkstra_trip.enqueue({start:cloneG.vertices[u],end:cloneG.vertices[u], queue: cloneHeap,graph: cloneG});
									}
								
}

// Dijkstra(End)


// BellmanFord Algorithm (Start)


graph.prototype.BellmanFord = function(){
				var i; 		//index of vertex
				var j; 		//index of vertex
				var u; 		//index of vertex i in vertices[]
				var v; 		//index of vertex j in vertices[]
				let cloneHeap,cloneG;

				
				
				if(document.querySelector("#type").value == "digraph"){
						document.querySelector("#choosenAlgo").innerHTML+='<br><span style="color: red"> Graph should be directed!</span>';
						clearAlg(); //restart
						return;
				}
					
				//initialization source
				var s = this.getIndex(source); 		//index of source in vertices[]
				if (s == -1){
				s = 0;
				source = this.vertices[s].index;
				}
									
				this.vertices[s].BellmanFord_color = "white";
				this.vertices[s].BellmanFord_d = 0;
				this.vertices[s].BellmanFord_prev = -1;
									
				this.BellmanFordtime=0;
				
				var edgeIndex;
				for(i=0;i<this.vertices.length-1;i++){ // run vertices.length - 1 times
					for(j=0;j<this.edges.length;j++){// for each edge in the graph do:
						u = this.edges[j].u;
						v = this.edges[j].v;
						
						this.BellmanFordtime++;
						this.edges[j].BellmanFord_color = "red";
						//animate before relax and after edge is red
						cloneG = new graph();
						cloneG.cloneGraph(this);
						myAnimation.BellmanFord_trip.enqueue({graph: cloneG, negative: false});
						//
						u = this.getIndex(u); // get u index in array
						v = this.getIndex(v); // get v index in array
						if(this.vertices[u].BellmanFord_d != 10000)
							if(this.vertices[u].BellmanFord_d + this.edges[j].weight< this.vertices[v].BellmanFord_d){
									this.vertices[v].BellmanFord_d = this.vertices[u].BellmanFord_d + this.edges[j].weight;
									this.vertices[v].BellmanFord_prev = this.vertices[u].index;
									this.vertices[v].BellmanFord_color = "red";
							}
						// animate while edge is still red and after relax
						cloneG = new graph();
						cloneG.cloneGraph(this);
						myAnimation.BellmanFord_trip.enqueue({graph: cloneG, negative: false});
						this.edges[j].BellmanFord_color = "black";
						this.vertices[v].BellmanFord_color = "white";
						//animate after finish with edge (edge is black)
						
						cloneG = new graph();
						cloneG.cloneGraph(this);
						myAnimation.BellmanFord_trip.enqueue({graph: cloneG, negative: false});
						
					}
				}

					// check if there is negative circle
					for(j=0;j<this.edges.length;j++){// for each edge in the graph do:
						u = this.edges[j].u;
						v = this.edges[j].v;
						this.BellmanFordtime++;
						this.edges[j].BellmanFord_color = "red";
					    u = this.getIndex(u); // get u index in array
						v = this.getIndex(v); // get v index in array
						
						//animate before check and after edge is red
						cloneG = new graph();
						cloneG.cloneGraph(this);
						if(this.vertices[u].BellmanFord_d != 10000)
							if(this.vertices[u].BellmanFord_d + this.edges[j].weight< this.vertices[v].BellmanFord_d){
								myAnimation.BellmanFord_trip.enqueue({graph: cloneG, negative: true});
								break;
							}else
								myAnimation.BellmanFord_trip.enqueue({graph: cloneG, negative: false});
							else
								myAnimation.BellmanFord_trip.enqueue({graph: cloneG, negative: false});
							
						this.edges[j].BellmanFord_color = "black"; // finished handling with no neg circle (for this iteration)
						cloneG = new graph();
						cloneG.cloneGraph(this);
						myAnimation.BellmanFord_trip.enqueue({graph: cloneG, negative: false});
						
					}
					
}

//BellmanFord (End)

// Johnson Algorithm (Start)


graph.prototype.Johnson = function(){ 
				var i; 		//index of vertex
				var j; 		//index of vertex
				var u; 		//index of vertex i in vertices[]
				var v; 		//index of vertex j in vertices[]
				var dij;
				let cloneHeap,cloneG,cloneM;
				let cForSource = [];
				let foundSource=false;
				let sx,sy,endflag=0;
				if(document.querySelector("#type").value == "digraph"){
						document.querySelector("#choosenAlgo").innerHTML+='<br><span style="color: red"> Graph should be directed!</span>';
						clearAlg(); //restart
						return;
				}
				
				cForSource.push({x: 30,y: 30, dx:10, dy: 10});
				cForSource.push({x: 30,y: 420, dx: 10, dy: -10});
				cForSource.push({x: 820,y: 420, dx: -10, dy: -10});
				cForSource.push({x: 820,y: 30, dx: -10, dy: 10});
				// adding source vertex
				while(foundSource == false){
					for(i=0;i<4;i++)
						if(mygraph.inVertex(cForSource[i].x,cForSource[i].y) == -1){
							sx = cForSource[i].x;
							sy = cForSource[i].y;
							foundSource = true;
							break;
						}
					if(foundSource == true)
						break;
					for(i=0;i<4;i++){
						cForSource[i].x += cForSource[i].dx;
						cForSource[i].y += cForSource[i].dy;
					}
				}		
				
				mygraph.n++;
				mygraph.vertices.push(new vertex(mygraph.n, sx ,sy, "white"));				
				source = mygraph.n;
				mygraph.vertices[mygraph.n-1].Johnson_d=0;
				//
				// enqueue animation (after adding source)
				cloneG = new graph();
				cloneG.cloneGraph(this);
				myAnimation.Johnson_trip.enqueue({matrix: null, graph: cloneG, negative: false, start: null, end: null,queue: null});
				//
				//initialization source
				var s = this.getIndex(source); 		//index of source in vertices[]
				this.vertices[s].Johnson_d = 0;
				this.vertices[s].Johnson_prev = -1;					
				this.Johnsontime=0;
				//adding edge from source to each vertex
				for(i=0;i<this.vertices.length;i++){
					if(this.vertices[i].index == source) // if currnet vertex is the source then skip
						continue;
					mygraph.m++;
					mygraph.edges.push(new edge(source,this.vertices[i].index,0,30));
					cloneG = new graph();
					cloneG.cloneGraph(this);
					myAnimation.Johnson_trip.enqueue({matrix: null, graph: cloneG, negative: false, start: null, end: null,queue: null});
				}
				
				var edgeIndex;
				for(i=0;i<this.vertices.length-1;i++){ // run vertices.length - 1 times
					for(j=0;j<this.edges.length;j++){// for each edge in the graph do:
						u = this.edges[j].u;
						v = this.edges[j].v;
						
						this.Johnsontime++;
						this.edges[j].Johnson_color = "red";
						//animate before relax and after edge is red
						cloneG = new graph();
						cloneG.cloneGraph(this);
						myAnimation.Johnson_trip.enqueue({matrix: null, graph: cloneG, negative: false, start: null, end: null,queue: null});
						//
						u = this.getIndex(u); // get u index in array
						v = this.getIndex(v); // get v index in array
						if(this.vertices[u].Johnson_d != 10000)
							if(this.vertices[u].Johnson_d + this.edges[j].weight< this.vertices[v].Johnson_d){
									this.vertices[v].Johnson_d = this.vertices[u].Johnson_d + this.edges[j].weight;
									//this.vertices[v].Johnson_prev = this.vertices[u].index;
									this.vertices[v].Johnson_color = "red";
							}
						// animate while edge is still red and after relax
						cloneG = new graph();
						cloneG.cloneGraph(this);
						myAnimation.Johnson_trip.enqueue({matrix: null, graph: cloneG, negative: false, start: null, end: null,queue: null});
						this.edges[j].Johnson_color = "black";
						this.vertices[v].Johnson_color = "white";
						//animate after finish with edge (edge is black)
						
						cloneG = new graph();
						cloneG.cloneGraph(this);
						myAnimation.Johnson_trip.enqueue({matrix: null, graph: cloneG, negative: false, start: null, end: null,queue: null});
						
					}
				}

					// check if there is negative circle
					for(j=0;j<this.edges.length;j++){// for each edge in the graph do:
						u = this.edges[j].u;
						v = this.edges[j].v;
						this.Johnsontime++;
						this.edges[j].Johnson_color = "red";
					    u = this.getIndex(u); // get u index in array
						v = this.getIndex(v); // get v index in array
						
						//animate before check and after edge is red
						cloneG = new graph();
						cloneG.cloneGraph(this);
						if(this.vertices[u].Johnson_d != 10000)
							if(this.vertices[u].Johnson_d + this.edges[j].weight< this.vertices[v].Johnson_d){
								myAnimation.Johnson_trip.enqueue({matrix: null, graph: cloneG, negative: true, start: null, end: null,queue: null});
								endflag=1;
								break;
							}else
								myAnimation.Johnson_trip.enqueue({matrix: null, graph: cloneG, negative: false, start: null, end: null,queue: null});
							else
								myAnimation.Johnson_trip.enqueue({matrix: null, graph: cloneG, negative: false, start: null, end: null,queue: null});
							
						this.edges[j].Johnson_color = "black"; // finished handling with no neg circle (for this iteration)
						cloneG = new graph();
						cloneG.cloneGraph(this);
						myAnimation.Johnson_trip.enqueue({matrix: null, graph: cloneG, negative: false, start: null, end: null,queue: null});
						
					}
					if(endflag == 1) // if we found negetive circles in this graph then immediately return!!!
						return;
					;	
					this.vertices.splice(this.n-1,1);
					for(i = this.edges.length-1; i>=0; i--){
						if(this.edges[i].u == this.n || this.edges[i].v == this.n){
						this.edges.splice(i,1);
						this.m--;
							}
						}
					this.n--;
					cloneG = new graph();
					cloneG.cloneGraph(this);
					myAnimation.Johnson_trip.enqueue({matrix: null, graph: cloneG, negative: false, start: null, end: null,queue: null});

					for(i=0;i<this.edges.length;i++){
						this.edges[i].Johnson_color= "red";
						cloneG = new graph();
						cloneG.cloneGraph(this);
						myAnimation.Johnson_trip.enqueue({matrix: null, graph: cloneG, negative: false, start: null, end: null,queue: null});
						u = this.getIndex(this.edges[i].u);
						v = this.getIndex(this.edges[i].v);
						this.edges[i].weight = this.vertices[u].Johnson_d + this.edges[i].weight - this.vertices[v].Johnson_d;
						this.edges[i].Johnson_color= "black";
						cloneG = new graph();
						cloneG.cloneGraph(this);
						myAnimation.Johnson_trip.enqueue({matrix: null, graph: cloneG, negative: false, start: null, end: null,queue: null});
					}
					let lengthMatrix = [];
						for(i=0;i<this.vertices.length;i++){
							lengthMatrix[i] = [];
							for(j=0;j<this.vertices.length;j++)
							lengthMatrix[i][j] = 10000;
								}
					for(dij=0;dij<this.vertices.length;dij++){
							//clean vertices
							for(i=0;i<this.vertices.length;i++){
								this.vertices[i].Johnson_d = 10000;
								this.vertices[i].Johnson_prev = -1;
								this.vertices[i].Johnson_color = "white";
							}
							cloneG = new graph();
							cloneG.cloneGraph(this);
							myAnimation.Johnson_trip.enqueue({matrix: null, graph: cloneG, negative: false, start: null, end: null,queue: null});
					// start Dijkstra inside Johnson
										//initialization source
										s = dij;
										source = this.vertices[s].index;
										

										lengthMatrix[s][s] = 0;
										this.vertices[s].Johnson_color = "red";
										this.vertices[s].Johnson_d = 0;
										this.vertices[s].Johnson_prev = -1;
															
										
														
										var Q = new Heap(); 	//new Heap
										for(i=0;i<this.vertices.length;i++){ // making first minimum heap
											 Q.enqueue({key:this.vertices[i].Johnson_d,index: this.vertices[i].index});
										}
										var edgeIndex;
										while (Q.isEmpty() != true){ // for each u
											//u<-head(Q)
											this.Johnsontime++;
											i=Q.extract_min();
											u=this.getIndex(i.index);
											this.vertices[u].Johnson_color="red"; 	
											for(j = 1 ; j <= this.n ; j++){ // for each vertix v
												edgeIndex=this.matrix[i.index-1][j-1];
													if (edgeIndex != -1){ //for each v=neighbour of u
														v=this.getIndex(j);
															cloneHeap = new Heap();
															cloneHeap.cloneH(Q);
															cloneG = new graph();
															cloneG.cloneGraph(this);
															cloneM = cloneMat(lengthMatrix);
															cloneG.vertices[u].Johnson_color="red";
														myAnimation.Johnson_trip.enqueue({matrix: cloneM, graph: cloneG, negative: false, start: cloneG.vertices[u], end: cloneG.vertices[v],queue: cloneHeap});
														if(this.vertices[u].index != this.vertices[v].index) this.Johnsontime++;
															if(this.vertices[u].Johnson_d + this.edges[edgeIndex].weight< this.vertices[v].Johnson_d){
																			this.vertices[v].Johnson_d = this.vertices[u].Johnson_d + this.edges[edgeIndex].weight;
																			this.vertices[v].Johnson_prev = i.index;
																			Q.changePriority(this.vertices[v].index,this.vertices[v].Johnson_d);
																			this.edges[edgeIndex].Johnson_flag = false;
																			lengthMatrix[s][v] = this.vertices[v].Johnson_d;
																			}

																		cloneHeap = new Heap();
																		cloneHeap.cloneH(Q);
																		cloneG = new graph();
																		cloneG.cloneGraph(this);
																		cloneM = cloneMat(lengthMatrix);
																		cloneG.vertices[u].Johnson_color="red";
																		myAnimation.Johnson_trip.enqueue({matrix: cloneM, graph: cloneG, negative: false, start: cloneG.vertices[v], end: cloneG.vertices[u],queue: cloneHeap});
																	}		
																}
																
																
																this.vertices[u].Johnson_color="white"; 	//color (u)<-white red
																cloneHeap = new Heap();
																cloneHeap.cloneH(Q);
																cloneG = new graph();
																cloneG.cloneGraph(this);
																cloneM = cloneMat(lengthMatrix);
																myAnimation.Johnson_trip.enqueue({matrix: cloneM, graph: cloneG, negative: false, start: cloneG.vertices[u], end: cloneG.vertices[u],queue: cloneHeap});
															}
			
					}//end Dijkstra inside Johnson
					
			}

//Johnson (End)
function cloneMat(oldm){
	let newm = [];
	for(let i=0;i<oldm.length;i++){
		newm[i] = [];
		for(j=0;j<oldm[i].length;j++)
			newm[i][j] = oldm[i][j];
	}
	return newm;
}

graph.prototype.clearAlg = function(){ // intialize graph vars & draw canvas again
	var i;
	this.directed = directed;
	for(i=0; i<this.vertices.length; i++){
		//initialization for Dijkstra
		this.vertices[i].Dijkstra_prev = -1; 			
		this.vertices[i].Dijkstra_d = 10000; 				
		
		//initialization for BellmanFord
		this.vertices[i].BellmanFord_prev = -1; 			
		this.vertices[i].BellmanFord_d = 10000; 				 
		
		//initialization for Johnson
		this.vertices[i].Johnson_prev = -1; 			
		this.vertices[i].Johnson_d = 10000; 				 
		this.vertices[i].Johnson_h = 10000; 
	}


/*	
	for(i = 0 ; i<this.edges.length ; i++){
		//initialization colors
		this.edges[i].Dijkstra_color = "black";			
		this.edges[i].BellmanFord_color = "black";
		this.edges[i].Johnson_color = "black";
	}
*/
	this.matrix = null;
	this.clearColors();
	clearInputs(mygraph);
	context.clearRect(0, 0, canvas.width, canvas.height);
	this.draw();
}

graph.prototype.clearColors = function(){
	var i;
	for(i = 0 ; i<this.vertices.length ; i++){
		this.vertices[i].color = "white";

		//for Dijkstra animation				
		this.vertices[i].Dijkstra_color = "white"; 		
		this.vertices[i].Dijkstra_animation = false; 	
		
		//for BellmanFord animation
		this.vertices[i].BellmanFord_color = "white"; 		
		this.vertices[i].BellmanFord_animation = false; 
		
		//for Johnson animation
		this.vertices[i].Johnson_color = "white"; 		
		this.vertices[i].Johnson_animation = false; 
	}
	
	for(i = 0 ; i<this.edges.length ; i++){
		this.edges[i].color = "black";
		
		//for Dijkstra animation
		this.edges[i].Dijkstra_flag = true; 				
		this.edges[i].Dijkstra_animation = false; 			
		
		//for BellmanFord animation
		this.edges[i].BellmanFord_flag = true; 				
		this.edges[i].BellmanFord_animation = false;

		//for Johnson animation
		this.edges[i].Johnson_flag = true; 				
		this.edges[i].Johnson_animation = false;
	}
	clearInputs(mygraph);
	context.clearRect(0, 0, canvas.width, canvas.height);
	this.draw();
}



/************* Follower class ************************/
function follower(x1,y1,x2,y2,cur){ 
	//start point
	this.x1 = x1;
	this.y1 = y1;
	
	//end point
	this.x2 = x2;
	this.y2 = y2;
	
	//controll point
	this.cx = (x1+x2)/2;
	this.cy = (y1+y2)/2;
	this.cx+=cur;
	this.cy+=cur;
	this.TSize = speed;
	
	
	this.curves = [];
	this.curves.push([{
			x: this.x1,
			y: this.y1
		}, {
			x: this.cx,
			y: this.cy
		}, {
			x: this.x2,
			y: this.y2
		}])
	this.points = curvePoints(this.curves,this.TSize);
	this.lengthPoints = curveByLength(this.points, 6);
	
	this.counter=0;
	
	
	this.color = "red";
	this.count = speed;
}


function step (){
if(!temp1) return; 
	clearInputs(mygraph);
	context.clearRect(0, 0, canvas.width, canvas.height);
	temp1.graph.draw();
	
	context.beginPath();
    context.arc(myFollower.x1, myFollower.y1, 5, 0, 2 * Math.PI, false);
	context.fillStyle = "red";
    context.fill();	
    context.stroke();
	context.closePath();
	
	if(myFollower.lengthPoints.length > myFollower.counter){
		myFollower.x1 = myFollower.lengthPoints[myFollower.counter].x;
		myFollower.y1 = myFollower.lengthPoints[myFollower.counter].y;
		}
	myFollower.counter++;
	follower_time = setTimeout('step()',100);
	
	myFollower.count--;
	if(myFollower.count<=0)
		clearTimeout(follower_time);
}

//********curve functions start



function controlPoints(x1,y1,x2,y2,cur){ // gets points along edge for drawing edge
	//start point
	this.x1 = x1;
	this.y1 = y1;
	
	//end point
	this.x2 = x2;
	this.y2 = y2;
	
	//controll point
	this.cx = (x1+x2)/2;
	this.cy = (y1+y2)/2;
	this.cx+=cur;
	this.cy+=cur;
	this.TSize = 500;
	
	
	this.curves = [];
	this.curves.push([{
			x: this.x1,
			y: this.y1
		}, {
			x: this.cx,
			y: this.cy
		}, {
			x: this.x2,
			y: this.y2
		}])
	this.points = curvePoints(this.curves,this.TSize);

}








// get points along Q
function QPoints(s, c, e, pointCount) {
    var points = [];
    for (var t = 0; t < pointCount; t++) {
        points.push(getQuadraticBezierXYatT(s, c, e, t / pointCount));
    }
	
    return (points);
}




function curvePoints(curves, sampleSize) { // 
    var points = [];
    for (var i = 0; i < curves.length; i++) {
        var p = curves[i];

            var pts = QPoints(p[0], p[1], p[2], sampleSize);

        points = points.concat(pts);
    }
    return (points);
}

// Q at T
function getQuadraticBezierXYatT(startPt, controlPt, endPt, T) {
    var x = Math.pow(1 - T, 2) * startPt.x + 2 * (1 - T) * T * controlPt.x + Math.pow(T, 2) * endPt.x;
    var y = Math.pow(1 - T, 2) * startPt.y + 2 * (1 - T) * T * controlPt.y + Math.pow(T, 2) * endPt.y;
    return ({
        x: x,
        y: y
    });
}
function curveByLength(points, segmentLength) {
    var lengths = []
    lengths.push(0);
    for (var i = 1; i < points.length; i++) {
        var dx = points[i].x - points[i - 1].x;
        var dy = points[i].y - points[i - 1].y;
        lengths.push(Math.sqrt(dx * dx + dy * dy));
    }
    var accumLength = segmentLength;
    var nextLength = segmentLength;
    var sPoints = [];
    sPoints.push({
        x: points[0].x,
        y: points[0].y
    });
    for (var i = 1; i < lengths.length; i++) {
        accumLength += lengths[i];
        if (accumLength >= nextLength) {
            sPoints.push({
                x: points[i].x,
                y: points[i].y
            });
            nextLength += segmentLength;
        }
    }
    return (sPoints);
	
}



//********curve functions end



/************* animation class ************************/
function animation (){ 
	this.Dijkstra_trip = new Queue(); 
	//type : {start:this.vertices[u],end:this.vertices[v]}
	
	this.BellmanFord_trip = new Queue(); // need to determine edge, only 1 color edge 
	this.Johnson_trip = new Queue(); // need to determine edge, only 1 color edge 
	//type : {start:this.vertices[u],end:this.vertices[v],edge:this.edges[edgeIndex]}
	
	this.Dijkstra_time; 
	this.BellmanFord_time; 
	this.Johnson_time;
}

var temp1 = null; 
var temp2 = null; 
var first = true; //NeedToChange Itay
function playAnimation(){ // NeedToChange Itay
		
	var flag=true;
	let k;
	if(alg == 0){ //Dijkstra
		if (!myAnimation.Dijkstra_trip.isEmpty()){		
			temp1 = myAnimation.Dijkstra_trip.dequeue();
				// update queue box
				document.getElementById("queueRight").innerHTML ="";
				for(k=0;k<temp1.queue.arr.length;k++)
				document.getElementById("queueRight").innerHTML += temp1.queue.arr[k].index+",";

			
			
			if(temp1.start.index != temp1.end.index){
				//follower - on edge
				let edgeIndex=temp1.graph.matrix[temp1.start.index-1][temp1.end.index-1];
				if(edgeIndex == -1)
						edgeIndex=temp1.graph.matrix[temp1.end.index-1][temp1.start.index-1];
				myFollower = new follower(temp1.start.x,temp1.start.y,temp1.end.x,temp1.end.y,temp1.graph.edges[edgeIndex].curve);
				step();
			
			}else { // else this is last trip for this vertex
				flag=false;
				//update vertex color
				temp1.start.Dijkstra_color = "red"; 
				temp1.start.Dijkstra_animation = true;
				myAnimation.Dijkstra_time = setTimeout('playAnimation()',200);
				
				if (first && !myAnimation.Dijkstra_trip.isEmpty())
					first = false;
				

			}
			
		}else{ // else finished animation no more trip
			//update last vertex color
			temp1.start.Dijkstra_color = "red"; 
			temp1.start.Dijkstra_animation=true;
			
			clearInputs(mygraph);
			context.clearRect(0, 0, canvas.width, canvas.height);
			temp1.graph.draw();
			temp1.start.Dijkstra_color = "white"; 
			document.getElementById("Dijkstrat").value=temp1.graph.getDijkstratime();
		}
		
		document.getElementById("BellFot").value=mygraph.getBellmanFordtime();
		document.getElementById("Johnsont").value=mygraph.getJohnsontime();
	}
	else if(alg == 1){ // BellmanFord
		if(document.querySelector("#BellmanFordProgress") == null) document.querySelector("#choosenAlgo").innerHTML+='<br><span id="BellmanFordProgress"></span>';
			if (!myAnimation.BellmanFord_trip.isEmpty()){		
			temp1 = myAnimation.BellmanFord_trip.dequeue();
			clearInputs(mygraph);
			context.clearRect(0, 0, canvas.width, canvas.height);
			temp1.graph.draw();
			document.querySelector("#BellmanFordProgress").innerHTML ='Algorithm Progress: '+temp1.graph.getBellmanFordtime()+'/'+mygraph.getBellmanFordtime();
			document.getElementById("BellFot").value=temp1.graph.getBellmanFordtime();
			if(temp1.negative == true){
						document.querySelector("#choosenAlgo").innerHTML+='<br><span style="color: red"> Graph illegal! it has negative circles</span>';
						clearTimeout(myAnimation.BellmanFord_time);
						return;	
				}						
			}
	}
		else if(alg == 2){ // Johnson
				if(document.querySelector("#JohnsonProgress") == null) document.querySelector("#choosenAlgo").innerHTML+='<br><span id="JohnsonProgress"></span>';
					if (!myAnimation.Johnson_trip.isEmpty()){		
						temp1 = myAnimation.Johnson_trip.dequeue();
								if(temp1.start == null){
													drawLenMat(temp1.matrix);
													clearInputs(mygraph);
													context.clearRect(0, 0, canvas.width, canvas.height);
													temp1.graph.draw();
													document.getElementById("Johnsont").value=temp1.graph.getJohnsontime();
													document.querySelector("#JohnsonProgress").innerHTML ='Algorithm Progress: '+temp1.graph.getJohnsontime()+'/'+mygraph.getJohnsontime();

													if(temp1.negative == true){
																document.querySelector("#choosenAlgo").innerHTML+='<br><span style="color: red"> Graph illegal! it has negative circles</span>';
																clearTimeout(myAnimation.Johnson_time);
																return;	
														}	
								}else{
									
									//*****
																				// update queue box
												document.getElementById("queueRight").innerHTML ="";
												for(k=0;k<temp1.queue.arr.length;k++)
												document.getElementById("queueRight").innerHTML += temp1.queue.arr[k].index+",";

											
											
											if(temp1.start.index != temp1.end.index){
												//follower - on edge
												let edgeIndex=temp1.graph.matrix[temp1.start.index-1][temp1.end.index-1];
												if(edgeIndex == -1)
														edgeIndex=temp1.graph.matrix[temp1.end.index-1][temp1.start.index-1];
												myFollower = new follower(temp1.start.x,temp1.start.y,temp1.end.x,temp1.end.y,temp1.graph.edges[edgeIndex].curve);
												step();
											
											}else { // else this is last trip for this vertex
												flag=false;
												//update vertex color
												temp1.start.Johnson_color = "white"; 
												temp1.start.Johnson_animation = true;
												myAnimation.Johnson_time = setTimeout('playAnimation()',200);
												
												if (first && !myAnimation.Johnson_trip.isEmpty())
													first = false;
												

											}
									//*****
								}														
						}else{ // else finished animation no more trip
							//update last vertex color
							temp1.start.Johnson_color = "red"; 
							temp1.start.Johnson_animation=true;
							drawLenMat(temp1.matrix);				
							clearInputs(mygraph);
							context.clearRect(0, 0, canvas.width, canvas.height);
							temp1.graph.draw();
							temp1.start.Johnson_color = "white"; 
							document.querySelector("#JohnsonProgress").innerHTML ='Algorithm Progress: '+temp1.graph.getJohnsontime()+'/'+mygraph.getJohnsontime();
							document.getElementById("Johnsont").value=temp1.graph.getJohnsontime();
								}
	}
	
	
	if (alg == 0 && !myAnimation.Dijkstra_trip.isEmpty() && flag) // last trip for not last vertex
		myAnimation.Dijkstra_time = setTimeout('playAnimation()',speed*100);
	else if(alg == 1 && !myAnimation.BellmanFord_trip.isEmpty() && flag)
			myAnimation.BellmanFord_time = setTimeout('playAnimation()',speed*100);
	else if(alg == 2 && !myAnimation.Johnson_trip.isEmpty() && flag) 
			myAnimation.Johnson_time = setTimeout('playAnimation()',speed*100);

	if(alg == 2){
		drawLenMat(temp1.matrix);
		document.getElementById("Johnsont").value=temp1.graph.getJohnsontime();
		document.querySelector("#JohnsonProgress").innerHTML ='Algorithm Progress: '+temp1.graph.getJohnsontime()+'/'+mygraph.getJohnsontime();
	}
	clearInputs(mygraph);
	context.clearRect(0, 0, canvas.width, canvas.height);
	if(temp1 == null)
		mygraph.draw();
	else{
		temp1.graph.draw();
		if(alg == 0)
			document.getElementById("Dijkstrat").value=temp1.graph.getDijkstratime();
	}
	
}

function drawLenMat(mat) {
	let lenmat,table,tr,td,u,v;
	
	if((lenmat=document.getElementById("lengthMatrix")) == null){
	        lenmat = document.createElement("div");
			lenmat.id = "lengthMatrix";
			lenmat.style.overflow = "scroll";
			document.body.appendChild(lenmat);
			lenmat.style.backgroundColor = "white";
			lenmat.style.width = "850px";
			lenmat.style.marginLeft = "auto";
			lenmat.style.marginRight = "auto";
			lenmat.style.border = "1px black"
			//create table
			table = document.createElement("table");
			table.style.width = "100%";
			table.style.border = "1px solid black";
			lenmat.appendChild(table);
			
			tr = document.createElement("tr");
			tr.style.border = "1px solid black";
			table.appendChild(tr);
			td = document.createElement("td");
			td.style.border = "1px solid black";
			tr.appendChild(td);
			td.innerHTML = "&nbsp";
			for(i=0;i<mygraph.vertices.length;i++){
							td = document.createElement("td");
							td.style.border = "1px solid black";
							tr.appendChild(td);
							td.innerHTML = "<b><center>"+mygraph.vertices[i].index+"</center></b>";
			}
			//create tr
			for(i=0;i<mygraph.vertices.length;i++){
					tr = document.createElement("tr");
					tr.style.border = "1px solid black";
					table.appendChild(tr);
					td = document.createElement("td");
					td.style.border = "1px solid black";
					tr.appendChild(td);
					td.innerHTML = "<b><center>"+mygraph.vertices[i].index+"</center></b>";
					for(j=0;j<mygraph.vertices.length;j++){
							//create td
							td = document.createElement("td");
							td.style.border = "1px solid black";
							td.id = mygraph.vertices[i].index+"to"+ mygraph.vertices[j].index;
							tr.appendChild(td);
							td.innerHTML = "\u221E";
					}
			}
	}else{
		if(mat == null) return;
		for(i=0;i<mygraph.vertices.length;i++){
			for(j=0;j<mygraph.vertices.length;j++){
				u = mygraph.getIndex(mygraph.vertices[i].index);
				v = mygraph.getIndex(mygraph.vertices[j].index);
				let neww = mat[i][j];
				if(neww == 10000) neww = "\u221E";
				document.getElementById(mygraph.vertices[i].index+"to"+mygraph.vertices[j].index).innerHTML = neww;
			}
		}
	}
}
/************************** animation speed**************************/
function speedUp(){
	if(speed>=10){
		speed=speed-5;
		document.getElementById("speed").value=50-speed;
	}
}

function slowDown(){
	if(speed<=45){
		speed=speed+5;
		document.getElementById("speed").value=50-speed;
	}
}


/*******************  canvas drawings ***********************************/
function drawVertex(i,data1,data2,x, y,color) { 
//need to add text
   	var centerX = x;
    var centerY = y;

	context.beginPath();
	context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
	context.fillStyle = color;
	context.fill();
	context.lineWidth = 1;
	context.strokeStyle = '#003300';
	context.stroke();
	context.closePath();

	context.font = '12pt Calibri';
	if (color == "white")
		context.fillStyle = 'black';
	else
		context.fillStyle = 'white';
	context.fillText(i, x-(radius/5), y-10);
	if (data1 != null){ // if there is a d value
			if (data1!=10000){ // != infinity
					context.fillText("d="+data1, x-(radius/2), y+5);
			}else
				context.fillText("d="+"\u221E", x-(radius/2), y+5); // String.fromCharCode(65);		
	}
	if (data2 != null){
		if (data2 != -1)
			context.fillText("\u03c0="+data2, x-(radius/2), y+20);
	}
}

function drawEdge(x1,y1,x2,y2,color,inm,eweight,curveY) {
		
      	context.beginPath();
      	context.moveTo(x1,y1);
		let bx = (x1+x2)/2;
		let by = (y1+y2)/2;
		by+=curveY;
		bx+=curveY;
		context.quadraticCurveTo(bx, by, x2, y2); // draw edge from (x1,y1) through control point (bx,by) to (x2,y2)
		context.strokeStyle = color;
      	context.stroke();
		var ix1=(x2+x1)/2;
		var iy1=(y2+y1)/2;
		let tempe = new controlPoints(x1,y1,x2,y2,curveY);
		let wlen = Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1)); // dis from (x1,y1) to (x2,y2)
		let preservX2 = x2;
		let preservY2 = y2;
	if (directed == true){
			let ax,ay;
			
			for(let i=0;i<tempe.points.length;i++){ // find the right coordinats to draw the arrow to vertex
				let plen = Math.sqrt((tempe.points[i].x-x2)*(tempe.points[i].x-x2)+(tempe.points[i].y-y2)*(tempe.points[i].y-y2)); // dis from this dot to (x2,y2)
				if(plen<radius){
						ax = tempe.points[i].x;
						ay = tempe.points[i].y;
						break;
					}
				}
				
			//var dx = bx-x2; //x1 to bx
			//var dy = by-y2; //y1 to by
			var dx = ax-x2; //x1 to bx
			var dy = ay-y2; //y1 to by
			var length = Math.sqrt(dx*dx + dy*dy);

			x1 = x1 - Math.round(dx/((length/(radius))));
			y1 = y1 - Math.round(dy/((length/(radius))));
			x2 = x2 + Math.round(dx/((length/(radius))));
			y2 = y2 + Math.round(dy/((length/(radius))));


			// calculate the angle of the edge
			var deg = (Math.atan(dy/dx)) *180.0 / Math.PI;
			if (dx < 0) { deg += 180.0; }
			if (deg < 0) { deg += 360.0; }
			// calculate the angle for the two triangle points
			var deg1 = ((deg+25+90)%360)* Math.PI*2 / 360.0;
			var deg2 = ((deg+335+90)%360)* Math.PI*2 / 360.0;
			// calculate the triangle points


		var arrowx = [];
		var arrowy = [];
			arrowx[0] = x2;
			arrowy[0] = y2;
			arrowx[1] = Math.round(x2+12*Math.sin(deg1));
			arrowy[1] = Math.round(y2-12*Math.cos(deg1));
			arrowx[2] = Math.round(x2+12*Math.sin(deg2));
			arrowy[2] = Math.round(y2-12*Math.cos(deg2));

		 
		
		context.beginPath();
		context.moveTo(arrowx[0], arrowy[0]);
		context.lineTo(arrowx[1], arrowy[1]);
		context.lineTo(arrowx[2], arrowy[2]);
		context.strokeStyle = color;
		context.closePath();
		

		
		
		
		// the outline
		
		context.stroke();

		// the fill color
		context.fillStyle = color;
		context.fill();
	}
	let weightx,weighty,i;
	for(i=0;i<tempe.points.length;i++){
		
		let boxToEnd = Math.sqrt((tempe.points[i].x-preservX2)*(tempe.points[i].x-preservX2)+(tempe.points[i].y-preservY2)*(tempe.points[i].y-preservY2)); // dis from this dot to end destination (x2,y2) 
		if(boxToEnd < (wlen/2)){
			if(i+30<tempe.points.length){
				weightx = tempe.points[i+30].x;
				weighty = tempe.points[i+30].y;
			}else{
				weightx = tempe.points[i].x;
				weighty = tempe.points[i].y;
			}
			break;
		}
	}
	

let weight = document.createElement("input");
		weight.style.display = 'block';
		weight.style.position = 'absolute';
		weight.style.left = weightx+'px';
		weight.style.top = weighty+'px';
		weight.style.width = '20px';
		weight.maxLength='3';
		weight.id = inm;
		weight.value = eweight;
		weight.className = "inputWeight";
		//weight.style.zIndex='2';
		contentContainer.appendChild(weight);

 }

/**************************** main **************************************/
var radius = 30;
var container = document.getElementById("contentContainer");
var canvas = document.getElementById("canvas");
var vertexMenu = document.getElementById("vertexMenu");
var context = canvas.getContext("2d");
var mygraph = new graph();
var winputs = [];


 vertexMenu.style.display = 'none';

canvas.onmousedown = getClickPosition;
canvas.onmouseup = getMouseUpPosition;
canvas.onmousemove = drag;

var dragging  = false;
var hitVertex;
var coords;
var idleMouseUp = false;
var showingVertexMenu = false;
var draggingVertex = false;


//for algorithms
var source = -1;
var sourceFlag = false;
var time = 0;
var directed = true;
var alg = -1; //(-1)-no algorithm ,0-Dijkstra, 1-BellmanFord, 2-Johnson

var speed = 20;
var myAnimation=null;
var myFollower;

/*************************** general functions *************************************/
function drag(e){

	var parentPosition = getPosition(e.currentTarget);
    var xPosition = e.offsetX;
    var yPosition = e.offsetY;
	
	if (dragging){
		clearInputs(mygraph);
		context.clearRect(0, 0, canvas.width, canvas.height);
		context.beginPath();
		context.moveTo(coords.x,coords.y);
		context.lineTo(xPosition, yPosition);
		context.stroke();

		mygraph.draw();
		return;
	}
	else if (draggingVertex){
		mygraph.vertexPosition(hitVertex, xPosition, yPosition);
		
		clearInputs(mygraph);
		context.clearRect(0, 0, canvas.width, canvas.height);
		mygraph.draw();
	}
}

function getClickPosition(e){
/*
document.addEventListener("contextmenu", function(e){
    e.preventDefault();
}, false);*/

	if (showingVertexMenu){
		return;
	}

	if(draggingVertex){
		draggingVertex = false;
		idleMouseUp = true;
		return;
	}
	var parentPosition = getPosition(e.currentTarget);
	var xPosition = e.offsetX;
	var yPosition = e.offsetY;

	hitVertex = mygraph.inVertex(e.offsetX,e.offsetY); // check if we hit an existing vertex (-1 if not)
	if (hitVertex == -1){
		idleMouseUp = true;
		//mygraph.addVertex(xPosition,yPosition, "white");
		mygraph.addVertex(e.offsetX,e.offsetY,"white");
		clearInputs(mygraph);
		context.clearRect(0, 0, canvas.width, canvas.height);
		mygraph.draw();
	}
	else {
		coords = mygraph.getCoords(hitVertex);
		dragging = true;
	}
}

function getMouseUpPosition(e){
	dragging = false;
	if (showingVertexMenu){
		hideVertexMenu();
		return;
	}

	if (idleMouseUp){ // if we just drew a vertex
		idleMouseUp = false;
		return;
	}

	var parentPosition = getPosition(e.currentTarget);
	var xPosition = e.offsetX;
	var yPosition = e.offsetY;

	var hit = mygraph.inVertex(xPosition,yPosition);// get position where released click
	// hit = position where released click (vertex index), hitVertex = position where we hit click (vertex index)
	if (hit > -1){// if we hit a vertex
		if(hit!=hitVertex) {// if we didnt hit and release on same vertex (draw edge)
			clearInputs(mygraph);
	 		context.clearRect(0, 0, canvas.width, canvas.height);
			mygraph.addEdge(hitVertex,hit);
			let iin = document.querySelectorAll(".inputWeight");
			document.getElementById(iin[iin.length-1].id).focus();
			//mygraph.draw(); ---deleted Itay
		}
		else{
			showVertexMenu(xPosition,yPosition);
		}
	}
	else{
		
		clearInputs(mygraph); ///------------------------
		context.clearRect(0, 0, canvas.width, canvas.height);
		mygraph.draw();
	}
}

function showVertexMenu(x,y){
	showingVertexMenu = true;
	vertexMenu.style.display = 'block';
	vertexMenu.style.position = 'absolute';
	vertexMenu.style.left = x +  'px';
	vertexMenu.style.top = y +  'px';
}

function getPosition(element) {
   	var xPosition = 0;
   	var yPosition = 0;

   	while (element) {
		xPosition += (element.offsetLeft - element.scrollLeft + element.clientLeft);
		yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
		element = element.offsetParent;
   	}
   	return { x: xPosition, y: yPosition };
}

function clearAll(){
	alg=-1;
	document.getElementById("queueRight").innerHTML ="";
	document.querySelector("#choosenAlgo").innerHTML="Choose an algorithm...";
	document.querySelector("#algorithm").value="Choose an algorithm";
	clearInputs(mygraph);
	context.clearRect(0, 0, canvas.width, canvas.height);
	sourceFlag = false;
	mygraph.clearAll();
}

function moveVertex(){
    
	draggingVertex = true;
	hideVertexMenu();
}

function removeVertex(){

	hideVertexMenu();
	mygraph.deleteVertex(hitVertex);
	clearInputs(mygraph);
	context.clearRect(0, 0, canvas.width, canvas.height);
	mygraph.draw();
}

function cancel(){
	hideVertexMenu();
}

function hideVertexMenu(){
	vertexMenu.style.display = 'none';
	showingVertexMenu = false;
}

function randomGraphPos(){


	clearAll();
	
	var graphSize = parseInt(document.getElementById("inputSize").value);
	var graphDensity = parseInt(document.getElementById("inputDensity").value);

	if((graphSize < 0) || (graphSize > 50) || isNaN(graphSize) )
	{ graphSize = 10; }
	if( (graphDensity < 0) || (graphDensity > 100) ||  isNaN(graphDensity))
	{ graphDensity = 10; }

	var x = 0;
	var y = 0;

	var col,box;
	col = Math.ceil(Math.sqrt(graphSize/2)); // number of vertices in a column;
	box  = Math.ceil(canvas.width / (col*2+1)); // size of box;

	var i,j,score,offset;

	for(i=0; i<col; i++){
		for(j=0; j<col*2; j++){

			offset = Math.round((Math.random()-0.5)*(box/2)) ;
			x = (box*j + box/2 + offset);
			offset = Math.round((Math.random()-0.5)*(box/2)) ;
			y = box*i + box/2 + offset;
			mygraph.addVertex(x,y,"white"); 
			if (mygraph.n == graphSize) break;
		}
		if (mygraph.n == graphSize) break;
	}
	let w,wClass;

	for(i = 1; i<=mygraph.n; i++)
		for(j=1; j<i; j++){
			score = Math.random();
			if(score <= graphDensity/100 ){
				mygraph.addEdge(i,j);
				
				}
	}
	
	wClass = document.querySelectorAll(".inputWeight");
	for(i=0;i<wClass.length;i++){
			w = Math.floor((Math.random() * 100) + 1); //random number 1-100
			wClass[i].value = w;
	}
	// added Itay - cleaning canvas

	clearAlg();
	clearInputs(mygraph);
	context.clearRect(0, 0, canvas.width, canvas.height);
	//
	mygraph.draw();
}


function randomGraphNeg(){


	clearAll();
	
	var graphSize = parseInt(document.getElementById("inputSize").value);
	var graphDensity = parseInt(document.getElementById("inputDensity").value);

	if((graphSize < 0) || (graphSize > 50) || isNaN(graphSize) )
	{ graphSize = 10; }
	if( (graphDensity < 0) || (graphDensity > 100) ||  isNaN(graphDensity))
	{ graphDensity = 10; }

	var x = 0;
	var y = 0;

	var col,box;
	col = Math.ceil(Math.sqrt(graphSize/2)); // number of vertices in a column;
	box  = Math.ceil(canvas.width / (col*2+1)); // size of box;

	var i,j,score,offset;

	for(i=0; i<col; i++){
		for(j=0; j<col*2; j++){

			offset = Math.round((Math.random()-0.5)*(box/2)) ;
			x = (box*j + box/2 + offset);
			offset = Math.round((Math.random()-0.5)*(box/2)) ;
			y = box*i + box/2 + offset;
			mygraph.addVertex(x,y,"white");
			if (mygraph.n == graphSize) break;
		}
		if (mygraph.n == graphSize) break;
	}
	let w,wClass;

	for(i = 1; i<=mygraph.n; i++)
		for(j=1; j<i; j++){
			score = Math.random();
			if(score <= graphDensity/100 ){
				mygraph.addEdge(i,j);
				
				}
	}
	
	wClass = document.querySelectorAll(".inputWeight");
	for(i=0;i<wClass.length;i++){
			w = Math.floor((Math.random() * 100) -49); //random number -49 - 50
			wClass[i].value = w;
	}
	// added Itay - cleaning canvas

	clearAlg();
	clearInputs(mygraph);
	context.clearRect(0, 0, canvas.width, canvas.height);
	//
	mygraph.draw();
}



/*************************** algorithms *************************************/
function chooseS(){
	hideVertexMenu();
	source=hitVertex;
	sourceFlag = true;
	mygraph.rstDijkstratime();   
	mygraph.rstBellmanFordtime(); 
	mygraph.rstJohnsontime();
	clearAlg();
	
}

//add
function play(){ 
	
	var s=source;
	if (mygraph.isEmpty() == true) return; //graph is empty?
	
	clearAlg(); //restart
	let notf;


	if (s!=-1)  //set source
		source=s;
	else
		source=1;
	
	//algorithm
	if (document.getElementById("algorithm").value=="Dijkstra"){
		alg=0;
			document.querySelector("#choosenAlgo").innerHTML="Dijkstra";
		}
	else if (document.getElementById("algorithm").value=="Bellman-Ford"){
			alg=1;
			document.querySelector("#choosenAlgo").innerHTML="Bellman-Ford";
			}
	else if (document.getElementById("algorithm").value=="Johnson"){
			alg=2;	
			document.querySelector("#choosenAlgo").innerHTML="Johnson";
			}
	else { //else we still in Choose an algorithm
			// just return
			document.querySelector("#choosenAlgo").innerHTML="Choose an algorithm...";
			return;
	}
			
	//directed
	if (document.getElementById("type").value=="directed")
		directed = true;
	else 
		directed = false;
		
	//update matrix 
	mygraph.creatMatrix();
	myAnimation = new animation();

	
	if (alg == 0) // Call Dijkstra
		mygraph.Dijkstra();
	else if (alg == 1) // Call BellmanFord
		mygraph.BellmanFord();
	else if (alg == 2) // Call Johnson
		mygraph.Johnson();
		
	
	mygraph.clearColors();
	playAnimation();
}

function clearAlgOnClick(){
	document.querySelector("#choosenAlgo").innerHTML="Choose an algorithm...";
	document.querySelector("#algorithm").value="Choose an algorithm";
	document.getElementById("queueRight").innerHTML ="";
	sourceFlag=false;
	clearAlg();
	mygraph.rstDijkstratime();   
	mygraph.rstBellmanFordtime(); 
	mygraph.rstJohnsontime();
}

function clearAlg(){ 
	alg=-1;
	document.getElementById("Dijkstrat").value=0;
	document.getElementById("BellFot").value=0;
	document.getElementById("Johnsont").value=0;
	if(document.getElementById("lengthMatrix") != null){
		document.body.removeChild(document.getElementById("lengthMatrix"));
	}
	
	if(myAnimation!=null){
		clearTimeout(myAnimation.Dijkstra_time); 
		clearTimeout(myAnimation.BellmanFord_time); 
		clearTimeout(myAnimation.Johnson_time); 
	}
	temp1 = null;
	temp2 = null;
	first = true;
	myAnimation=null;
	myFollower=null;
	//directed
	if (document.getElementById("type").value=="directed")
		directed = true;
	else 
		directed = false;

	time = 0;
	if (sourceFlag == false)
		source = -1;
	mygraph.clearAlg();
}

function clearInputs(el){
	//updating weight at graph Object and deleting them from canvas
	let weights = document.querySelectorAll(".inputWeight");

	for(let i=0;i<weights.length;i++){
		winput = document.getElementById(i);
		if(i<el.edges.length)
			el.updateWeight(parseInt(winput.value),i);
		contentContainer.removeChild(weights[i]);
	}
}
function changeType(){ // changing edges type
		clearAlg();
		clearInputs(mygraph);
		context.clearRect(0, 0, canvas.width, canvas.height);
if(document.getElementById("type").value == "digraph"){
 
		for(let i=0;i<mygraph.edges.length;i++){
				for(let j=0;j<mygraph.edges.length;j++){
						if(mygraph.edges[j].u == mygraph.edges[i].v && mygraph.edges[j].v == mygraph.edges[i].u){ // if exists other direction edge
						        
								mygraph.edges.splice(j,1);// cut this j edge from mygraph 
						}
				}
		
		}
		}

		mygraph.draw();
}


