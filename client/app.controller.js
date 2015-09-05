var app = angular.module('whatsername')

app.controller('AppController', AppController)

AppController.$inject = [
  '$meteor',
  '$scope'
]

function AppController ($meteor, $scope) {
  function findRankings () {
    var rankings = Meteor.models.Rankings.find({}, {sort: {index: 1}}).fetch()
    return rankings
  }

  $scope.$meteorSubscribe('rankings')
    .then(function () {
      $scope.rankings = findRankings()
    })

  $scope.storeRanking = storeRanking
  $scope.subscribedRankings = $meteor.collection(Meteor.models.Rankings)

  function storeRanking (item, partFrom, partTo, indexFrom, indexTo) {
    return $meteor.call('storeRanking', item._id, indexTo)
      .then(function () {
        $scope.rankings = findRankings()
      })
  }
}
