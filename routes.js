module.exports = function(app){
    const controller = require('./controller')

    app.route('/login').post((req,res)=>{
        controller.login(req,res);
    })

    app.route('/').get((req,res)=>{
        res.sendFile(__dirname+"/public/index.html")
        res.end()
    })

    app.route('/get/agenda').get((req,res)=>{
        controller.getData(req,res)
    })

    app.route('/post/agenda').post((req,res)=>{
        controller.addData(req,res)
    })

    app.route('/edit/agenda').post((req,res)=>{
        controller.updateData(req,res)
    })

    app.route('/delete/agenda').post((req,res)=>{
        controller.deleteData(req,res)
    })

// ===========================================================

    app.route('/get/akun').get((req,res)=>{
        controller.getDataAkun(req,res)
    })

    app.route('/post/akun').post((req,res)=>{
        controller.addDataAkun(req,res)
    })

    app.route('/edit/akun').post((req,res)=>{
        controller.updateDataAkun(req,res)
    })

    app.route('/delete/akun').post((req,res)=>{
        controller.deleteDataAkun(req,res)
    })

    app.route('/convert/akun').post((req,res)=>{
        controller.convertAkun(req,res)
    })
}