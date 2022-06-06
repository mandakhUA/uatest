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
    // mob = document.getElementById(inpid); console.log('mob', mob.value)
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/api/check_mobile?mobile='+mobile, true);
    xhr.responseType= "json"
    xhr.onload = function () {
        console.log('checkmoob', xhr.response)
        msg = ''             
        if (xhr.response.cons.length === 0){msg = ` msg: энэ утас дээр бүртгэлтэй хэр олдсонгүй. `}
        else if (xhr.response.cons.length > 0){
            msg += `${xhr.response.cons.length} cons oldloo. cons: <a href='main?id=${xhr.response.cons[0]._id}' target="_blank">${xhr.response.cons[0]._id}</a>`
        }
        if (xhr.response.cards.length === 0){msg += ` msg: энэ утас дээр бүртгэлтэй карт олдсонгүй. `}
        else if (xhr.response.cards.length > 0){
            msg += `${xhr.response.cards.length} cards oldloo. cards: <a href='card?id=${xhr.response.cards[0]._id['$oid']}' target="_blank">${xhr.response.cards[0]._id['$oid']}</a>`
        }
        callback(msg) ;
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
