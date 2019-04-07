// Player enters lobby name and game starts once two players are in the same lobby
(function() {
  const player = {
    name: "", // Player is either 'Host' or 'Guest'
    sign: "",
    score: 0
  };

  function $(id) {
    return document.getElementById(id);
  }

  let score = $("score"),
    triesLeft = $("triesLeft"),
    guessWord = $("guessWord"),
    opponentScore = $("opponentScore");

  // PubNub
  let lobby = prompt("Enter name of lobby");
  let game = lobby; // game is the channel where the game takes places
  lobby = lobby + "Lobby"; // separate channel for lobby
  const newUUID = PubNub.generateUUID();
  let isHost = false;
  let ChatEngine = "";
  let GuessWordChatEngine = "";

  const pubnubGuessGame = new PubNub({
    uuid: newUUID,
    publish_key: "pub-c-39db552e-c90e-45f3-82da-68ed8f6b3b94",
    subscribe_key: "sub-c-6f162594-5981-11e9-ba87-ca4df85413ac",
    ssl: true
  });

  listener = {
    presence: function(response) {
      if (response.action === "join") {
        if (response.occupancy < 2) {
          // Check that game lobby is not full
          pubnubGuessGame.hereNow(
            {
              channels: [game]
            },
            function(status, response) {
              // Unsubscribe if lobby is full
              if (response.totalOccupancy >= 2) {
                guessWord.innerHTML = "";
                window.alert("Lobby is full!");
                pubnubGuessGame.removeListener(listener);
                pubnubGuessGame.unsubscribe({
                  channels: [lobby]
                });
                return;
              }
            }
          );
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

  pubnubGuessGame.subscribe({
    channels: [lobby],
    withPresence: true
  });

  function connectToChat() {
    /* Main Chat
         Different keys from game keys */
    ChatEngine = ChatEngineCore.create(
      {
        publishKey: "pub-c-ad9f340e-95d1-4064-b8f1-5a173d62b113",
        subscribeKey: "sub-c-9d43b576-5981-11e9-be9b-e284dc0944ea"
      },
      {
        globalChannel: [game]
      }
    );

    /* Guess Word Chat
         Different keys from above */
    GuessWordChatEngine = ChatEngineCore.create(
      {
        publishKey: "pub-c-98088b52-c834-4eee-91d7-b3b3f1ebcd13",
        subscribeKey: "sub-c-b5476a28-5981-11e9-bacd-ba825bfe5cc2"
      },
      {
        globalChannel: [game]
      }
    );

    const client = {
      uuid: player.name,
      player: player.name
    };

    ChatEngine.connect(client.uuid, client);
    GuessWordChatEngine.connect(client.uuid, client);
  }

  let canvas = document.getElementById("drawCanvas");
  let ctx = canvas.getContext("2d");
  let color = document.querySelector(":checked").getAttribute("data-color");

  function setUpCanvas() {
    ctx.fillStyle = "WHITE";
    ctx.fillRect(20, 20, window.innerWidth, window.innerHeight);
    ctx.strokeStyle = color;
    ctx.lineWidth = "3";
    ctx.lineCap = ctx.lineJoin = "round";
  }
})();
