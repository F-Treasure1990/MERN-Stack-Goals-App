import { model, Schema } from "mongoose"

const goalSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  text: {
    type: String,
    required: [true, "Please add a text Value"]
  }
},
  {
    // Automatically creates fileds : createdAt & updatedAt 
    timestamps: true
  })

export default model('Goal', goalSchema)
