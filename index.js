const core = require("@actions/core");
const github = require("@actions/github");

try {
  // `who-to-greet` input defined in action metadata file
  const filePaths = core.getInput("filepaths");
  const message = `Filepaths: ${filePaths}!`;
  console.log(message);
  core.setOutput("message", message);
  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2);
  console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}
