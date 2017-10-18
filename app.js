var App = angular.module('Scripture App', []);
var depthStack = [];
var stdWorks_JSON = "";


App.controller('MainController', function($scope, $http) {

  $scope.stdWorks = [
      "Old Testament",
      "New Testament",
      "Book of Mormon",
      "Doctrine and Covenants",
      "Pearl of Great Price"];

  $scope.chapterOpenBool = function(){
    if($scope.chapter == ""){
      return true;
    }
    return false;
  }



  $scope.stackDepthQuery = function(num){
    //console.log("NUM: " + num + " STACKLENGTH: " + depthStack.length);
    if(num != depthStack.length){
      //console.log("TRUE");
      return false;
    }
    else {
      //console.log("FALSE");
      return true;
    }
  }

  function updateSidebar(id){
    console.log("LENGTH: " + depthStack.length);
    console.log("STACK: " + depthStack);
    if(depthStack.length == 0){
      if(id == 0){
        stdWorks_JSON = "old-testament.json";
      } else if(id == 1){
        stdWorks_JSON = "new-testament.json";
      } else if(id == 2){
        stdWorks_JSON = "book-of-mormon.json";
      } else if(id == 3){
        stdWorks_JSON = "doctrine-and-covenants.json";
      } else if(id == 4){
        stdWorks_JSON = "pearl-of-great-price.json";
      }
      $http.get(stdWorks_JSON)
      .success(function(data){
         $scope.books = data.books;
       });
    }

    else if(depthStack.length == 1){

      var top = depthStack[depthStack.length];
      $http.get(stdWorks_JSON)
      .success(function(data){
        if(typeof id !== 'undefined'){

          $scope.bookChapters = data.books[id].chapters;
        }
      });
    }
    else if(depthStack.length == 2){
      $scope.chapter = "";
      var top = depthStack[depthStack.length-1];
      $http.get(stdWorks_JSON)
      .success(function(data){
        $scope.chapter = data.books[top].chapters[id].verses;
        console.log(data.books[top].chapters[id].verses);
      });
    }
  }




  $scope.navUpSidebar = function(){
    console.log("STACK: " + depthStack);
    if(depthStack.length != 0){
      $scope.chapter = "";
      $scope.bookChapters ="";
      depthStack.pop(); //Pops off the top level
    } else {
      stdWorks_JSON = "";
    }
    updateSidebar();

  };

  $scope.navInSidebar = function(id){
    updateSidebar(id);
    if(depthStack.length < 2){
      depthStack.push(id);
    }
  };
});


App.controller('MainText', function($scope, $http) {

  function updateMainText(id){
    console.log("DUBZ");
    if(depthStack.length == 2){
      var top = depthStack[depthStack.length-1];
      $http.get(stdWorks_JSON)
      .success(function(data){
        $scope.chapter = data.books[top].chapters[id].verses;
       });
    }
  }

});
