
let label = $('#lblNuevoTicket');

var socket =io();

socket.on('connect',function(){
	console.log('conectado al server')
})

socket.on('disconnect',function(){
	console.log('desconectado al server')
});


socket.on('getState',function(data){

		label.text(data.state);
});


$('button').on('click',function(){

socket.emit('nextTicket',null,function(data){
	label.text(data);

});

});