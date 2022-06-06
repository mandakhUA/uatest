console.log('check.js')
function check_terminal(terminal, callback){
    msg = 'terminal'  
    callback(msg) ;
}
function check_billno(billno, callback){
    msg = 'billno'  
    callback(msg) ;
}
function check_mobile(mobile, callback){
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/api/check_mobile?mobile='+mobile, true);
    xhr.responseType= "json"
    xhr.onload = function () {
        console.log('checkmoob', xhr.response)        
        callback(xhr.response) ;
    }
    xhr.send(null);
}
function check_num(num, callback){
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/api/check_num?num='+num, true);
    xhr.responseType= "json"
    xhr.onload = function () {
        console.log('checknum', xhr.response)     
        callback( xhr.response );
    }
    xhr.send(null);
}
