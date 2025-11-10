import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.CONNECTIONSTRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Liên kết CSDL thành công!');
  } catch (error) {
    console.error('Liên kết CSDL thất bại:', error.message);
    process.exit(1);
  }
};
