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
    <input type="button" value="[]" onClick={()=>check('/api/check_token?token=' + token, initmsg)}/>{msg}
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
    <input type="button" value="[]" onClick={()=>check('/api/check_num?num='+num,  initmsg)}/> 
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
    <input type="button" value="[]" onClick={()=>check('/api/check_mobile?mobile='+mobile,  initmsg)}/> 
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
        <NavComp active='return'/>
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
    const [num, setNum] = useState("4850345233527525");
    const [date, setDate] = useState(cc);
    const [billno, setBillno] = useState("test2750187872");
    const [spam, setSpam] = useState(0);
    const [bam, setBam] = useState(3750);
    const [bp, setBp] = useState(113);
    const [ta, setTa] = useState(3750);
    const [ca, setCa] = useState(3750);
    const [terid, setTerid] = useState(123);
    const [internum, setInternum] = useState("");
    const [items, setItems] = useState([]);   

    
  
   
    function sendreceipt(id){//console.log('aabb 123')
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
        <NavComp active='receipt'/>
         
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


function NavComp({active}){

    return <nav class="navbar navbar-expand-sm bg-light">
            <div class="container-fluid">
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                    <Link class={`nav-link ${ active == 'home' ? 'active' : ''}`}   aria-current="page" to="/">Home </Link>
                    </li>
                    <li class="nav-item">
                    <Link class={`nav-link ${ active == 'receipt' ? 'active' : ''}`} aria-current="page" to="/receipt">receipt </Link>
                    </li>
                    <li class="nav-item">
                    <Link class={`nav-link ${ active == 'return' ? 'active' : ''}`} aria-current="page" to="/return">return </Link>
                    </li>
                    <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Dropdown
                    </a>
                    <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <li><a class="dropdown-item" href="#">Action</a></li>
                        <li><a class="dropdown-item" href="#">Another action</a></li>
                        <li><hr class="dropdown-divider"/></li>
                        <li><a class="dropdown-item" href="#">Something else here</a></li>
                    </ul>
                    </li>
                    <li class="nav-item">
                    <a class="nav-link disabled">Disabled</a>
                    </li>
                </ul>
                
                </div>
            </div>
            </nav>
}
function ConsumerComp(){
    const [searchval, setSearchval] = useState("mobile")
    const [bb, setBb] = useState("99665532")
    const [con, setCon] = useState([]);
    const [cards, setCards] = useState([])

    const [receipt, setReceipt] = useState();
    const [cnt, setCnt] = useState(856367856436756);

    let intid = ""
    const pbref= useRef();  //pbref.current.stop(intid) 
 
    function getreceipt(d){console.log('getreceipt', d);
            pbref.current.stop(intid) 
            let data = d.data; 
            if(data.length >0){   //tuhain card receipttei eseh  
                let trs = []; 
                for(let j=0; j<data.length; j++){console.log('orloo')
                    trs.push(<tr key={j}><td>{data[j].bill_number}</td><td> {data[j].created_at['$date']}</td><td> {data[j].card_number}</td><td> {data[j].spend_amount}</td><td> {data[j].bonus_amount}</td><td> {data[j].total_amount}</td><td> {data[j].cash_amount}</td><td> {data[j].bonus_amount}</td><td> {data[j].terminal_token}</td><td> {data[j].customer_token}</td><td> {data[j].total_point}</td><td> {data[j].before_balance}</td><td> {data[j].point_balance}</td><td> {data[j].customer_mobile} </td><td></td></tr>) //<td>{data[j].rec_return.length}</td>
                    // let rec_return_str = ``
                    // if(data[j].rec_return.length >0){    //tuhain receipt returntei eseh
                    //     let rec_return =  c[i].data[j].rec_return;                                
                    //     for(let p=0; p<rec_return.length; p++){
                    //         rec_return_str += `bef_bal:${rec_return[p].before_balance} bpt_bal:${rec_return[p].point_balance} `
                    //     }                                
                    // } else {rec_return_str = ` rec return len = ${data[j].rec_return.length}`}      
                    // receipt_str += `<tr><td colspan=15>${rec_return_str}<td></tr>`                     
                }
                setReceipt(<div key={1} class="table-responsive"><table class="table table-bordered table-responsive"><thead class="table-light"><tr><th>billno:</th><th>cDate:</th><th>card_no:</th><th>samo:</th><th>bamo:</th><th>tamo:</th><th>camo:</th><th>bonamo:</th><th>tertoken:</th><th>custoken:</th><th>totpoint:</th><th>befbal:</th><th>poibal:</th><th>cusmob:</th><th>is_returnCnt</th></tr></thead>
                <tbody>{trs}</tbody></table></div>) 
                // setReceipt( <div>asdbadsf</div>); setReceipt(<div>asdbadsf</div>); console.log('receipt123', receipt)
                // setCnt((o)=>o + 10);console.log('setCnt', cnt)
            }
        } 

    function findcon(d){    console.log('findcon', d)    
        d = d.data
        pbref.current.stop(intid) 
        if(!d)  { //setRen( (o)=>[...o, <div key={10} class="alert alert-secondary fw-bold" role="alert">Системд бүртгэлгүй хэрэглэгч</div>])
        } 
        else {  //hereglegch oldson bol               
            // setRen((o)=>[...o, <div key={10}>
            // <div class="alert alert-secondary fw-bold" role="alert">Хэрэглэгчийн мэдээлэл</div>
            // <div class="table-responsive">
            // <table class="table table-bordered">
            //     <thead class="table-lidarkght"><tr><th>_id</th><th>regno</th><th>mob</th><th>cardslen</th><th>token</th><th>bal</th><th>bs</th><th>isfam</th></tr></thead>
            //     <tbody>
            //         <tr>                                
            //             <td className='w-15' >{d._id}</td>
            //             <td className='w-20' >{d.profile.registration_number}</td>
            //             <td className='w-15' >{d.mobile}</td>
            //             <td>{d.cards.length}</td>
            //             <td>{d.token}</td>
            //             <td className='w-10' >{d.balance}</td>
            //             <td>{d.balance_status}</td>
            //             <td>{d.is_family}</td>
            //         </tr>
            //     </tbody>
            // </table>
            // </div></div>])
        }
        if (d.collective ){
            let c = d.collective;
            let coll =[]
            if (c.famgr){    //family_group-d burtgeltei eseh
                coll.push( <div key={1}><p><b>Family_group</b></p>
                    <table className="table span12 table-striped table-hover table-bordered">
                        <thead><tr><th>fam_id: </th><th>fam_name: </th><th>bal: </th></tr></thead>
                        <tbody><tr>
                            <td class="w-20">{c.famgr.family_id}</td>
                            <td class="w-20">{c.famgr.family_name}</td>
                            <td>{c.famgr.balance}</td>
                        </tr></tbody>
                    </table>
                    </div>
                )
            }
            if( c.congroups && c.congroups.length>0){
                let trs = [];
                for(let g=0; g<c.congroups.length; g++){  
                    trs.push( 
                        <tr key={g}>                            
                            <td class="w-20">{c.congroups[g].group['$oid']}</td>
                            <td class="w-20">{c.congroups[g].is_admin}</td>
                            <td>{ c.congroups[g].consumer == d._id ? c.congroups[g].consumer : <a href={`/con?id=${c.congroups[g].consumer}`} target="_blank">{c.congroups[g].consumer}</a>}</td>                        
                        </tr>)
                }
                coll.push(  <div key={2}><p><b>Consumer_family</b></p>                
                <table class="table span12 table-striped table-hover table-bordered"><thead><tr><th>group: </th><th>isadmin: </th><th>consumer: </th></tr></thead>
                    <tbody>{trs}</tbody>
                </table></div>
                )
            }
            if(c.gr_req && c.gr_req.length >0 ){
                let trs =[]
                for(let h=0; h<c.gr_req.length; h++){   
                    trs.push(
                    <tr key={h}>
                        <td className="w-20">{c.gr_req[h].created_at['$date']}</td>
                        <td className="w-20">{c.gr_req[h].status}</td>
                        <td>{c.gr_req[h].consumer}</td>                            
                    </tr>)
                }
                coll.push( <div key={3}><p><b>Group_request</b></p>            
                <table class="table span12 table-striped table-hover table-bordered"><thead><tr><th>cr_at: </th><th>st: </th><th>conid: </th></tr></thead>
                    <tbody>{trs}</tbody>
                </table></div>)
            }
            if (c.con_coll && c.con_coll.length>0){
                let trs =[]
                for(let k=0; k<c.con_coll.length; k++){ 
                    trs.push(
                    <tr key={k}>
                        <td>{c.con_coll[k].created_at['$date']}</td>
                        <td>{c.con_coll[k].sender}</td>
                        <td>{c.con_coll[k].sender_mobile}</td>    
                        <td>{c.con_coll[k].is_sender}</td>
                        <td>{c.con_coll[k].receiver}</td>
                        <td>{c.con_coll[k].receiver_mobile}</td>
                        <td>{c.con_coll[k].is_receiver}</td>
                        <td>{c.con_coll[k].group['$oid']}</td>
                        <td>{c.con_coll[k].group_id}</td>
                    </tr>)
                }            
                coll.push( <div key={4}> <span>consumer_collection</span>
                <div className="table-responsive">
               <table class="table table-striped table-hover table-bordered"><tr><th>cr_at: </th><th>sender:</th><th>sender_mobile:</th><th>sender_mobile:</th><th>is_sender:</th><th>receiver: </th><th>receiver_mobile:</th><th>is_receiver</th><th>group</th><th>group_id</th></tr>
                    {trs}
                </table></div></div>)
            }   
            setRen((o)=>[...o, <span key={11}>
                <button type="button" class="btn btn-light" data-bs-toggle="collapse" data-bs-target="#collective">collective({c && c.congroups && c.congroups.length || 0})</button>
                <div id="collective" class="collapse">{coll}</div>
                </span>
            ])  

             
        }        
        //else {setRen( <button type="button" class="btn btn-info" disabled>collective(0)</button>)}  //collective bhq bol. gehdee yamr neg data zaaval irheer programchilsan uchir ene else hereggui bollo

        let ca = d.concards; 
        
        for (let i=0; i<ca.length; i++){//tuhain consumeriin cards-n toogoor davtana. 
            // console.log('ca', ca[i].number)
            let cardid=d.cards[i]['$oid'];  //card buriin id ni cardid-d onoogdono. 
            cards.push(
                <div key={i} class="accordion-item">
                    <h2 class="accordion-header" id="heading${i}">                            
                        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${i}`} aria-expanded="false" aria-controls={`collapse${i}`} 
                        onClick={(e)=>{ if(e.target.attributes['aria-expanded'].value == "true"){ console.log('orloo'); intid = pbref.current.start(intid) ;  check('/api/receipt?cnum='+ca[i].number, getreceipt)  }}}>card#${i+1} _id: <a href={`card?id=${cardid}`}>{cardid}</a> num: {ca[i].number} ct: {ca[i].card_type} bal: {ca[i].balance} st: {ca[i].status}  mobile: {ca[i].mobile} <span class="badge text-bg-secondary">receiptCnt</span></button>
                    </h2>
                    <div id={`collapse${i}`} class="accordion-collapse collapse" aria-labelledby={`heading${i}`} data-bs-parent="#accordion"><div class="accordion-body">receipt {receipt}  haij123 {cnt} bn. </div></div>
                </div>
            )
        }
        // setRen((o)=>[...o,  <div key={5} class="accordion" id="accordion">
        //     {cards}
        // </div>
        // ]) 

        
        
    }
   

    return <div>
        <div class="container-flued">
            <div class="row">
                <div class="col-2">
                    <select class="form-select" aria-label="Default select example" value={searchval} onChange={(e)=>setSearchval(e.target.value)}>
                        <option value="mobile">mobile</option>
                        <option value="regno">regno</option>
                        <option value="id">id</option>
                    </select>
                </div>
                <div class="col-6">
                    <input type="text" class="form-control" value={bb} placeholder={searchval} onChange={(e)=>setBb(e.target.value)}/>
                </div>
                <div class="col-1">
                    <input type="button" class="btn btn-secondary" value="send" onClick={ ()=>{intid =  pbref.current.start();  check('/api/cons?'+ searchval +"="+bb, findcon )  }}/>  
                </div>
                <div class="col-3">
                    
                </div>
            </div>
            <div className='row' >
                {con ? <div  >
                {con.length==0 ?<div class="alert alert-secondary fw-bold" role="alert">Системд бүртгэлгүй хэрэглэгч</div>
                : <div> 
                <div class="alert alert-secondary fw-bold" role="alert">Хэрэглэгчийн мэдээлэл</div>
                <div class="table-responsive">
                <table class="table table-bordered">
                    <thead class="table-lidarkght"><tr><th>_id</th><th>regno</th><th>mob</th><th>cardslen</th><th>token</th><th>bal</th><th>bs</th><th>isfam</th></tr></thead>
                    <tbody>
                        <tr>                                
                            <td className='w-15' >{d._id}</td>
                            <td className='w-20' >{d.profile.registration_number}</td>
                            <td className='w-15' >{d.mobile}</td>
                            <td>{d.cards.length}</td>
                            <td>{d.token}</td>
                            <td className='w-10' >{d.balance}</td>
                            <td>{d.balance_status}</td>
                            <td>{d.is_family}</td>
                        </tr>
                    </tbody>
                </table>
                </div></div></div>
                : ''}
            </div>
            <div className='row'>
                <div key={5} class="accordion" id="accordion">
                    {cards}
                </div>
            </div>
            <div className='row'>
                {receipt}
            </div>
            </div>
            <ProgbarComp ref={pbref} /> 
    </div>
}
function Home(){

    return <div>
        <NavComp active='home'/>
        <ConsumerComp />
        
    </div>
}


function Index(){

    return <BrowserRouter>  
    <Routes>
        <Route path="" element={<Home />} />       
        <Route path="receipt" element={<Receipt />} />
        <Route path="return" element={<Return />} />
     </Routes>
   </BrowserRouter> 
}








const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<Index />);