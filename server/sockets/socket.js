const { io } = require('../server');
const {TicketControl}= require('../classes/ticket-control');

let ticketControl = new TicketControl();

io.on('connection', (client) => {

  

    client.emit('getState', {
        state: ticketControl.getState(),
        lastFour: ticketControl.getLastFour()
    });



    client.on('disconnect', () => {
        console.log('Usuario desconectado');
    });

    // Escuchar el cliente
  client.on('nextTicket',(data,callback)=>{
    let next =ticketControl.nextTicket();
            callback(next);
    
    });

  client.on('attentionTicket',(data,callback)=>{

    if(!data){
        return callback({
            err:true,
            message: "el escritorio es necesario"
        })
    }

    let attentionTicket = ticketControl.attentionTicket(data.desktop);

            callback(attentionTicket);

             client.broadcast.emit('getState', {
        state: ticketControl.getState(),
        lastFour: ticketControl.getLastFour()
    });
    
    });




});