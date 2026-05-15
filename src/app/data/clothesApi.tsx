export const getClothes = ()=> {
fetch("http://localhost:8080/api/home")
.then((res) => res.json()
.then(
    (data)=> {console.log(data.message, data.clothes)}
))
}

export const addClothes = ()=>{

    
}