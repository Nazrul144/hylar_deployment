export const getData = async()=>{
    try {
        const res = await fetch('https://lelia-leafed-lashandra.ngrok-free.dev/api/offers/categories',{
        cache: "no-store"
    })
    if(!res.ok){
        throw new Error("Fail to fetch categories")
    }
    return await res.json()
    } catch (error) {
        console.error("Somethings is wrong with fatching data..!!", error)
        return ["no data"]
    }
}


export const getLatestNews = async()=>{
    try {
        const res = await fetch('https://jsonplaceholder.typicode.com/users', {
        cache: "no-store"
    })
    if(!res.ok){
        throw new Error("Fail to fetch latest news..!!")
    }
    return res;
    } catch (error) {
        console.error("something went wrong")
        return []
    }
}

