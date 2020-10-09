import express from 'express';

const app = express();

app.get('/',(request,response)=>{
 /*   const {name, email} = request.body;

    const user = {

        name,
        email,
    }*/

    return response.json({message: "hello gente"});
});

app.listen(3333,()=>{
    console.log(' Server started on port 3333! =D')
})