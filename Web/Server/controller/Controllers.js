// write functions here
// with queries
const db = require("../DB/DBConnect");

//  cust_ssn should be dynamic later
const getCartProducts = async (req, res) => {
  const sql = `select p.product_name,p.count as totalCnt,cc.qty,p.price,p.pid from product p , customer_cart cc, customer c 
where p.pid=cc.p_id and cc.cust_ssn=c.ssn and c.ssn=2;`;

  try {
    const data = await db.execute(sql);

    res.send(data);
  } catch (error) {
    console.log(error);
  }
};

// p_id should be dynamic later
const decProductQtyinCart = async (req, res) => {
  const sql = `update product set count=count+1 where pid=${req.params.id};`;
  const sql2 = `update customer_cart  set qty=qty-1 where p_id=${req.params.id} and cust_ssn=2;`;
  try {
    await db.execute(sql);
    await db.execute(sql2);
    res.send("done dec");
  } catch (error) {
    console.log(error);
  }
};

// ssn should be dynamic later
const incProductQtyinCart = async (req, res) => {
  const sql = `update product set count=count-1 where pid=${req.params.id};`;
  const sql2 = `update customer_cart  set qty=qty+1 where p_id=${req.params.id} and cust_ssn=2;`;
  try {
    await db.execute(sql);
    await db.execute(sql2);
    res.send("done inc");
  } catch (error) {
    console.log(error);
  }
};

// cust_ssn && p_id should be dynamic later
const deleteProductFromCart = async (req, res) => {
  const sql = `delete from customer_cart where p_id=${req.params.id} and cust_ssn=2;`;
  try {
    await db.execute(sql);
    res.send("deleted");
  } catch (error) {
    console.log(error);
  }
};

// cust_ssn mudt be dynamic later
const getProductData = async (req, res) => {
  const sql = `select pid,product_name,price,color,count, su_name, comment,rating, 1 as favorite
from product p,suppliers s,feedback f,favorites fv,customer c
where p.su_id=s.suid and f.p_id=p.pid and fv.p_id=p.pid and fv.cust_ssn=c.ssn and f.cust_ssn=c.ssn and c.ssn=2 
and p.pid=${req.params.id}
union all
select pid,product_name,price,color,count, su_name, comment,rating, 0 as favorite
from product p,suppliers s,feedback f,customer c
where p.su_id=s.suid and f.p_id=p.pid and  f.cust_ssn=c.ssn and c.ssn=2 
and p.pid not in (select p_id from favorites) and p.pid=${req.params.id}`;
  try {
    const data = await db.execute(sql);
    res.send(data);
  } catch (error) {
    console.log(error);
  }
};

const addToCart = async (req, res) => {
  const sql = `insert into customer_cart values(${req.body.cust_ssn},${req.body.pid},${req.body.qty});`;
  const sql2 = `update product set count=count-${req.body.qty} where pid=${req.body.pid};`;
  try {
    await db.execute(sql);
    await db.execute(sql2);
    console.log("enserted");
  } catch (error) {
    console.log(error.sqlMessage);
    if(error.code=='ER_DUP_ENTRY'){
      const sql3 = `update customer_cart  set qty=qty+${req.body.qty} where p_id=${req.body.pid} and cust_ssn=2;`;
      const sql4 = `update product set count=count-${req.body.qty} where pid=${req.body.pid};`;
      try {
        await db.execute(sql3);
        await db.execute(sql4);
      } catch (error) {
        console.log(error.sqlMessage);
      }
    }
  }
};
const getOffersData=async(req,res)=>{
  const sql = `select pid,product_name,price,new_price,start_date,p.end_date,p.desc,rating from product p,feedback f where f.p_id =p.pid and has_offer=1;`;
  try {
    const data=await db.execute(sql);
    res.send(data);
  } catch (error) {
    console.log(error.sqlMessage);
  }
}
module.exports = {
  getCartProducts,
  decProductQtyinCart,
  incProductQtyinCart,
  deleteProductFromCart,
  getProductData,
  addToCart,
  getOffersData,
};
