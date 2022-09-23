const { Octokit } = require("@octokit/rest");

export default async function handler(req, res) {
  const authToken = process.env.AUTH_TOKEN;
  const repoOwnerUsername = 'LiamTodd';
  const repoName = 'shaping_connections_tool_1';
  const bugReportLabelName = 'user-reported bug';
  const bugReportLabelDesc = 'issues with this label originate from in-app user feedback'; 
  const bugReportLabelColour = 'f59e42';

  console.log("entered")

  const octokit = new Octokit({
    auth: authToken,
  });

  console.log(octokit)

    // get labels
    const labelResponse = await octokit.request(
      'GET /repos/{owner}/{repo}/labels',
      {
        owner: repoOwnerUsername,
        repo: repoName,
      }
    );

    console.log(labelResponse)

    // check if bug report label exists
    const containsBugReportLabel = labelResponse.data
      .map((label) => label.name)
      .includes(bugReportLabelName);

    console.log(containsBugReportLabel)

    // if not, create it
    if (!containsBugReportLabel) {
      await octokit.request('POST /repos/{owner}/{repo}/labels', {
        owner: repoOwnerUsername,
        repo: repoName,
        name: bugReportLabelName,
        description: bugReportLabelDesc,
        color: bugReportLabelColour,
      });

    // create issue
    const x = await octokit.request('POST /repos/{owner}/{repo}/issues', {
      owner: repoOwnerUsername,
      repo: repoName,
      title,
      body,
      labels: [bugReportLabelName],
    });

    console.log(x)

    res.status(200).json({message: "success!"})
  } 

}
