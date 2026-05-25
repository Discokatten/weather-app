export const getClothes = ()=> {
fetch("http://localhost:8080/api/clothes")
.then((res) => res.json()
.then(
    // (data)=> {console.log(data.message, data.clothes)}
    (data)=> {console.log(data.clothes)}
))
}

export const addClothes = ()=>{

    
}