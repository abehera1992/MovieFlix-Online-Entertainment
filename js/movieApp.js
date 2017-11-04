
  var titleApp = angular.module('titleApp', ['ngRoute', 'ui.bootstrap', 'ui.toggle', 'ngFileUpload', 'angularModalService']);

  titleApp.controller("titleController", ['$scope', 'Upload', '$http', 'ModalService', function($scope,Upload,$http,ModalService) {
    //Toggle page section between add, edit and delete
    $scope.toggleSectionAdd = function() {
      $scope.titleMVShow = true;
      $scope.editSection = false;
      $scope.deleteSection = false;
    }
    $scope.toggleSectionEdit = function() {
      $scope.titleMVShow = false;
      $scope.titleTVShow = false;
      $scope.editSection = true;
      $scope.deleteSection = false;
    }
    $scope.toggleSectionDelete = function() {
      $scope.titleMVShow = false;
      $scope.titleTVShow = false;
      $scope.editSection = false;
      $scope.deleteSection = true;
    }

    //Toggle switch Button
    $scope.changed = function() {
      if($scope.toggleValue==true){
        // console.log("true");
        $scope.titleMVShow = true;
        $scope.titleTVShow = false;
        $scope.editSection = false;

      } else {
          // console.log("false");
        $scope.titleMVShow = false;
        $scope.titleTVShow = true;
        $scope.editSection = false;
      }
    }

    //Toggle Movie section
    $scope.genres = [{gname : 'Action'}, {gname : 'Comedy'}, {gname : 'Horror'}, {gname : 'Anime'}, {gname : 'Documentary'}];
    $scope.releaseyr = [{yr: '2017' }, {yr: '2016'}, {yr: '2015'}, {yr: '2014'}, {yr: '2013'}, {yr: '2012'}, {yr: '2011'}, {yr: '2010'}];

    //Adding new movie into the array
    $scope.movies;
    $scope.newMovie = {};
    $scope.addMovie = function(newMovie) {
      if ($scope.form.file.$valid && $scope.file) {
        $scope.upload($scope.file);
      }
      newMovie.thumb = 'img/movie-logo.png';
      $scope.movies.push(newMovie);
      $scope.newMovie = {};
    }

    $http.get('data/titleData.json').then(function(response){
      $scope.movies = response.data[0].movieTitles;
    });

    //Edit movieListing
    $scope.editMovie = function(movie) {
      $scope.existingListing = movie;
      //modal service
      ModalService.showModal({
          templateUrl: 'modal.html',
          controller: 'ModalController',
          scope: $scope
      }).then(function(modal) {
          modal.element.modal();
          modal.close.then(function(result) {
          $scope.existingListing = {};
          });
      });
    }

    $scope.removedMovie = function(movie) {
      var removedMovie = $scope.movies.indexOf(movie);
      $scope.movies.splice(removedMovie, 1);
    }

//Adding new TV Show into the array
    $scope.tvshow;
    $scope.newTv = {};
    $scope.addTV = function(newTv) {
      if ($scope.form.file.$valid && $scope.file) {
       $scope.upload($scope.file);
     }
     newTv.Tvthumb = 'img/movie-logo.png';
     $scope.tvshow.push(newTv);
     $scope.newTv = {};
    }

    $http.get('data/titleData.json').then(function(response){
      $scope.tvshow = response.data[1].tvShowTitles;
    });

    //Edit TV Show-Listing
    $scope.editTvShow = function(shows) {
      $scope.existingListing = shows;
      //modal service
      ModalService.showModal({
          templateUrl: 'modal.html',
          controller: 'ModalController',
          scope: $scope
      }).then(function(modal) {
          modal.element.modal();
          modal.close.then(function(result) {
          $scope.existingListing = {};
          });
      });
    }
    $scope.removedTv = function(shows) {
      var removedTv = $scope.tvshow.indexOf(shows);
      $scope.tvshow.splice(removedTv, 1);
    }

  }]);

  titleApp.controller('ModalController', function($scope, close) {

     $scope.close = function(result) {
     	close(result, 500); // close and give 500ms for bootstrap to animate
     };

});
