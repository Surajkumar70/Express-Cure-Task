const knex = require('knex')({
    client:'mysql',
    connection:{
        host:'localhost',
        user:'root',
        database:'healthcare',
        password:'suraj@123'
    }
})

knex.schema.createTable("employee",table=>{
    table.increments("EmployeeID").primary(),
    table.string('EmployeeName'),
    table.string("EmployeeEmail").unique(),
    table.string('EmployeeAddress'),
    table.biginteger("PhoneNumber"),
    table.string("password")
})
.then(()=>{
    console.log("table created");
}).catch(err =>{
    console.log(err.message)
});

module.exports=knex