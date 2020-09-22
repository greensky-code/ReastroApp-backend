let mongoose = require('mongoose');
let Schema = mongoose.Schema;
const fs = require('fs');

let permissionSchema = new Schema({
    id:Number,
    name:String,
    has_permission:{
        type:String,
        default:true
    }
});

mongoose.model('Permission',permissionSchema).findOne({}, (err, res) => {
    if (!res) {
        console.log("Static content  saved succesfully.????");

        const permission = fs.readFileSync(__dirname + '/permission.json', 'utf-8');
        JSON.parse(permission).map(singleObj => {
            const data1 = mongoose.model('Permission',permissionSchema).create(singleObj, (error, success) => {
                if (error)
                    console.log("Error is" + error)
                else
                    console.log("Static content  saved succesfully.");
            })
        });
    }
});

module.exports = mongoose.model('Permission',permissionSchema);

