const Discord = require('discord.js');
//const request = require('request');
//const cheerio = require('cheerio');
//const ytdl = require('ytdl-core');

const client = new Discord.Client();


// Discord bot token
const token = process.env.TOKEN; // Giving the token through heroku env variables comment it out to run the app locally
  //Add the token directly here for running locally

const PREFIX = '.';

const commands = [
  '.author',
  '.match      --- Günün iddaa maçları(yakında)',
  '.play       --- Musiki çalıcı (yakında)',
  '.clear 5    --- Komutun girildiği kanalda 5 mesaj siler.'
];


client.on('ready', () => {
  console.log('Bot is Online!');
})

client.on('disconnect', () => {
  console.log("Bot disconnected!");
})

client.on('reconnecting', () => {
  console.log("Bot is reconnecting!");
})

var latestMessage = new Discord.Message();

client.on('message', message => {
  let args = message.content.substring(PREFIX.length).split(" ");

  // Checks if the message belongs to the bot if it is the bot doesnt react to any commands
  if(message.author.client !== client.client){

    //----- SHOULD IMPROVE -----
    // Handling Spam
    if(latestMessage.createdAt != 'Invalid Date'){
      if(latestMessage.author === message.author ){
        // Checks if difference between the last two messages are less than .3 seconds
        if(((message.createdAt - latestMessage.createdAt) / 1000) < 0.3){
          console.log('Spam Message Found. --> ' + message.author.username);
          //Deletes the spam message
          message.delete();
        }
      }
    }
    latestMessage = message;

    //Command checks
    switch(args[0]){
      case 'commands':
        message.channel.send(commands);
        break;
      case 'author':
        message.channel.send('Ghost bot was created by BerkeKalkan');
        break;
      case 'match':
        //matches = getMatches();
        //message.author.sendMessage()
        break;
      case 'clear':
        //if() if user has permissions do the following
          const arg = Number(args[1]);
          if(Number.isInteger(arg)){
            message.channel.fetchMessages({ limit: arg })
            .then(messages => message.channel.bulkDelete(arg + 1)
              .then(messages => console.log(`Bulk deleted ${messages.size} messages`))
              .catch(console.error));
          }
        break;
      case 'play':
        if(message.channel === client.channels.find("name", "music")){
          // play music
        }
        else{
          //Play request was outside of the music channel
          message.delete();
          message.author.send('Müzik isteklerini music kanalı içinde yap!');
        }
        break;
    }
  }
})

// Log in
client.login(token);
