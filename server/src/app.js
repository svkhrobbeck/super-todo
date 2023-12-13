import { connect } from "mongoose";

const { PORT, MONGO_URI } = process.env;

const startApp = async app => {
  try {
    app.listen(PORT, () => console.log(`server is running on port: ${PORT}`));
    const { connection } = await connect(MONGO_URI);
    console.log(`mongodb connected to: ${connection.host}`);
  } catch (err) {
    console.log(err);
  }
};

export default startApp;
