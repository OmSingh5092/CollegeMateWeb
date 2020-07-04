

export const getPercentage = (data)=>{
    try{
        var present = 0;

        data.map((item,index)=>{
            if(item.is_present){
                present++;
            }
        })
        var percentage = (present/data.length)*100;

        return Math.round(percentage);
    }catch(err){
        console.log(err);
        return 0;
    }
}