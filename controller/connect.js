const ds = require('../model/data');

let data = [];

exports.collectData = async ()=>{

    try{

        const firstSl = await ds.execute("SELECT * FROM slotone");
        const secondSl = await ds.execute("SELECT * FROM slottwo");
        const thirdSl = await ds.execute("SELECT * FROM slotthree");
        const fourthSl = await ds.execute("SELECT * FROM slotfour");
       data = [firstSl[0],secondSl[0],thirdSl[0],fourthSl[0]]
    }catch(err){
        console.log(err)
    }

    

    return data;

}
