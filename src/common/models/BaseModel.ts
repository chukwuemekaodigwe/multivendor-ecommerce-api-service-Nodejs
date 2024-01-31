import Schema from '../schemas'
export default class BaseModel{
    private modelname
    constructor(modelname){
        this.modelname = Schema(modelname)
    }

    public create(data){
        const result = new this.modelname(data)
        return result.save()
    }

    public findById(id){
        return this.modelname.findById(id)
    }

    public findOne(option){
        return new Promise((resolve, reject) => {
            this.modelname.findOne(option)
            .then((res)=>{
                resolve(res)
            })
            .catch((err)=>{
                reject(err)
            })
        })
    }

    public find(option){
        return new Promise((resolve, reject) => {
            this.modelname.find(option)
            .then((res)=>{
                resolve(res)
            })
            .catch(err=>{
                reject(err)
            })
        })
    }

    public paginate(option:object, pagesize:number, page:number){
        const skip = page === 1 ? 0 : page*pagesize
        return new Promise((resolve, reject) =>{
            this.modelname.find(option)
            .skip(skip)
            .limit(pagesize)
            .exec()
            .then(res=>{
                resolve(res)
            })
            .catch(err=>{
                reject(err)
            })
        })
    }

    public update(option, updateData){
        return new Promise((resolve, reject)=>{
            this.modelname.findOneAndUpdate(option, updateData, {new: true})
            .then(res=>{
                resolve(res)
            })
            .catch(err=>{
                reject(err)
            })
        })
    }

    public remove(option){
        return new Promise((resolve, reject)=>{
            this.modelname.deleteMany(option)
            .then(res=>{
                resolve(res)
            })
            .catch(err=>{
                reject(err)
            })
        })
    }


    public getbyrange(startdate, enddate, page:number, pagesize:number){
        const skip = page === 1 ? 0 : page*pagesize
        return new Promise((resolve, reject) =>{
            this.modelname.find({
                'createdAt': 
                {
                    $gte: new Date(startdate),
                    $lte: new Date(enddate)
                }
            })
            .skip(skip)
            .limit(pagesize)
            .exec()
            .then(res=>{
                resolve(res)
            })
            .catch(err=>{
                reject(err)
            })
        })
    }



    public search(option:object, pagesize:number, page:number){
        const skip = page === 1 ? 0 : page*pagesize
        return new Promise((resolve, reject) =>{
            this.modelname.find(option)
            .skip(skip)
            .limit(pagesize)
            .exec()
            .then(res=>{
                resolve(res)
            })
            .catch(err=>{
                reject(err)
            })
        })
    }



    public getbydate(date:Date, pagesize:number, page:number){
        const skip = page === 1 ? 0 : page*pagesize
       let enddate = new Date(new Date(date).getFullYear(), new Date(date).getMonth(), (new Date(date).getDate() + 1 ))
       
        return new Promise((resolve, reject) => {
            this.modelname.find({
                'createdAt': 
                {
                    $gte: new Date(date),
                    $lte: new Date(enddate)
                }
            }
            )
            .skip(skip)
            .limit(pagesize)
            .exec()
            .then(res=>{
                resolve(res)
            })
            .catch(err=>{
                reject(err)
            })
        })
    }



}

