const {useState, useEffect} = React

function Card(){
    const [searchval, setSearchval] = useState("id");
    const [bb, setBb] = useState("");
    useEffect(() => {

        console.log('load')
        const params = new URLSearchParams(window.location.search); console.log('params', params, params.has('id'), params.get('id'))
        if (params.has('mobile') || params.has('regno') || params.has('id')) {
            if (params.has('mobile')) {setSearchval("mobile"); setBb(params.get('mobile'));   }
            else if (params.has('regno')) {setSearchval("regno"); setBb(params.get('regno'));   }
            else if (params.has('id')) {setSearchval("id"); setBb(params.get('id'));   } 
        }
      },[]);

      return  <div>
        <select value={searchval} onChange={(e)=>setSearchval(e.target.value)}>
            <option value="mobile">mobile</option>
            <option value="regno">regno</option>
            <option value="id">id</option>
          </select>
          <input type="text" value={bb} placeholder={searchval} onChange={(e)=>{setBb(e.target.value)}} />
          <span>{bb}</span>
      </div>

}
const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<Card />);






























