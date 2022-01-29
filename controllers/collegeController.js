const mongoose = require("mongoose");
const collegeModels = require("../models/collegeModel");
const internModels = require("../models/internModel");
const validation = require("../validation/validation");
//----------------------------------------------------------------------------------//
// This is the first api to create an college in database

const createCollege = async function (req, res) {

  try 
  {
    const { name, fullName, logoLink, isDeleted } = req.body; // Using Destructuring Property in JS
   // const reqBody = req.body;
if (!validation.isValidReqBody(req.body)) 
    {
      // Check Body is Not Empty
      return res.status(400).send({status: false,message: "Please Enter Valid College Details To Create College",});
    }

    if (!validation.isValid(name)) 
    {
      return res.status(400).send({status: false,message: "Please Provide College Name To Create College",});
    }
   

    if (!validation.isValid(logoLink)) 
    {
      return res.status(400).send({ status: false, message: "Please Provide Logo Link" });
    }

    if (isDeleted === true) 
    {
      return res.status(400).send({status: false,message: "You have to assigned false to isDeleted entry"});
    }

    if (!validation.isValid(fullName)) 
    {
      return res.status(400).send({status: false,message: "Please Provide College Full Name To Create College",});
    }

    let collegeEntries = await collegeModels.find();
    let collegeEntryLen = collegeEntries.length;

    if (collegeEntryLen != 0) 
    {
      const duplicateCollegeNames = await collegeModels.findOne({fullName: fullName});
      //console.log(duplicateCollegeNames);
      if (duplicateCollegeNames) 
      {
        return res.status(400).send({ message: "This College Name Already Exists" });
      }
    }
    const collegeData = 
    {
    name,
    fullName,
    logoLink
  //  isDeleted: isDeleted ? isDeleted : false
   
    }
    if(typeof(req.body.name)!='string')
    {
      return res.status(400).send({status: false, msg: 'Characters are allowed only!'})
    }
     collegeData.name=req.body.name.toLowerCase().trim()
     collegeData.fullName=req.body.fullName.trim()
   if (/\s/.test(collegeData.name)) 
    {
    return res.status(400).send({status: false,message: "Please only provide an abbrevated name",});
    }
    
    const collegeInfo = await collegeModels.create(collegeData);

    const finalcollegeInfo= await collegeModels.findOne({_id:collegeInfo._id}).select({name:1,fullName:1,logoLink:1,isDeleted:1,_id:0})
    res.status(201).send({ status: true, message: "College Created Successfully", data: finalcollegeInfo });
  } 
  catch (error) 
  {
    res.status(500).send({ status: false, message: error.message });
  }
};
// This is the third api to get the college Details.

const getCollege = async function (req, res) 
{
  try 
  {
    //let infos = {};
    if(!req.query.collegeName)
    {
      return res.status(400).send({ status: false, message: "Query parameter should be present!" });
    }
    const value = req.query.collegeName.toLowerCase();
    const collegeInfo = await collegeModels.findOne({ name: value },{ name: 1, fullName: 1, logoLink: 1, _id: 0 });
    if (!collegeInfo) 
    {
      return res.status(400).send({ status: false, message: "This College Does not Exists" });
    }
    const {name,fullName,logoLink} = collegeInfo
   
    const collegeInfo1 = await collegeModels.findOne({ name: value })
    let Interests=await internModels.find({collegeId:collegeInfo1._id},{_id:1,name:1,email:1,mobile:1})
    let data = {name,fullName,logoLink,Interests}
    if (Interests.length==0) 
    {
     data.Interests="No Student Present from This College";
    
    }
    
   
    return res.status(200).send({data:data});
  } 
  catch (error) 
  {
    res.status(500).send({ status: false, message: error.message });
  }
};
//--------------------------------------------------------------------------------------------//

module.exports={createCollege,getCollege};
