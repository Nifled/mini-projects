(function() {
  const player = {
    name: "",
    sign: "",
    score: 0
  };

  let score = $("score"),
    triesLeft = $("triesLeft"),
    guessWord = $("guessWord"),
    opponentScore = $("opponentScore");

  let lobbyName = prompt("Enter lobby name:");
  let game = lobbyName; // game is the channel where the game takes places
  let lobby = `${lobbyName}Lobby`; // separate channel for lobby

  const newUUID = PubNub.generateUUID();
  let isHost = false;
  let chatEngine = "";
  let guessWordChatEngine = "";

  const pubnubGuessGame = new PubNub({
    uuid: newUUID,
    publish_key: "pub-c-9939f103-8a9a-429d-88d9-53a6a5d50d39",
    subscribe_key: "sub-c-50379e00-5053-11e9-bace-daeb5080f5f6",
    ssl: true
  });

  const listener = {
    presence: function(response) {
      if (response.action === "join") {
        if (response.occupancy < 2) {
          // Add hereNow() function here

          // Player is the Host
          player.name = "Host";
          player.sign = "H";
          isHost = true;
          guessWord.innerHTML = "You are the Host. Waiting for opponent...";
        } else if (response.occupancy === 2) {
          // Player is the Guest
          if (!isHost) {
            player.name = "Guest";
            player.sign = "G";
            guessWord.innerHTML = `Guess the drawing!`;
            triesLeft.innerHTML = "Tries Left: 3";
          }

          score.innerHTML = `My Score: ${player.score}`;
          opponentScore.innerHTML = "Opponent's Score: 0";

          connectToChat();
          // Unsubscribe fromm lobby channel
          pubnubGuessGame.removeListener(listener);
          pubnubGuessGame.unsubscribe({
            channels: [lobby]
          });
          gameStart(
            pubnubGuessGame,
            ChatEngine,
            GuessWordChatEngine,
            game,
            player
          );
        }
      }
    },
    status: function(event) {
      if (event.category == "PNConnectedCategory") {
        setUpCanvas();
      }
    }
  };

  pubnubGuessGame.addListener(listener);

  // Utils
  function $(id) {
    return document.getElementById(id);
  }
})();
