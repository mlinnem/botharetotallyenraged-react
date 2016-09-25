//var all_animal_names = ["Albatross", "Cat", "Dog", "Elephant", "Ferret", "Jaguar", "Llama", "Mastodon", "Orangutan", "Porcupine", "Tarantula", "Warthog", "Zebra"];

var backend = {
  animals: {},

  outstandingBallots: {},

  getBallot : function() {
    var animalA = this.getRandomAnimalName();
    var animalB = this.getRandomAnimalName();

    var ballot =  {"animalA" : animalA,
            "animalB" : animalB,
            "token" : Math.random()};
    this.outstandingBallots[ballot.token] = ballot;

    return ballot;
  },

  submitBallot: function(token, animalVotedForName) {
    //retrieve server-side ballot (or fail)
    var ballot = this.outstandingBallots[token];
    if (! ballot) {
      console.log("Faulty ballot submitted: " + token);
      return false;
    }

    //retrieve animal voted for and not voted for

    var animalVotedFor;
    var animalNotVotedFor;
    if (animalVotedForName == ballot.animalA) {
      animalVotedFor = this.animals[ballot.animalA];
      animalNotVotedFor = this.animals[ballot.animalB];
    } else if (animalVotedForName = ballot.animalB){
      animalVotedFor = this.animals[ballot.animalB];
      animalNotVotedFor = this.animals[ballot.animalA];
    } else {
      console.log("Voted for animal that was not on ballot: " + animalVotedForName);
      return false;
    }

    //increment wins and losses
    animalVotedFor.wins = animalVotedFor.wins + 1;
    this.animals[animalVotedFor.name] = animalVotedFor;

    animalNotVotedFor.losses = animalNotVotedFor.losses + 1;
    this.animals[animalNotVotedFor.name] = animalNotVotedFor;

    //remove ballot from outstanding ballots;
    delete this.outstandingBallots[ballot];
  },

  createAnimal: function(name) {
    this.animals[name] = {"name": name, "wins" : 0, "losses" : 0};
  },

  getRandomAnimalName: function() {
    var animalNames = Object.keys(this.animals);
    return animalNames[Math.floor(Math.random()*animalNames.length)];

  },
}

backend.createAnimal("Albatross");
backend.createAnimal("Cat");
backend.createAnimal("Dog");
backend.createAnimal("Elephant");

class BallotPresenter extends React.Component {
  constructor() {
      super();

      var ballot = backend.getBallot();
      this.state = ballot;

      this.handleVote = this.handleVote.bind(this);
  }
    handleVote(animalVotedForName) {
      backend.submitBallot(this.state.token, animalVotedForName)
      var ballot = backend.getBallot();
      var animalA = ballot.animalA;
      var animalB = ballot.animalB;
      this.setState(ballot);
    }

    render() {
        return (

            <
            p >

            <
            AnimalButton animal = {this.state.animalA} onClick={this.handleVote}/ >
            vs. <
            AnimalButton animal = {this.state.animalB} onClick={this.handleVote}/ >
            </p>
        );
    }
  };

class AnimalButton extends React.Component {
    constructor() {
        super();
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.onClick(this.props.animal);
    }

    render() {
        //var text = this.state.clicked ? "clicked" : "";
        return ( <
            button type = "button"
            onClick = {
                this.handleClick
            } > {
                this.props.animal
            } < /button>
        );
    }
}

ReactDOM.render( <
        BallotPresenter animalA = "Komodo Dragon"
        animalB = "Bear"
        date = {
            new Date()
        }
        />, document.getElementById('example') );
