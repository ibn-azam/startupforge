'use server'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

export const createStartup = async(newStartupData)=>{
    const res = await fetch(`${baseUrl}/api/startup`,{
        method:'POST',
        headers:{
            'Content-Type' : 'application/json',
        },
        body: JSON.stringify(newStartupData)
    });
    return res.json();
}
export const createOpportunity = async(newOpportunityData)=>{
    const res = await fetch(`${baseUrl}/api/opportunity`,{
        method:'POST',
        headers:{
            'Content-Type' : 'application/json',
        },
        body: JSON.stringify(newOpportunityData)
    });
    return res.json();
}