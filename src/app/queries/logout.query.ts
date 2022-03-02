// this function takes no arguments
export default(() => {
    return { query : `
        mutation{
            logout{
                message
            }
        }`
    }
})

// THIS ROUTE HOWEVER TAKES 'Authorization' header
// in the exact format below
// 'Bearer ${token}'