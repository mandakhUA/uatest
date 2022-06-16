const {useState, useEffect} = React

function Card(){
    const params = new URLSearchParams(window.location.search); console.log('params', params, params.has('id'), params.get('id'))
    let defval = "id"
    if (params.has('num')) defval = "num"
    const [searchval, setSearchval] = useState(defval);
    const [bb, setBb] = useState("");
    const [searchmsg, setSearchmsg] = useState("");
    useEffect(() => {
        console.log('load')
        const params = new URLSearchParams(window.location.search); console.log('params', params, params.has('id'), params.get('id'))
        if (params.has('mobile') || params.has('num') || params.has('id')) {
            if (params.has('mobile')) {setSearchval("mobile"); setBb(params.get('mobile'));  findcard(params.get('mobile'))  }
            else if (params.has('num')) {setSearchval("num"); setBb(params.get('num'));  findcard(params.get('num'))  }
            else if (params.has('id')) {setSearchval("id"); setBb(params.get('id'));  findcard(params.get('id')) } 
            // console.log('bb=', bb, params.get('id')) ; 
            
        }
      },[]);

      function findcard(id){console.log('aabbcc', searchval, bb, id)  
          let ab;    
          if(bb) ab = bb;
          else ab = id;
          fetch('/api/card', {
            headers: {"Content-Type": "application/x-www-form-urlencoded",},
            method: "post",
            body: `searchval=${searchval}&val=${ab}`,      
            })          
          .then(response => response.json())	//json(), blob(), formData() and arrayBuffer()
          .then(data => {
            console.log('fetch', data.data)
            let d = data.data;  
            let link = <a href={"card?id=" + d._id['$oid']}>{d._id['$oid']}</a>
            setSearchmsg(<div> _id: {link} bal: {d.balance} ct: {d.card_type} mob: {d.mobile} num: {d.number} st: {d.status}</div>)
            
          })
          .catch(error => {
            console.log('aldaa garalaa', error)
          });
      }


      return  <div>
        <select value={searchval} onChange={(e)=>setSearchval(e.target.value)}>
            <option value="mobile">mobile</option>
            <option value="num">num</option>
            <option value="id">id</option>
          </select>
          <input type="text" value={bb} placeholder={searchval} onChange={(e)=>{setBb(e.target.value)}} />  113
          <input type="button" value="send" onClick={findcard}/> 
          <span>{searchmsg}</span>
      </div>

}
const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<Card />);






























