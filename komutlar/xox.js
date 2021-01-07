this.sessions = new Set();
this.RichEmbed = require('discord.js').RichEmbed;
this.chunkArray = require(process.cwd()+'/moduller/util.js').chunk;

this.run = async (client, msg, args) => {
  const renk = client.ayarlar.renk
	if(this.sessions.has(msg.channel.id)) return msg.channel.send('XOX oyunu zaten bu kanalda oynanıyor.');
	const user = msg.mentions.users.first();
	if(!user) return msg.reply('Birisini etiketle');
  if(user.bot) return msg.reply('Botla oynama');
	this.sessions.add(msg.channel.id);
	try {
		let turn = true;
		let passes = 0;
		let win = undefined;
		let board = ['1⃣', '2⃣', '3⃣', '4⃣', '5⃣', '6⃣', '7⃣', '8⃣', '9⃣'];
		const thisMess = await msg.channel.send('Yükleniyor...');
		for(const num of board){
			await thisMess.react(num);
		}
		while(passes < 9 && !win){
			let userTurn = turn ? msg.author : user;
			const sign = turn ? '❌' : '⭕';
			const winSign = turn ? '❎' : '🅾';
			const embed = new this.RichEmbed()
			.setColor('RANDOM')
			.setDescription(this.chunkArray(board, 3).map(x => x.join('')).join('\n'));
			thisMess.edit(`${userTurn.toString()} Senin sıran.`, { embed });
			const filter = (rect, usr) => board.includes(rect.emoji.name) && usr.id === userTurn.id;
			const response = await thisMess.awaitReactions(filter, {
				max: 1,
				time: 30000
			});
			if(!response.size){
        turn = !turn;
				await msg.channel.send(`${userTurn.toString()} oynamak için verilen zaman bitti.`);
				board = this.chunkArray(board, 3);
        userTurn = turn ? msg.author : user;
				win = userTurn;
        break;
			}
			const choice = response.first().emoji.name;
			board[board.indexOf(choice)] = sign;
			const checkWin = this.checkWin(this.chunkArray(board, 3), winSign);
			if(checkWin.bool){
				board = checkWin.board;
				win = userTurn;
			}
			turn = !turn;
      passes++;
		}
    thisMess.delete();
		const embed = new this.RichEmbed()
		.setColor(renk)
		if(!win){
			embed.setColor(renk);
			embed.setDescription(this.chunkArray(board, 3).map(x => x.join('')).join('\n'));
      this.sessions.delete(msg.channel.id);
			return msg.channel.send('Oyun berabere bitti.', { embed });
		}
    this.sessions.delete(msg.channel.id);
		embed.setDescription(board.map(x => x.join('')).join('\n'));
		return msg.channel.send(`${win.toString()} Kazandın!`, { embed });
	}catch(e){
		this.sessions.delete(msg.channel.id);
		return msg.reply(e.stack, { code: 'diff'});
	}
}

this.checkWin = (board, winSign) => {
	let fin = {
		bool: false
	}
	for(let i = 0; i < 3; i++){
		if(board[i][0] === board[i][1] && board[i][0] === board[i][2]){
			fin.bool = true;
			board[i][0] = winSign;
			board[i][1] = winSign;
			board[i][2] = winSign;
			fin.board = board;
			return fin;
		}
	}
	for(let i = 0; i < 3; i++){
		if(board[0][i] === board[1][i] && board[0][i] === board[2][i]){
			fin.bool = true;
			board[0][i] = winSign;
			board[1][i] = winSign;
			board[2][i] = winSign;
			fin.board = board;
			return fin;
		}
	}
	if(board[0][0] === board[1][1] && board[0][0] === board[2][2]){
		fin.bool = true;
		board[0][0] = winSign;
		board[1][1] = winSign;
		board[2][2] = winSign;
		fin.board = board;
		return fin;
	}
	if(board[2][0] === board[1][1] && board[2][0] === board[0][2]){
		fin.bool = true;
		board[2][0] = winSign;
		board[1][1] = winSign;
		board[0][2] = winSign;
		fin.board = board;
		return fin;
	}
	return fin;
}

exports.bilgi = {
  açık: true,
  kullanımlar: ["tictactoe"],
  zaman: 2000
};

exports.yardım = {
  isim: 'xox', 
  kategori: 'Oyun', 
  açıklama: "Etiketlediğiniz kullanıcıyla XOX oynarsınız.", 
  kullanım: 'xox [kullanıcı]' 
} 