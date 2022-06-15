console.log('check.js')


function check(url,callback){
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType= "json"
    xhr.onload = function () {console.log('check', xhr.response)
        callback(xhr.response)
    }
    xhr.send() 
}




