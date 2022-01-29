const collegeModels = require("../models/collegeModel");
const internModels = require("../models/internModel");
const validation = require('../validation/validation')

// This is the second api for the creation of the Intern.

const createInterns = async function (req, res) {
  try 
  {
    const {name,  mobile ,collegeId, isDeleted} = req.body; // Destructing Key and Values.
    const requestedBody = req.body;
    const email=req.body.email.trim();
    if (!validation.isValidReqBody(requestedBody)) {
      return res.status(400).send({status: false, msg: 'Please Enter Intern Details'});
    }

    if(!validation.isValid(name)){
      return res.status(400).send({status: false, msg: 'Please Provide Intern Name'})
    }
    if(typeof(name)!='string')
    {
      return res.status(400).send({status: false, msg: 'Characters are allowed only!'})
    }

    if(!validation.isValid(email))
    {
      return res.status(400).send({status: false, msg: 'Please Provide Intern Email Address'})
    }

    if (!validation.isValidEmail(email))
    {
      return res.status(400).send({status: false, msg: 'Please Provide Valid Email Address'})
    } 
  if (!validation.isValid(mobile))
    {
      return res.status(400).send({status: false, msg: 'Please Provide Mobile number of Intern to proceed'})
    } 
  
    if(typeof(mobile)!='number')
    {
      return res.status(400).send({status: false, msg: 'Numbers are allowed only!'})
    }
  
    if (!validation.isValidMobileNumber(mobile)) 
    {
        return res.status(400).send({ status: false, msg: 'Please Enter Valid Mobile Number to Proceed Ahead' })
    }
   
    let isEmailExists = await internModels.find()
    let mailLength = isEmailExists.length;
    if(mailLength !=0)
    { 
    
      const DuplicateEmail = await internModels.find({email: email});
      const emailGot = DuplicateEmail.length;

      if(emailGot !=0)
      {
        return res.status(400).send({status: false, message:"This Email Address Already Exists in DB"})
      }

      const DuplicateMobile = await internModels.find({mobile: mobile});
     
      const duplicateMobLen = DuplicateMobile.length
      if(duplicateMobLen !=0)
      {
        return res.status(400).send({status: false, message:"This Mobile Number Already Exists in DB"})
      }

      if(isDeleted === true)
      {
        return res.status(400).send({status: false, message:"You have to assigned false to isDeleted entry"})

      }
      if(!validation.isValid(req.body.collegeName))
      {
        return res.status(400).send({status: false, msg: 'Please Provide Intern College Name'})
      }

      let collegeData = await collegeModels.findOne({name: req.body.collegeName.toLowerCase(),isDeleted:false})

     
      if(!collegeData)
      {
        return res.status(400).send({status: false, message:"This College Name Does Not Exists"})
      }
      let  collegeId = collegeData._id;
      
      let data = { name, email, mobile, collegeId, isDeleted }
      const internData = await internModels.create(data);
      const finalinternData= await internModels.findOne({_id:internData._id}).select({isDeleted:1, name:1, email:1,mobile:1,collegeId:1,_id:0})
      res.status(201).send({status: true, message:"Intern Created Successfully",data: finalinternData})
    }    
  }
  catch (e) 
  {
    res.status(500).send({status: false, message:e.message})

  }
}
module.exports.createIntern = createInterns;