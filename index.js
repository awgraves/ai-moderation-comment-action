const core = require("@actions/core");
//const github = require("@actions/github");

const { Configuration, OpenAIApi } = require("openai");

const fetch = async () => {
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
    max_tokens: 1000,
  });
  const { message } = response.data.choices[0];
  return message;
};

try {
  // file paths
  const filePaths = core.getInput("filepaths");
  const filePathsMessage = `filepaths: ${filePaths}`;
  console.log(filePathsMessage);
  core.setOutput("filepaths", filePaths);
  const message = fetch();
  core.setOutput("message", message);
} catch (error) {
  core.setFailed(error.message);
}