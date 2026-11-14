export type Execution = {
  status:
    | "success"
    | "compile-error"
    | "runtime-error"
    | "timeout"
    | "cancelled"
    | "system-error";
  stdout: string;
  stderr: string;
  exitCode: number;
  duration: number;
};
export type JobResult = { runs: Execution[] };
