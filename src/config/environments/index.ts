import IEnvronment from "./IEnvironment";
if (!process.env.NODE_ENV) {
  require("dotenv").config();
}

const getEnvironment = (env: string | undefined = "DEVELOPMENT") => {
  if (env == "DEVELOPMENT") {
    return require("./development");
  }
};

const CURRENT_ENV: IEnvronment = getEnvironment(process.env.NODE_ENV);
export default CURRENT_ENV;
