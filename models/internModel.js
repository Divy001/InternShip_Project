const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId;

const internSchema = new mongoose.Schema(
      {

            name:
            {
                  type: String,
                  required: true
            },
            email:
            {
                  type: String,
                  required: true,
                  unique:true,
                  trim:true
            },
            mobile:
            {
                  type: Number,
                  required: true,
                  unique:true
            },

            collegeId:
            {
                  type: ObjectId,
                  ref:"collegeModel_03.12.2021"
            },
            isDeleted: 
            {
                    type:Boolean, 
                    default: false
            }
      },

      { timestamps: true }

)

module.exports = mongoose.model('internModel_03.12.2021', internSchema)