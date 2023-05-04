const core = require("@actions/core");
const fs = require("fs");
//const github = require("@actions/github");

const { Configuration, OpenAIApi } = require("openai");

async function askOpenAI(fileContent) {
  console.log("inside the fetch");
  const prompt = `Can you repeat back what this text is and tell me if it is markdown?:\n${fileContent}`;
  console.log(prompt);
  // openai
  const apiKey = core.getInput("OPEN_AI_API_KEY");
  const configuration = new Configuration({
    apiKey: apiKey,
  });
  const openai = new OpenAIApi(configuration);
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: prompt,
    temperature: 0,
    max_tokens: 500,
  });
  const message = response.data.choices[0].text;
  console.log(response);
  console.log(`The message was: ${message}`);
  core.setOutput("message", message);
}

function readFileContentAndAskAI(path) {
  // attempt file read
  console.log(`attempting to read file path: ${path}`);
  fs.readFile(path, "utf-8", async (error, data) => {
    if (error) {
      console.error(error);
      core.setFailed(error);
      return;
    }
    console.log(data);
    await askOpenAI(data);
  });
}

async function main() {
  // file paths
  const filePaths = core.getInput("filepaths");
  const filePathsMessage = `filepaths: ${filePaths}`;
  console.log(filePathsMessage);
  core.setOutput("filepaths", filePaths);

  // select just 1 file
  const allPaths = filePaths.split(" ");
  if (allPaths.length === 0) {
    console.log("no file paths were found");
    return;
  }

  const selectedFile = allPaths[0];
  //const fileContent = readFileContent(selectedFile);
  readFileContentAndAskAI(selectedFile);

  //const message = await askOpenAI(fileContent);
}

try {
  main();
} catch (error) {
  core.setFailed(error.message);
}
