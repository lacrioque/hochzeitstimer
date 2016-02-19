angular.module('hochzeitstimer', ['ionic', 'ionic-material', 'hochzeitstimer.controllers', 'hochzeitstimer.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.todo', {
      url: '/todo',
      views: {
        'tab-todo': {
          templateUrl: 'templates/tab-todo.html',
          controller: 'todoCtrl'
        }
      }
    })

  .state('tab.cominghome', {
    url: '/cominghome',
    views: {
      'tab-cominghome': {
        templateUrl: 'templates/tab-cominghome.html',
        controller: 'cominghomeCtrl'
      }
    }
  });
  $urlRouterProvider.otherwise('/tab/dash');

});
