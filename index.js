const Discord = require('discord.js');
const request = require('request');
const cheerio = require('cheerio');

const client = new Discord.Client();



// Discord bot token
const token = process.env.TOKEN; // Giving the token through heroku env variables

const PREFIX = '.';

const commands = [
  '.author',
  '.match      --- Günün iddaa maçları(yakında)',
  '.play       --- Musiki çalıcı (yakında)'
];


client.on('ready', () => {
  console.log('Bot is Online!');
})

client.on('message', message => {
  let args = message.content.substring(PREFIX.length).split(" ");

  switch(args[0]){
    case 'commands':
      message.channel.send(commands);
      break;
    case 'author':
      message.channel.send('Ghost bot was created by BerkeKalkan');
      break;
    case 'match':
      message.channel.send('Yakında');
      //matches = getMatches();
      //message.author.sendMessage()
      break;
    case 'play':
      if(message.channel === client.channels.find("name", "music")){
        //play music
      }
      else{
        //Play request was outside of the music channel
        message.delete();
        message.author.send('Müzik isteklerini music kanalı içinde yap!');
      }
      break;
  }
})

// Log in
client.login(token);
