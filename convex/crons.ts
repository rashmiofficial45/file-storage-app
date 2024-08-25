import { cronJobs } from "convex/server";
import { internal } from "./_generated/api";

const crons = cronJobs();

crons.interval(
  "Permanently Delete the Trash",
  { hours: 730 }, // 1 month
  internal.files.deleteAllFile,
);

export default crons;
