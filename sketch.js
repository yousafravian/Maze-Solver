$('#btn-click').click(()=>{
	loop();
})

let maze1 = [
  //0
          [9,1],
        //1
         [0,10],
          //2
         [11,3],
  //3
         [2,4,12],
     //4
          [3,13],
  //5
         [6,14],
  //6
         [5,7,15],
  //7
         [6,8],
  //8
         [7],
  
  
  
         //9
         [0,18],
         //10
         [1,11,19],
         //11
         [2,10],
         //12
         [3],
         //13
         [4,14],
         //14
         [5,13,23],
         //15
         [6,24],
         //16
         [17,25],
         //17
         [16,26],
         
         
         
         
         
         
         
         //18
         [9,27],
         //19
         [10,20,28],
         //20
         [19,21],
         //21
         [20,30],
         //22
         [31,23],
         //23
         [14,22,32],
         //24
         [15,33],
         //25
         [16],
         //26
         [17,35],
         
         
         //27
         [18],
         //28
         [19,29],
         //29
         [28],
         //30
         [21,39],
         //31
         [22,40],
         //32
         [23],
         //33
         [24,34],
         //34
         [33,43],
         //35
         [26,44],
         
         
         
         
         
         //36
         [37,45],
         //37
         [36,38],
         //38
         [37,39,47],
         //39
         [30,38],
         //40
         [31],
         //41
         [42,50],
         //42
         [41,43],
         //43
         [34,42],
         //44
         [35,53],
         
         
         
         
         
         //45
         [36,54],
         //46
         [47],
         //47
         [38,46,48],
         //48
         [47],
         //49
         [58,50],
         //50
         [49,41,59],
         //51
         [52,60],
         //52
         [61,51],
         //53
         [62,44],
         
         
         
         
         
         //54
         [45,55,63],
         //55
         [54,56],
         //56
         [55,57],
         //57
         [56,66],
         //58
         [49,67],
         //59
         [50],
         //60
         [51,69],
         //61
         [52,62],
         //62
         [53,71,61],
         
         
         
         
         
         
         //63
         [72,54],
         //64
         [73],
         //65
         [74,66],
         //66
         [65,57],
         //67
         [58,68],
         //68
         [67,77],
         //69
         [60,70],
         //70
         [69,79],
         //71
         [62,80],
         
         
         
         
         
         
         
         
         //72
         [63,73],
         //73
         [72,64],
         //74
         [65,75],
         //75
         [74,76],
         //76
         [75],
         //77
         [68,78],
         //78
         [77,79],
         //79
         [78,70],
         //80
         [71],
        
        
        
        
        
        ]
var cols,rows;
var w=100;
var grid = [];
var current;
var path;
var z = 0;
var start= 72;
var end  =25;
var mazeData;
function setup() {
  noLoop();
  start = parseInt(prompt("Enter Starting Cell (0-80)", "0"));
  end = parseInt(prompt("Enter End Cell (0-80)", "79"));
  createCanvas(900,900);
  frameRate(2);
  cols = floor(width/w);
  rows = floor(height/w);
  for (var j = 0;j<rows;j++){
    for(var i = 0;i < cols;i++){
      var cell = new Cell(i,j);
      grid.push(cell);
    }
  }
  
  path = R_Solve(maze1, start,end);
  
  path.reverse()
  // Draw Maze
  for(var j =0;j< 81;j++){
    for(var k = 0 ; k< maze1[j].length;k++){
      //Top
      console.log(maze1[j][k])
      if(maze1[j][k] == j-9){
        grid[j].walls[0] = false;
      }
      if(maze1[j][k] == j+1){
        grid[j].walls[1] = false;
      }
      if(maze1[j][k] == j+9){
        grid[j].walls[2] = false;
      }
      if(maze1[j][k] == j-1){
        grid[j].walls[3] = false;
      }
    }
  }
}
function draw() {
  background(51);
  // clear();
  for(var i = 0;i < grid.length;i++){
    grid[i].show();
  }
  if (z < path.length){
    this.grid[path[z]].visited = true;
    // console.log(path[z] + ":" + end);
    if(path[z] == start){
       // console.log('Start at' + z);
       grid[start].isStart = true;
    }else if(path[z] == end){
       // console.log('End at' + z);
       grid[end].isEnd = true;
    }
    z++;
  }
 
  
}
function Cell(i,j){
  
  this.i = i;
  this.j = j;
  // Top,Right,Bottom,Left
  this.walls = [true,true,true,true]
  this.visited = false;
  this.isStart= false;
  this.isEnd = false;
  this.show = function(){
    var x = this.i*w;
    var y = this.j*w;
    let w_ = 0;
    stroke(255);
    noFill();
    // rect(x,y,w,w)
    if(this.walls[0]) line(x  ,y  ,x+w,y)
    if(this.walls[1]) line(x+w,y  ,x+w,y+w)
    if(this.walls[2]) line(x+w,y+w,x  ,y+w)
    if(this.walls[3]) line(x  ,y+w,x  ,y)
    if(this.visited){
      stroke(255,0,255);
      fill(255,0,255,50);
      rect(x+10,y+10,w-20,w-20);
      // circle(x+20,y+20,w-10)
    }
    if(this.isStart){
      stroke(255,0,0);
      fill(255,0,0,50);
      rect(x+10,y+10,w-20,w-20);
      // circle(x+20,y+20,w-10)
    }
    if(this.isEnd){
      stroke(0,255,255);
      fill(0,255,0,50);
      rect(x+10,y+10,w-20,w-20);
      stroke(0,0,0);
      // circle(x+20,y+20,w-10)
    }
  }
}
function MazeSolver(maze, start, finish, visited, path){
    if (start === finish) {
        path.push(start);
        return true;
    }
    visited.push(start);
    for (var i = 0; i < maze[start].length; i++) {
        if (!contains(visited, maze[start][i])) {
            if (MazeSolver(maze, maze[start][i], finish, visited, path)) {
                path.push(start);
                return true;
            }
        }
    }
    return false;
}
function R_Solve(maze, start, finish) {
    var visited = new Array();
    var solution_path = new Array();
    MazeSolver(maze, start, finish, visited, solution_path);
    // console.log('Solver called');
    return solution_path;
}
function contains(visited, val) {
    var found = false;
    visited.forEach(function (value) {
        // console.log("Compare- " + value + ':' + val)
        if (value == val) {
            // console.log("Compared True")
            found = true;
        }
    });
    return found;
}