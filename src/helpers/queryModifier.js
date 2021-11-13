
// for pagination ,sort ,search 

const modifyQueryData = async(data)=>{
  
 
     data.field !== ''  && data.field !== 'undefined'?  data.field = String(data.field).split(',').join(' '):'';
     data.search !== ''  && data.search == 'undefined' ?  data.search = String(data.search):'';
  
     const temp ={
        field : data.field || null,
        sort   : data.sort   || null,
        filter : data.filter || null,
        page   : data.page   ||  1,
        limit  : data.limit  ||  10,
        search : data.search ||  ''
    };
  
  
    return temp;  

}

module.exports = modifyQueryData;