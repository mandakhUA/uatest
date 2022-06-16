const {useState, useEffect, useRef, useImperativeHandle} = React
        

  
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
    <select onChange={(e)=>setToken(e.target.value)}>
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
function MyApp() {
    // const [rf, setRf] = useState(React.createRef());
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
        let ab;  
        // console.log(token,mobile,num,date,billno,spam,bam,bp,ta,ca,terid,internum,items)  
        let ivalues = []
        console.log('myRefs', myRefs)
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
        .catch(error => {console.log('aldaa garalaa', error) });
    }
    useEffect(() => {
        // rf = React.createRef();
    },[]);

    return <div>          
        <TokenInputComp token={token} setToken={setToken}/>
        <NumInputComp num={num} setNum={setNum}/>
        <MobileInputComp mobile={mobile} setMobile={setMobile}/>
        <input type='date' class="form-control" name='ognoo' value={cc} placeholder='ognoo' onChange={(e) => {setDate(e.target.value)}}/> <span>{date}</span> 
        <input type="text" class="form-control" name='billno' value={billno} placeholder='billno' onChange={(e) => {setBillno(e.target.value)}}/> <span>{billno}</span> 
        <input type='text' class="form-control" name='spam' value={spam} placeholder='spam' onChange={(e) => {setSpam(e.target.value)}}/> <span>{spam}</span> 
        <input type='text' class="form-control" name='bam' value={bam} placeholder='bam' onChange={(e) => {setBam(e.target.value)}}/> <span>{bam}</span> 
        <input type='text' class="form-control" name='bp' value={bp} placeholder='bp' onChange={(e) => {setBp(e.target.value)}}/> <span>{bp}</span>
        <input type='text' class="form-control" name='ta' value={ta} placeholder='ta' onChange={(e) => {setTa(e.target.value)}}/> <span>{ta}</span> 
        <input type='text' class="form-control" name='ca' value={ca} placeholder='ca' onChange={(e) => {setCa(e.target.value)}}/> <span>{ca}</span> 
        <input type='text' class="form-control" name='terid' value={terid} placeholder='terid' onChange={(e) => {setTerid(e.target.value)}}/> <span>{terid}</span> 
        <input type='text' class="form-control" name='internum' value={internum} placeholder='internum' onChange={(e) => {setInternum(e.target.value)}}/> <span>{internum}</span> 
        {items} 
        <input type='checkbox' value='items' onChange={()=>setItems(o => [...o, <Items ref={el => (myRefs.current[o.length] = el)}  />])}/>      
        <input type="button" value="send" onClick={sendreceipt}/>     
    </div>

}
  
const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<MyApp />);