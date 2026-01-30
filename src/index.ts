import { setFailed, getInput, info } from "@actions/core";
import { formatAndNotify } from "./utils";

async function run() {
  try {
    const showCardOnStart = getInput(`show-on-start`).toLowerCase() == "true";
    if (showCardOnStart) {
      await formatAndNotify("start");
    } else {
      info("Configured to not show card upon job start.");
    }
  } catch (error) {
    setFailed(error instanceof Error ? error.message : String(error));
  }
}

run().catch((error) => {
  setFailed(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
