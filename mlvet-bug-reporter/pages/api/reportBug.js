import { Octokit } from '@octokit/rest';

export default async function handler(req, res) {
  const authToken = process.env.AUTH_TOKEN;
  const repoOwnerUsername = 'chloebrett';
  const repoName = 'mlvet';
  const bugReportLabelName = 'user-reported bug';
  const bugReportLabelDesc = 'issues with this label originate from in-app user feedback'; 
  const bugReportLabelColour = 'f59e42';

  const octokit = new Octokit({
    auth: authToken,
  });

  try {
    // get labels
    const labelResponse = await octokit.request(
      'GET /repos/{owner}/{repo}/labels',
      {
        owner: repoOwnerUsername,
        repo: repoName,
      }
    );

    // check if bug report label exists
    const containsBugReportLabel = labelResponse.data
      .map((label) => label.name)
      .includes(bugReportLabelName);

    // if not, create it
    if (!containsBugReportLabel) {
      await octokit.request('POST /repos/{owner}/{repo}/labels', {
        owner: repoOwnerUsername,
        repo: repoName,
        name: bugReportLabelName,
        description: bugReportLabelDesc,
        color: bugReportLabelColour,
      });
    }

    // create issue
    await octokit.request('POST /repos/{owner}/{repo}/issues', {
      owner: repoOwnerUsername,
      repo: repoName,
      title,
      body,
      labels: [bugReportLabelName],
    });

    res.status(200).json({message: "success!"})
  } catch (e) {
    console.error(e);
    res.status(-1).json({message: "something went wrong"})
  }

}
