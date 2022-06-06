const {useState} = React
        

  
       
        function NumInputComp(){
          const [num, setNum] = useState("");
          const [msg, setMsg] = useState("");
          function initmsg(d){
            let m = []
            if (d.cards && d.cards.length === 0)
                  m.push(  <span>msg энэ дугаар дээр бүртгэлтэй карт олдсонгүй. </span>)
            else if (d.cards.length > 0){
                  m.push(  <span> {d.cards[0].cons.length} cards oldloo. cards: <a href={`card?id=${d.cards[0]._id['$oid']}`} target="_blank">{d.cards[0]._id['$oid']}</a></span> )
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
        function MobileInputComp(){
          const [val, setVal] = useState("");
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
            <input type='text' name='mobile' value={val} placeholder='mobile' onChange={(e) => {setVal(e.target.value)}}/>            
            <input type="button" value="[]" onClick={()=>check_mobile(val,  initmsg)}/> 
            {msg}
          </div>
        }
        function Items(){
          const [code, setCode] = useState();
          const [name, setName] = useState();
          const [quantity, setQuantity] = useState();
          const [price, setPrice] = useState();
          const [unit, setUnit] = useState();
          const [total_price, setTotal_price] = useState();
          return <div>
            <input type='text' name='code' value={code} placeholder='code' onChange={(e) => {setCode(e.target.value)}}/> <span>{setCode}</span> 
            <input type='text' name='name' value={name} placeholder='name' onChange={(e) => {setName(e.target.value)}}/> <span>{setName}</span>
            <input type='text' name='quantity' value={quantity} placeholder='quantity' onChange={(e) => {setQuantity(e.target.value)}}/> <span>{setQuantity}</span>
            <input type='text' name='price' value={price} placeholder='price' onChange={(e) => {setPrice(e.target.value)}}/> <span>{setPrice}</span>
            <input type='text' name='unit' value={unit} placeholder='unit' onChange={(e) => {setUnit(e.target.value)}}/> <span>{setUnit}</span>
            <input type='text' name='total_price' value={total_price} placeholder='total_price' onChange={(e) => {setTotal_price(e.target.value)}}/> <span>{setTotal_price}</span>
            </div>
        }
        function MyApp() {
          var today = new Date();
          var cc = today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2);
            
            
            const [date, setDate] = useState(cc);
            const [billno, setBillno] = useState("test2750187872");
            const [spam, setSpam] = useState();
            const [bam, setBam] = useState();
            const [bp, setBp] = useState();
            const [ta, setTa] = useState();
            const [ca, setCa] = useState();
            const [terid, setTerid] = useState();
            const [internum, setInternum] = useState();

            const [items, setItems] = useState([Items,Items,Items ]);
            

            function handleCheckboxChange(t){
              
            }


          return <div>
              <NumInputComp/>
              <MobileInputComp/>
              <div class="input-group mb-3"><input type='date' name='ognoo' value={cc} placeholder='ognoo' onChange={(e) => {setDate(e.target.value)}}/> <span>{date}</span> </div>
              <div class="input-group mb-3"><input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"  name='billno' value={billno} placeholder='billno' onChange={(e) => {setBillno(e.target.value)}}/> <span>{billno}</span></div> 
              <div class="input-group mb-3"><input type='text' class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"  name='spam' value={spam} placeholder='spam' onChange={(e) => {setBam(e.target.value)}}/> <span>{spam}</span> </div>
              <div class="input-group mb-3"><input type='text' class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"  name='bam' value={bam} placeholder='bam' onChange={(e) => {setBam(e.target.value)}}/> <span>{bam}</span> </div>
              <div class="input-group mb-3"><input type='text' class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"  name='bp' value={bp} placeholder='bp' onChange={(e) => {setBp(e.target.value)}}/> <span>{bp}</span> </div>
              <div class="input-group mb-3"><input type='text' class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"  name='ta' value={ta} placeholder='ta' onChange={(e) => {setTa(e.target.value)}}/> <span>{ta}</span> </div>
              <div class="input-group mb-3"><input type='text' class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"  name='ca' value={ca} placeholder='ca' onChange={(e) => {setCa(e.target.value)}}/> <span>{ca}</span> </div>
              <div class="input-group mb-3"><input type='text' class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"  name='terid' value={terid} placeholder='terid' onChange={(e) => {setTerid(e.target.value)}}/> <span>{terid}</span> </div>
              <div class="input-group mb-3"><input type='text' class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"  name='internum' value={internum} placeholder='internum' onChange={(e) => {setInternum(e.target.value)}}/> <span>{internum}</span> </div>
              {items} 
              <input type='checkbox' value='items' onChange={()=>setItems(o => [...o, <Items/>])}/>
            </div>
        
        }
  
        const container = document.getElementById('root');
        const root = ReactDOM.createRoot(container);
        root.render(<MyApp />);