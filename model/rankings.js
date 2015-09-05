var Rankings = new Mongo.Collection('rankings')
Meteor.models.Rankings = Rankings

Rankings.init = init

function init () {
  Rankings.remove({})

  Rankings.insert({name: 'John', index: 0})
  Rankings.insert({name: 'Michael', index: 1})
  Rankings.insert({name: 'Kane', index: 2})
}
