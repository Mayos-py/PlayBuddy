db = db.getSiblingDB('playBuddySample')
db.createCollection('requests')
requestsCollection = db.getCollection("requests")
requestsCollection.remove({})
requestsCollection.insert(
{
      reqId: "fe3f0e5ac505a78f00dd6203f2570613",
      userName: "Mayur Ahirrao",
      playerNeeded: 3,
      joined: 1,
      preferredCourt: "UREC",
      sportName: "Badminton",
      zipCode: 98122,
      date: "04-27-2024",
      time: "16:30:00"
}
)
requestsCollection.insert(
{
      reqId: "588de0d9a41c77ad18a86cca35638955",
      userName: "Deeksha Bharath Raj",
      playerNeeded: 2,
      joined: 0,
      preferredCourt: "UREC",
      sportName: "Badminton",
      zipCode: 98122,
      date: "04-29-2024",
      time: "20:00:00"
}
)
requestsCollection.insert(
{
     reqId: "f4e114eb4ca9e55187c07671adf9e968",
     userName: "Pooja Sugandi",
     playerNeeded: 3,
     joined: 2,
     preferredCourt: "UREC",
     sportName: "Badminton",
     zipCode: 98122,
     date: "04-28-2024",
     time: "11:00:00" 
}
)
db.createCollection('hub')
hubCollection = db.getCollection("hub")
hubCollection.remove({})
hubCollection.insert(
{
    sportName : "Tennis",
    history : "The Medieval form of tennis is termed as real tennis, a game that evolved over three centuries from an earlier ball game played around the 12th century in France that involved hitting a ball with a bare hand and later with a glove.",
    rules : [
     {
      description: "A tennis match begins with the umpire doing a coin toss. The player who wins the toss can choose to serve, receive or pick the side from which they want to start the match."
      
     }],
    gearInfo : [
        {
        gearDescription: "A tennis racquet, which comes in various sizes, weights, and string tensions tailored to your playing style, is the first thing you need.",
        gearName: "raquet"
        }
    ]
}
)
hubCollection.insert(
{
    sportName : "Badminton",
    history : "Badminton was invented in 1873, and the modern game has changed in many ways since then, including the rules and scoring system.",
    rules : [
     {
      description: "Badminton is often played as a casual outdoor activity in a yard or on a beach."
      
     }],
    gearInfo : [
        {
        gearDescription: "A tennis racquet, which comes in various sizes, weights, and string tensions tailored to your playing style, is the first thing you need.",
        gearName: "Raquet and Shuttle"
        }
    ]
}
)
hubCollection.insert(
{
    sportName : "Cricket",
    history : "The sport grew in popularity, specifically in England, in the 17th and 18th centuries.",
    rules : [
     {
      description: "Game comprise of at least one innings where each team will take turns on batting and fielding/bowling. The fielding team will have a bowler who bowls to the batsman who tries to hit the ball with the bat. The batsmen tries to score as many runs as possible before getting out."
      
     }],
    gearInfo : [
        {
        gearDescription: "Cricket whites, sometimes called flannels, are loose-fitting clothes that are worn while playing cricket so as not to restrict the player's movement.",
        gearName: "Bat and Leather ball"
        }
    ]
}
)
db.createCollection('club')
clubsCollection = db.getCollection("club")
clubsCollection.remove({})
clubsCollection.insert(
    {
        clubName: 'UREC',
        zipCode: 98122,
        sportNames: [{
            sport: 'Badminton'
        },
        {
            sport: 'Tennis'
        },
        {
            sport: 'BasketBall'
        }],
        address: 'Seattle University'
    }
)
clubsCollection.insert(
    {
        clubName: 'UREC2',
        zipCode: 98121,
        sportNames: [{
            sport: 'Badminton'
        },
        {
            sport: 'Tennis'
        },
        {
            sport: 'BasketBall'
        }],
        address: 'Seattle University2'
    }
)