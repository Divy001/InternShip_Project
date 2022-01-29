const isValid =function(value)
{
    if (typeof value === 'undefined' || value ===null) return false;   //Here it Checks that Is there value is null or undefined
    if (typeof value === 'string' && value.trim().length === 0) return false;// Here it Checks that Value contain only Space 
    return true
    
}

const isValidReqBody = function(reqBody)
{ 
    return Object.keys(reqBody).length > 0 ;     // Here it Checks that Any Key is Present or not
}

const isValidEmail = function(value)
{

    const regex = (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
    if (!regex.test(value)) 
    {
       
        // Please Enter a Valid Email Address
        return false
         //res.status(400).send({status: false, msg:"Invalid Email!"})
    }
    return true;
}
const isValidMobileNumber = function (value) 
{
    if ((/^(\+\d{1,3}[- ]?)?\d{10}$/.test(value))) 
    {
        return true;
    }
    return false
}

module.exports = {isValid,isValidReqBody,isValidEmail,isValidMobileNumber};
