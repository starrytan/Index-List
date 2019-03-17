const Mock=require('mockjs')

const userData=Mock.mock({
    'data|50':[{
        'key|+1':1,
        'city':'@city'
    }]
})

module.exports={
    [`GET /data`](req,res){
        res.json(userData)
    }   
}