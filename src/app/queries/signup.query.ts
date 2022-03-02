// parse the password and email as one object into this function

export default((data: any) => {
    const {email ,password} = data
    return {
        query:`mutation{
            createUser(
                body:{
                    email: "${email}",
                    password: "${password}"
                }
            ){
                user{
                    email,
                }
            }
        }`
    }
})


// Data FIELDS ARE AS FOLLOWS
// USER IS IN 'data.login.user' - CONTAINS { email }
