
const fs = require('fs')

class Ticket {
	constructor(id,desktop){
		this.id = id;
		this.desktop= desktop;
	}
}

class TicketControl {

	constructor(){

		this.last =0;
		this.today= new Date().getDate();
		this.tickets = [];
		this.lastFour = [];

		let data = require('../data/data.json');

		if(data.today === this.today){
				this.last = data.last;
				this.tickets = data.tickets;
				this.lastFour = data.lastFour
		}else{
				this.restarData();
		}
	}

	
restarData(){
		this.last = 0;
		this.tickets=[];
		this.lastFour=[];
		this.saveFile();
}

nextTicket(){
	this.last += 1;
	let ticket = new Ticket(this.last,null);
	this.tickets.push(ticket);
	this.saveFile();

	return `Ticket ${ this.last }`;
}

getState(){
	return `Ticket ${ this.last }`;
}

getLastFour(){
	return this.lastFour;
}

attentionTicket(desktop){

    if(this.tickets.length === 0){
    	return 'No hay tickets';
    }


	let id = this.tickets[0].id;
	this.tickets.shift();

	let attentionTicket = new Ticket(id,desktop);
	this.lastFour.unshift(attentionTicket);

	if(this.lastFour.length > 4){
		this.lastFour.splice(-1,1);
	}

	console.log('ultimos 4', this.lastFour);
	this.saveFile();

	return attentionTicket;


}

saveFile(){
let json = {
			last: this.last,
			today:this.today,
			tickets: this.tickets,
			lastFour: this.lastFour
		}

		let jsonData = JSON.stringify(json)

		fs.writeFileSync('./server/data/data.json',  jsonData);

}
}

module.exports = {
	TicketControl
}