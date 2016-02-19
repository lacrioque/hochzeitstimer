/* global angular, StatusBar, cordova */
angular.module('hochzeitstimer.controllers', [])

.controller('DashCtrl', function($scope, $interval) {
    var getTime = function(){return new Date().getTime()},
        finalTermin = new Date(2016,6,16,15,30,0).getTime(),
        zwischenTermin = new Date(2016,6,9,16,0,0).getTime(),
        getClockObj = function(time){
          var d = Math.floor(time/(1000*60*60*24)),
              h = Math.floor((time/(1000*60*60))%24),
              m = Math.floor((time/(1000*60))%60),
              s = Math.floor((time/1000)%60),
              returnObj =  {t: d, h: h, m: m, s: s};
              return returnObj;
        };
        
        $interval(function(){
          var now = getTime(),
              diffToZwischen = zwischenTermin - now,
              diffToFinal = finalTermin - now;
             
          $scope.time = now;
          $scope.diffToZwischen = getClockObj(diffToZwischen);
          $scope.diffToFinal = getClockObj(diffToFinal);
          
        },999);
        
})

.controller('todoCtrl', function($scope, todoService) {
  var getTodos = function(){
    var todos = todoService.getAll();
    $scope.todos = todos;
 };
  $scope.todoForm = {
    title : "",
    body : ""
  }
  
  $scope.remove = function(item) {
    todoService.remove(item);
    getTodos();
  };
  $scope.toggleDone = function(){
    this.todo.done = !this.todo.done;
    todoService.toggleDone(this.todo.id);
  };
  $scope.add = function(){
    
    var newTodo = {
      title :  $scope.todoForm.title,
      body :  $scope.todoForm.body,
      time : new Date().getTime(),
      done : false
    }
    todoService.add(newTodo);
    getTodos();
    $scope.todoForm.title = "";
    $scope.todoForm.body = "";
  };
  getTodos();
})


.controller('cominghomeCtrl', function($scope, comingHomeServ) {
  $scope.comingHomeObj = comingHomeServ.getComingHome;
  $scope.changeCHstate = comingHomeServ.changeComingHome;
});
