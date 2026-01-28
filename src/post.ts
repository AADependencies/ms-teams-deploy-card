import { setFailed, info, getInput } from "@actions/core";
import { formatAndNotify, getWorkflowRunStatus } from "./utils";

async function run() {
  try {
    // setTimeout to give time for Github API to show up the final conclusion
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    const showCardOnExit = getInput(`show-on-exit`).toLowerCase() === "true";
    const showCardOnFailure =
      getInput(`show-on-failure`).toLowerCase() === "true";

    const workflowRunStatus = await getWorkflowRunStatus();
    if (
      (showCardOnExit && !showCardOnFailure) ||
      (showCardOnFailure && workflowRunStatus.conclusion !== "success")
    ) {
      await formatAndNotify(
        "exit",
        workflowRunStatus.conclusion || "unknown",
        workflowRunStatus.elapsedSeconds
      );
    } else {
      info("Configured to not show card upon job exit.");
    }
  } catch (error) {
    setFailed(error instanceof Error ? error.message : String(error));
  }
}

run();
