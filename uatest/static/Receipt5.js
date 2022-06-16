const {useState, useEffect, useRef, useImperativeHandle} = React
const {BrowserRouter, Routes, Route, reactRouter, Link} = ReactRouterDOM
        
const ProgbarComp = React.forwardRef((props, ref) => {    
    let pbx =0;
    const [stylepb, setStylePb] = useState("0%"); //const [stylepb, setStylePb] = useState("width: 0%"); 
    function incProgbar(){console.log('pbx', pbx)
        pbx+=5;
        setStylePb(pbx + "%")
    }
    useImperativeHandle(ref, () => ({    
            start(){
                return setInterval(incProgbar, 1000); 
            },
            stop(id){
                clearInterval(id); pbx = 0; setStylePb("0%");
            }       
    }));
    return  <div className="progress">
        <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" style={{width: stylepb}} aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">{stylepb}</div>        
    </div> 
})

function TokenInputComp({token, setToken}){
    const [msg, setMsg] = useState("");

    function initmsg(d){
        let con_tokens = d.con_tokens; console.log('con_tokens', con_tokens)
        let mer_tokens = d.mer_tokens; console.log('mer_tokens', mer_tokens)
        let m = []
        if(con_tokens.length == 0 ) {m.push(<span>Энэ утас дээр бүртгэлтэй хэрэглэгч олдсонгүй. </span>)  } 
        else { m.push(<span> {con_tokens.length}  хэрэглэгч олдлоо. <a href={`con?mobile=${con_tokens[0].mobile }`}> {con_tokens[0].mobile } </a> </span>)} 
        if(mer_tokens.length == 0 ) {m.push( <span>mer_tokens олдсонгүй.</span>) } 
        else { m.push( <span>{mer_tokens.length} mer олдлоо. ${mer_tokens[0].name}</span> )} 
        setMsg(m)
    }

    return <div>
    <input type="text" value={token} placeholder="token" onChange={(e)=>setToken(e.target.value)} />
    <select value={token} onChange={(e)=>setToken(e.target.value)}>
        <option value="">tokens</option>
        <option value="7900b7fe2e28fa86cda82cd11b204e13ae9097e2">Nomin</option>
        <option value="83027b6ff8ba971fd07d48a3d67a544a6ee28104">DDISHTV</option>
        <option value="74b799b979e77e54fbdd6bc3c2b4761e1a487be2">Monos UB</option>
        <option value="747a67c09f665701e723e1652253394c2f32a11e">Unitel</option>
        <option value="024164dc1a027029d3d59cfc988ef6f15231d94c">MetroExpress</option>
        <option value="8b8a09a36f9e3e80ffadd81f8daed268800a470d">Univision</option>
        <option value="06be024370fca7aaf0a4c2aa9caa91f47da02e5c">UA</option>
    </select>
    <input type="button" value="[]" onClick={()=>check_token(token, initmsg)}/>{msg}
    </div>
}   
function NumInputComp({num, setNum}){    
    const [msg, setMsg] = useState("");
    function initmsg(d){
        let m = []
        if (d.cards && d.cards.length === 0)
                m.push(  <span>msg энэ дугаар дээр бүртгэлтэй карт олдсонгүй. </span>)
        else if (d.cards.length > 0){
            m.push(  <span> {d.cards[0].length} cards oldloo. cards: <a href={`card?id=${d.cards[0]._id['$oid']}`} target="_blank">{d.cards[0]._id['$oid']}</a></span> )
            if (d.cards[0].cons.length === 0){m.push( <span> msg: энэ дугаар дээр бүртгэлтэй хэр олдсонгүй. </span>)}
            else if (d.cards[0].cons.length > 0){
            m.push(<span> {d.cards[0].cons.length} cons oldloo. cons: <a href={`main?id=${d.cards[0].cons[0]._id}`} target="_blank">{d.cards[0].cons[0]._id}</a> </span>)
            }
        }
        setMsg(m)
    }
    return <div>
    <input type='text' name='num' value={num} placeholder='num' onChange={(e) => {setNum(e.target.value)}}/>            
    <input type="button" value="[]" onClick={()=>check_num(num,  initmsg)}/> 
    {msg}
    </div>
}
function MobileInputComp({mobile, setMobile}){    
    const [msg, setMsg] = useState("");
    function initmsg(d){
    let m = []     
    if (d.cons && d.cons.length === 0)
            m.push(  <span>msg энэ дугаар дээр бүртгэлтэй хэр олдсонгүй. </span>)
    else if (d.cons.length > 0){
            m.push(  <span> {d.cons.length} cons oldloo. cons: <a href={`main?id=${d.cons[0]._id}`} target="_blank">{d.cons[0]._id}</a></span> )
    }
    if (d.cards.length === 0){m.push( <span> msg: энэ утас дээр бүртгэлтэй карт олдсонгүй. </span>)}
    else if (d.cards.length > 0){
        m.push(<span> {d.cards.length} cards oldloo. cons: <a href={`card?id=${d.cards[0]._id['$oid']}`} target="_blank">{d.cards[0]._id['$oid']}</a> </span>)
    }
    setMsg(m)
    }
    return <div>
    <input type='text' name='mobile' value={mobile} placeholder='mobile' onChange={(e) => {setMobile(e.target.value)}}/>            
    <input type="button" value="[]" onClick={()=>check_mobile(val,  initmsg)}/> 
    {msg}
    </div>
}
function ReceiptInputComp({receipt, setReceipt}){    
    const [msg, setMsg] = useState("");
    const pbref= useRef();
    let intid;

    function initmsg(d){
        pbref.current.stop(intid)
        let m = []     
        if (d.receipt && d.receipt.length === 0)
                m.push(  <span>msg энэ дугаар дээр бүртгэлтэй гүйлгээ олдсонгүй. </span>)
        else if (d.receipt.length > 0){
                m.push(  <span> {d.receipt.length} receipt oldloo. cons: <a href={`card?num=${d.receipt[0].card_number}`} target="_blank">{d.receipt[0].card_number}</a></span> )
        }       
        setMsg(m)
    }
    return <div>
    <input type="text" className="form-control" name='receipt' value={receipt} placeholder='receipt' onChange={(e) => {SetReceipt(e.target.value)}}/> 
    <input type="button" value="[]" onClick={()=>{intid =  pbref.current.start();  check('/api/check_receipt?receipt=' + receipt,  initmsg)  }}/> 
    {msg} <ProgbarComp ref={pbref} />
    </div>
}
function BillInputComp({billno, setBillno}){    
    const [msg, setMsg] = useState("");
    const pbref= useRef();
    let intid;

    function initmsg(d){
        pbref.current.stop(intid)
        let m = []     
        if (d.receipt && d.receipt.length === 0)
                m.push(  <span>msg энэ дугаар дээр бүртгэлтэй гүйлгээ олдсонгүй. </span>)
        else if (d.receipt.length > 0){
                m.push(  <span> {d.receipt.length} receipt oldloo. cons: <a href={`card?num=${d.receipt[0].card_number}`} target="_blank">{d.receipt[0].card_number}</a></span> )
        }       
        setMsg(m)
    }
    return <div>
    <input type="text" className="form-control" name='billno' value={billno} placeholder='billno' onChange={(e) => {setBillno(e.target.value)}}/> 
    <input type="button" value="[]" onClick={()=>{intid =  pbref.current.start();  check('/api/check_billno?billno=' + billno,  initmsg)  }}/> <ProgbarComp ref={pbref} />
    {msg}
    </div>
}
const Items =  React.forwardRef((props, ref) => {
    const [code, setCode] = useState(1);
    const [name, setName] = useState(2);    
    const [quantity, setQuantity] = useState(3);
    const [price, setPrice] = useState(4);
    const [unit, setUnit] = useState(5);
    const [total_price, setTotal_price] = useState(6);
    useImperativeHandle(ref, () => ({getMyState: () => {return {name, code, quantity, price, unit, total_price}}}), [name, code, quantity, price, unit, total_price]);
    return <div>
    <input type='text' name='code' value={code} placeholder='code' onChange={(e) => {setCode(e.target.value)}}/> <span>vvv{code}</span> 
    <input type='text' name='name' value={name} placeholder='name' onChange={(e) => {setName(e.target.value)}}/> <span>ddd{name}</span>
    <input type='text' name='quantity' value={quantity} placeholder='quantity' onChange={(e) => {setQuantity(e.target.value)}}/> <span>{quantity}</span>
    <input type='text' name='price' value={price} placeholder='price' onChange={(e) => {setPrice(e.target.value)}}/> <span>{price}</span>
    <input type='text' name='unit' value={unit} placeholder='unit' onChange={(e) => {setUnit(e.target.value)}}/> <span>{unit}</span>
    <input type='text' name='total_price' value={total_price} placeholder='total_price' onChange={(e) => {setTotal_price(e.target.value)}}/> <span>{total_price}</span>
    </div>
})
function Return(){
    const pbref= useRef();
    const [token, setToken] = useState("7900b7fe2e28fa86cda82cd11b204e13ae9097e2")
    const [spam, setSpam] = useState(0);
    const [bam, setBam] = useState(3750);
    const [ca, setCa] = useState(3750);
    const [receipt, setReceipt] = useState("5b0b79293e6ae53f3e269898");
    const [items, setItems] = useState([]); 
    const myRefs= useRef([]);

    function sendreturn(id){//console.log('aabb 123')
        
        // console.log('myRefs', myRefs)
        let intid =  pbref.current.start()
        let ivalues = []        
        for (let i=0; i< myRefs.current.length; i++){
            console.log('aabb 321', myRefs.current[i].getMyState() ,  )//items[i].ref.current.getMyState() rf.current.state.name
            ivalues.push(myRefs.current[i].getMyState())
        }
        console.log('ivalues', ivalues)
        // if(bb) ab = bb;
        // else ab = id;
        fetch('/api/return', {
        headers: {"Content-Type": "application/json",},
        method: "post",
        body: JSON.stringify({  
            token:token,          
            receipt: receipt,
            spam:spam,
            bam:bam,
            ca:ca,
            ivalues: ivalues
            })      
        })          
        .then(response => response.json())	//json(), blob(), formData() and arrayBuffer()
        .then(data => {
            console.log('fetch', data.data)
            //let d = data.data;  
            //let link = <a href={"card?id=" + d._id['$oid']}>{d._id['$oid']}</a>
            //setSearchmsg(<div> _id: {link} bal: {d.balance} ct: {d.card_type} mob: {d.mobile} num: {d.number} st: {d.status}</div>)
        })
        .catch(error => {console.log('aldaa garalaa', error) })
        .finally(()=>{ /*stop*/  pbref.current.stop(intid) })
    }

    useEffect(() => {
        // rf = React.createRef();
    },[]);

    return <div>
        <Link to="/receipt">receipt</Link>  
        <TokenInputComp token={token} setToken={setToken}/>
        <ReceiptInputComp receipt={receipt} setReceipt={setReceipt} />
        <input type='text' className="form-control" name='spam' value={spam} placeholder='spam' onChange={(e) => {setSpam(e.target.value)}}/> 
        <input type='text' className="form-control" name='bam' value={bam} placeholder='bam' onChange={(e) => {setBam(e.target.value)}}/> 
        <input type='text' className="form-control" name='ca' value={ca} placeholder='ca' onChange={(e) => {setCa(e.target.value)}}/> 
        {items} 
        <input type='checkbox' value='items' onChange={()=>setItems(o => [...o, <Items ref={el => (myRefs.current[o.length] = el)}  />])}/>      
        <input type="button" value="send" onClick={sendreturn}/>    <ProgbarComp ref={pbref} />
    </div>
}
function Receipt() {
    const pbref= useRef();
    const myRefs= useRef([]);

    var today = new Date();
    var cc = today.getFullYear() + '/' + ('0' + (today.getMonth() + 1)).slice(-2) + '/' + ('0' + today.getDate()).slice(-2);
    
    const [token, setToken] = useState("7900b7fe2e28fa86cda82cd11b204e13ae9097e2")
    const [mobile, setMobile] = useState("");
    const [num, setNum] = useState("");
    const [date, setDate] = useState(cc);
    const [billno, setBillno] = useState("test275018785");
    const [spam, setSpam] = useState(0);
    const [bam, setBam] = useState(3750);
    const [bp, setBp] = useState(113);
    const [ta, setTa] = useState(3750);
    const [ca, setCa] = useState(3750);
    const [terid, setTerid] = useState(123);
    const [internum, setInternum] = useState("");
    const [items, setItems] = useState([]);   

    
  
   
    function sendreceipt(id){//console.log('aabb 123')

        //start
        console.log('myRefs', pbref)
        let intid =  pbref.current.start()
        let ab;  
        // console.log(token,mobile,num,date,billno,spam,bam,bp,ta,ca,terid,internum,items)  
        let ivalues = []
        
        for (let i=0; i< myRefs.current.length; i++){
            console.log('aabb 321', myRefs.current[i].getMyState() ,  )//items[i].ref.current.getMyState() rf.current.state.name
            ivalues.push(myRefs.current[i].getMyState())
        }
        console.log('ivalues', ivalues)
        // if(bb) ab = bb;
        // else ab = id;
        fetch('/api/receipt', {
        headers: {"Content-Type": "application/json",},
        method: "post",
        body: JSON.stringify({  
            token:token,          
            cnum: num,
            mobile: mobile,
            inum:internum,
            date:date + " 00:00:00",
            bnum:billno,
            spam:spam,
            bam:bam,
            bp:bp,
            ta:ta,
            ca:ca,
            terid:terid,
            ivalues: ivalues
            })      
        })          
        .then(response => response.json())	//json(), blob(), formData() and arrayBuffer()
        .then(data => {
            console.log('fetch', data.data)
            //let d = data.data;  
            //let link = <a href={"card?id=" + d._id['$oid']}>{d._id['$oid']}</a>
            //setSearchmsg(<div> _id: {link} bal: {d.balance} ct: {d.card_type} mob: {d.mobile} num: {d.number} st: {d.status}</div>)
        })
        .catch(error => {console.log('aldaa garalaa', error) })
        .finally(()=>{ /*stop*/  pbref.current.stop(intid) })
    }
    useEffect(() => {
        // rf = React.createRef();
    },[]);

    return <div>   
         <Link to="/return">return</Link>       
        <TokenInputComp token={token} setToken={setToken}/>
        <NumInputComp num={num} setNum={setNum}/>
        <MobileInputComp mobile={mobile} setMobile={setMobile}/>
        <input type='date' className="form-control" name='ognoo' value={cc} placeholder='ognoo' onChange={(e) => {setDate(e.target.value)}}/> 
        <BillInputComp billno={billno} setBillno={setBillno}/>
        <input type='text' className="form-control" name='spam' value={spam} placeholder='spam' onChange={(e) => {setSpam(e.target.value)}}/> 
        <input type='text' className="form-control" name='bam' value={bam} placeholder='bam' onChange={(e) => {setBam(e.target.value)}}/> 
        <input type='text' className="form-control" name='bp' value={bp} placeholder='bp' onChange={(e) => {setBp(e.target.value)}}/> 
        <input type='text' className="form-control" name='ta' value={ta} placeholder='ta' onChange={(e) => {setTa(e.target.value)}}/> 
        <input type='text' className="form-control" name='ca' value={ca} placeholder='ca' onChange={(e) => {setCa(e.target.value)}}/> 
        <input type='text' className="form-control" name='terid' value={terid} placeholder='terid' onChange={(e) => {setTerid(e.target.value)}}/> 
        <input type='text' className="form-control" name='internum' value={internum} placeholder='internum' onChange={(e) => {setInternum(e.target.value)}}/> 
        {items} 
        <input type='checkbox' value='items' onChange={()=>setItems(o => [...o, <Items ref={el => (myRefs.current[o.length] = el)}  />])}/>      
        <input type="button" value="send" onClick={sendreceipt}/>    <ProgbarComp ref={pbref} />
       
    </div>

}

function MyApp(){
    return <BrowserRouter>  
     <Routes>
        <Route path="receipt" element={<Receipt />} />
        <Route path="return" element={<Return />} />
      </Routes>
    </BrowserRouter>
}

// const root = ReactDOM.createRoot(document.getElementById("root")
//   );
//   root.render(
const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<MyApp />);