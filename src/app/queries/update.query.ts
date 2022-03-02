
export default ((data: any) => {
    const {username, password, phone, fullname, bio, email} = data
    return {
        query :`mutation{
            updateUser(
                body:{
                    username: "${username}",
                    phone:"${phone}",
                    name: "${fullname}",
                    email: "${email}",
                    bio: "${bio}",
                    password: "${password}"
                }
            ){
                message,
                user{
                    id,
                    username,
                    email,
                    name
                },
                profile{
                    bio,
                    phone,
                    picture
                }
            }
        }`
    }
})