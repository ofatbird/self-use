var socket = io()
var $showMsg = $('.showMsg')
var $input = $('#input')
var $ul = $('#appendmsg')

$input.on('keyup', function(e){
    if (!this.value) return
    if (13 === e.keyCode) {
        socket.emit('new message', this.value)
        this.value = ''
    }
})

socket.on('new message', function(data){
    console.log('????')
    $ul.append('<li>'+data.message+'</li>')
})