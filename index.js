const core = require("@actions/core");
//const github = require("@actions/github");

const { Configuration, OpenAIApi } = require("openai");

async function fetch() {
  console.log("inside the fetch");
  // openai
  const apiKey = core.getInput("OPEN_AI_API_KEY");
  const configuration = new Configuration({
    apiKey: apiKey,
  });
  const openai = new OpenAIApi(configuration);
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: "Tell me a knock knock joke.",
    temperature: 0,
    max_tokens: 500,
  });
  const { message } = response.data.choices[0];
  console.log(response);
  return message;
}

async function main() {
  // file paths
  const filePaths = core.getInput("filepaths");
  const filePathsMessage = `filepaths: ${filePaths}`;
  console.log(filePathsMessage);
  core.setOutput("filepaths", filePaths);
  const message = await fetch();
  console.log(`The message was: ${message}`);
  core.setOutput("message", message);
}

try {
  main();
} catch (error) {
  core.setFailed(error.message);
}
