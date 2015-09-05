Meteor.methods({
  storeRanking: storeRanking
})

function storeRanking (id, newIndex) {
  check(id, String)
  check(newIndex, Number)

  var ranking = Meteor.models.Rankings.findOne(id)
  check(ranking, Object)

  if (ranking.index === newIndex) {
    return
  } else if (ranking.index < newIndex) {
    Meteor.models.Rankings.update(
      {
        index: {
          $gt: ranking.index,
          $lte: newIndex
        }
      },
      {
        $inc: {
          index: -1
        }
      },
      {
        multi: true
      }
    )
  } else {
    Meteor.models.Rankings.update(
      {
        index: {
          $gte: newIndex,
          $lt: ranking.index
        }
      },
      {
        $inc: {
          index: 1
        }
      },
      {
        multi: true
      }
    )
  }

  Meteor.models.Rankings.update(id, {
    $set: {
      index: newIndex
    }
  })
}
