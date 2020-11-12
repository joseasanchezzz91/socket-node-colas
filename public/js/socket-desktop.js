var socket =io();

var searchParams = new URLSearchParams(window.location.search);

if(!searchParams.has('escritorio')){
	window.location= 'index.html';
	throw new Erro ("el escritorio es necesario");
}

var escritorio = searchParams.get('escritorio');
var label = $('small');

$('h1').text("Escritorio "+ escritorio)

$('button').on('click',function(){

	socket.emit('attentionTicket',{desktop:escritorio},function(resp){
			if(resp === 'No hay tickets'){
				alert('No hay tickets');
				return;
			}else{
			label.text('Ticket ' + resp.id);
			}

			
	})


})