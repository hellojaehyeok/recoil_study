
interface address{
    city: string,
    geo: {lat: string, lng: string},
    street: string,
    suite: string,
    zipcode: string,
}

interface company{
    bs:string,
    catchPhrase:string,
    name:string,
}

export default interface UserType{
    address: address,
    company: company,
    email: string,
    name: string,
    phone: string,
    username: string,
    website: string,
    id: number
}