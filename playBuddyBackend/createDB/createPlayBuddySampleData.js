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
		  userName: "Saloni",
		  playerNeeded: 2,
		  joined: 1,
		  preferredCourt: "Washington Athletic Club",
		  sportName: "Badminton",
		  zipCode: 98122,
		  date: "05-27-2024",
		  time: "16:30:00"
	}
	)
requestsCollection.insert(
		{
			  userName: "Rohit",
			  playerNeeded: 2,
			  joined: 1,
			  preferredCourt: "UREC2",
			  sportName: "Badminton",
			  zipCode: 98122,
			  date: "05-28-2024",
			  time: "17:30:00"
		}
		)
	requestsCollection.insert(
		{
			userName: "Mohit",
			playerNeeded: 2,
			joined: 1,
			preferredCourt: "Washington Athletic Club",
			sportName: "Badminton",
			zipCode: 98122,
			date: "05-29-2024",
			time: "18:30:00"
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
requestsCollection.insert(
    {
         reqId: "f4e114eb4ca9e55187c07671adf9e968",
         userName: "Pratibha",
         playerNeeded: 3,
         joined: 2,
         preferredCourt: "UREC",
         sportName: "Cricket",
         zipCode: 98121,
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
      
     },
	{description:"The Match: Matches are made up of sets; men typically play best of 5 sets in Grand Slam tournaments, while women play best of 3 sets. Each set is comprised of games, and each game has points."

    },
    {
		description:"Scoring: The point system within a game goes 0 (or 'love'), 15, 30, 40, and then game point. If both players reach 40, it’s called 'deuce'. From deuce, a player needs to win two consecutive points to win the game: the first point takes a player to 'advantage', and if they win the next point, they win the game. If the opposing player wins the point, it returns to deuce."
	},
    {
		description:"Serving: Matches start with a coin toss to decide who serves first. The server must serve from behind the baseline, alternating between the left and right sides of the court for each point. The serve must go over the net and into the diagonally opposite service box. If the serve fails (net or out), the server gets a second attempt. If both attempts fail, it’s a 'double fault' and the opponent wins the point."
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
      description: "Serving: Matches start with a coin toss to decide who serves first. The server must serve from behind the baseline, alternating between the left and right sides of the court for each point. The serve must go over the net and into the diagonally opposite service box. If the serve fails (net or out), the server gets a second attempt. If both attempts fail, it’s a 'double fault' and the opponent wins the point."
      
     },
	{
		description:"Scoring System: Badminton can be played in singles or doubles. The game is typically played to 21 points, and players must win by a two-point margin. If the score reaches 20-20, the game continues until one player gains a two-point lead (up to a maximum of 30 points), unless the score ties at 29-29, in which case the next point wins the game. Change of Ends: Players switch ends of the court at the end of the first game, at the end of the second game if there is a third, and if the match reaches 11 points in the third game."
	},
    {
        description:"Serving: The serve must be hit underhand and below the server's waist. The shuttle must be hit to the diagonally opposite service court without being blocked by the net."
    },
    {
		description:"Lets: A 'let' can be called for several reasons, such as if a player serves before the opponent is ready, or if during play, the shuttle gets caught in the net and remains suspended or if after passing over the net is caught in the net. After a let, the rally is replayed with no change to the score."
	},
    {
		description:"Faults: Faults can occur for various reasons such as the shuttle landing outside the boundaries of the court, passing through or under the net, failing to cross the net, being hit by a player before it crosses the net, or a player touching the net with their body or racket."
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
      
     },
	{
		description:"The Game: Cricket is played between two teams of eleven players each. The game is played on a circular or oval field with a rectangular pitch at the center where most of the action takes place."
	},
    {
      description:"Playing Roles: Teams alternate roles as either the batting or the fielding team. The fielding team includes a bowler and a wicket-keeper, among other fielders."
    },
    {
		description:"Innings and Overs: Matches are divided into innings. In each inning, one team bats and tries to score runs, while the other team bowls and fields. An over consists of six legal deliveries bowled by the same bowler."
	},
	{description:"Scoring Runs: Batsmen score runs by hitting the ball and running to the opposite end of the pitch. Runs can also be scored through boundaries, where the ball hits or crosses the boundary line around the field. Hitting the ball over the boundary on the full scores six runs (a six), while hitting it along the ground to cross the boundary scores four runs (a four)."

	}],
    gearInfo : [
        {
        gearDescription: "Cricket whites, sometimes called flannels, are loose-fitting clothes that are worn while playing cricket so as not to restrict the player's movement.",
        gearName: "Bat and Leather ball"
        }
    ]
}
)
hubCollection.insert(
	{
		sportName : "BasketBall",
		history : "Basketball was invented by Dr. James Naismith, a Canadian physical education instructor, in Springfield, Massachusetts, USA. He developed the game as an indoor sport to keep his students active during the winter. The first game was played with a soccer ball and two peach baskets used as goals.",
		rules : [
		 {
		  description: "Teams and Players: Each team typically consists of five players on the court at any time. Substitutions are allowed during dead balls and can be unlimited."
		  
		 },
		{
			description:"The Court: The game is played on a rectangular court with a hoop at each end. The court is divided into two main sections by the mid-court line."
		},
		{
			description:"Game Duration: Professional games are generally divided into four quarters, each lasting 12 minutes (NBA) or 10 minutes (FIBA). College games are played in two 20-minute halves. The clock stops for various reasons like fouls, ball out of play, and timeouts."
		},
		{
			description:"Starting the Game: The game begins with a jump ball at center court, where the referee throws the ball up between two players who try to tap it to their teammates."
		},
		{
			description:"Ball Movement: Players can move the ball by dribbling or passing to teammates. They cannot run with the ball without dribbling it. The ball must stay within bounds; if it goes out, it is given to the opposing team unless it was last touched by an opponent."
		}],
		gearInfo : [
			{
			gearDescription: "These are the most common type of gears, easily recognized by their cylindrical shape and teeth that are straight and aligned parallel to the axis of rotation. They are used to transmit motion between parallel shafts.",
			gearName: "Spur Gear"
			}
		]
	}
)
hubCollection.insert(
	{
		sportName : "Soccer",
		history : " Variations of games involving balls played with feet date back to ancient civilizations, including China (Cuju), Egypt, Greece, and parts of Central America.Versions of football appeared in various forms across Europe during the Medieval period, often played in towns and villages according to local customs and with minimal rules.",
		rules : [
		 {
		  description: "Players and Positions: Each team consists of eleven players, one of whom must be the goalkeeper. Substitutions are allowed during the match, with the number depending on the competition rules (usually three to five)."
		  
		 },
		{
			description:"The Field of Play: The game is played on a rectangular field with a goal at each end. The size of the field can vary but is roughly 100-130 yards long and 50-100 yards wide for professional play."
		},
		{
			description:"Free Kicks and Penalty Kicks: Free kicks are either direct (from which a goal may be scored directly against the opposing side) or indirect (from which the ball must touch another player before a goal can be scored). A penalty kick is awarded for fouls committed within the penalty area and is taken from the penalty spot against the goalkeeper."
		},
		{
			description:"Fouls and Misconduct: Direct free kicks are awarded for most types of fouls, such as kicking, tripping, pushing, holding, etc. More severe fouls may result in a penalty kick if they occur inside the penalty area or a sending off (red card). Indirect free kicks are awarded for non-contact offenses or technical infractions, like dangerous play or offsides."
		},
		{
			description:"Offside Rule: A player is in an offside position if they are nearer to their opponent’s goal line than both the ball and the second-last opponent (usually the last outfield player) at the moment the ball is played to them by a teammate. Being in an offside position is not an offense in itself, but becoming actively involved in play while offside is."
		}],
		gearInfo : [
			{
			gearDescription: "Shoes specifically designed for soccer, featuring studs or blades on the bottom to enhance traction on different playing surfaces. Shin gaurds are Protective equipment worn on the front of a player’s lower legs to prevent injuries from kicks or collisions.",
			gearName: "Soccer Cleats and Shin Gaurd"
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
clubsCollection.insert(
    {
        clubName: 'TruFusion Ballard',
        zipCode: 98121,
        sportNames: [{
            sport: 'Basketball'
        },
        {
            sport: 'Tennis'
        },
        {
            sport: 'Soccer'
        }],
        address: '1401 NW 46th St Suite 200'
    }
)
clubsCollection.insert(
    {
        clubName: 'Washington Athletic Club',
        zipCode: 98122,
        sportNames: [{
            sport: 'Badminton'
        },
        {
            sport: 'Tennis'
        },
        {
            sport: 'Soccer'
        },
	    {
			sport: 'BasketBall'
		},
	    {
			sport: 'Cricket'
		}],
        address: '6th Avenue'
    }
)
clubsCollection.insert(
    {
        clubName: 'PRO Club',
        zipCode: 98122,
        sportNames: [{
            sport: 'Badminton'
        },
        {
            sport: 'Tennis'
        },
        {
            sport: 'Soccer'
        },
	    {
			sport: 'BasketBall'
		},
	    {
			sport: 'Cricket'
		}],
        address: '5th Avenue, Westlake'
    }
)
clubsCollection.insert(
    {
        clubName: 'Seattle Athletic Club',
        zipCode: 98123,
        sportNames: [{
            sport: 'Badminton'
        },
        {
            sport: 'Tennis'
        },
	    {
			sport: 'BasketBall'
		},
	    {
			sport: 'Cricket'
		}],
        address: '2020 Western Avenue'
    }
)
clubsCollection.insert(
    {
        clubName: 'The Ninety Club',
        zipCode: 98123,
        sportNames: [{
            sport: 'Badminton'
        },
        {
            sport: 'Tennis'
        },
        {
            sport: 'Soccer'
        },
	    {
			sport: 'BasketBall'
		},
	    {
			sport: 'Cricket'
		}],
        address: '8th Avenue, Westlake'
    }
)
clubsCollection.insert(
    {
        clubName: 'Axtian Club',
        zipCode: 98123,
        sportNames: [{
            sport: 'Badminton'
        },
	    {
			sport: 'Cricket'
		}],
        address: '2nd Avenue'
    }
)
clubsCollection.insert(
    {
        clubName: 'College Club',
        zipCode: 98124,
        sportNames: [{
            sport: 'Badminton'
        },
        {
            sport: 'Tennis'
        },
        {
            sport: 'Soccer'
        }],
        address: '5th Avenue, Westlake'
    }
)
clubsCollection.insert(
    {
        clubName: 'Seattle Seahawks Club',
        zipCode: 98125,
        sportNames: [
        {
            sport: 'Soccer'
        }],
        address: 'Lumenfield'
    }
)
clubsCollection.insert(
    {
        clubName: 'Mercerwood Shore Club',
        zipCode: 98125,
        sportNames: [{
            sport: 'Badminton'
        },
        {
            sport: 'Tennis'
        },
        {
            sport: 'Soccer'
        },
	    {
			sport: 'BasketBall'
		},
	    {
			sport: 'Cricket'
		}],
        address: 'Mercer Way'
    }
)
clubsCollection.insert(
    {
        clubName: 'Seattle Mariners',
        zipCode: 98120,
        sportNames: [
        {
            sport: 'Soccer'
        },
	    {
			sport: 'BasketBall'
		},
	    {
			sport: 'Cricket'
		}],
        address: '1st Avenue'
    }
)
clubsCollection.insert(
    {
        clubName: 'Lake Washington Rowing Club',
        zipCode: 98120,
        sportNames: [{
            sport: 'Badminton'
        },
	    {
			sport: 'Tennis'
		}],
        address: '2nd Avenue'
    }
)
clubsCollection.insert(
    {
        clubName: 'YMCA Club',
        zipCode: 98130,
        sportNames: [
        {
            sport: 'Soccer'
        },
	    {
			sport: 'BasketBall'
		},
	    {
			sport: 'Cricket'
		}],
        address: 'Westlake'
    }
)
clubsCollection.insert(
    {
        clubName: 'Downtown Club',
        zipCode: 98126,
        sportNames: [{
            sport: 'Badminton'
        },
        {
            sport: 'Tennis'
        },
        {
            sport: 'Soccer'
        },
	    {
			sport: 'BasketBall'
		},
	    {
			sport: 'Cricket'
		}],
        address: 'James Street'
    }
)
clubsCollection.insert(
    {
        clubName: 'Olympic Club',
        zipCode: 98122,
        sportNames: [{
            sport: 'Badminton'
        }],
        address: 'South Street'
    }
)
b.createCollection('user')
requestsCollection = db.getCollection("user")
requestsCollection.remove({})
requestsCollection.insert(
{
      userName: "MayurAhirrao",
      email: "mayurahirrao3@gmail.com",
      ssoID: "",
      address: "1122 NE 55th St"
}
)