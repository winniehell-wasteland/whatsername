Meteor.publish('rankings', function () {
  return Meteor.models.Rankings.find({})
})
