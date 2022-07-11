import { model, Schema } from 'mongoose'

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please Add A Name']
  },
  email: {
    type: String,
    required: [true, 'Please Add A Email'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'Please Add A Password']
  }
}, {
  timestamps: true
})

export default model('User', userSchema)
