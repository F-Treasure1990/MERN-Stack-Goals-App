import { model, Schema } from "mongoose"

interface iSchema {
  text: string,
}

const goalSchema = new Schema<iSchema>({
  text: {
    type: String,
    required: [true, "Please add a text Value"]
  }
},
  {
    // Automatically creates fileds : createdAt & updatedAt 
    timestamps: true
  })

export = model<iSchema>('Goal', goalSchema)
