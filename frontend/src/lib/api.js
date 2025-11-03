export const getAllCategoriesData = async()=>{
    try {
        const res = await fetch('http://10.10.12.111:4500/api/offers/categories/',{
        cache: "no-store"
    })

     

    if(!res.ok){
        throw new Error("Fail to fetch categories")
    }
    const result = await res.json()
    console.log("result", result)
    return result.data || []
    } catch (error) {
        console.error("Somethings is wrong with fatching data..!!", error)
        return ["no data is getting"]
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

