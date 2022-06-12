console.log('check.js')
function check_terminal(terminal, callback){
    msg = 'terminal'  
    callback(msg) ;
}

function check(url,callback){
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType= "json"
    xhr.onload = function () {console.log('check', xhr.response)
        callback(xhr.response)
    }
    xhr.send() 
}

function check_token(token, callback){
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/api/check_token?token=' + token, true);
    xhr.responseType= "json"
    xhr.onload = function () {console.log('check_token', xhr.response)
        callback(xhr.response)
    }
    xhr.send()    
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
