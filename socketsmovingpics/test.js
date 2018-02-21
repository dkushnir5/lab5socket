const port = process.env.PORT || 10000;
const server = require("http").Server();

var io = require("socket.io")(server);

var allqs = {};

io.on("connection", function(socket){
    
    socket.on("stick", function(data){
        
    });

    socket.on("joinroom", function(data){
        console.log("joining room", data);
        
        socket.join(data);
        socket.myRoom = data;
        
        if(!allqs[data]){
            allqs[data] = {
                qobj:{}
            };
        }
        
    });
    
    socket.on("answer", function(data){
        var msg="WRONG!";
        if(data == allqs[socket.myRoom].qobj.a){
            msg = "You've won in life";
        }
        socket.emit("result", msg);
    });
    
    socket.on("qsubmit", function(data){
        allqs[socket.myRoom].qobj = data;
        socket.to(socket.myRoom).emit("newq", data);
    });
    
    socket.on("disconnect", function(){
        
    })
});

server.listen(port, (err)=>{
    if(err){
        console.log(err);
        return false;
    }
    
    console.log("Port is running");
})