import { load, type Progress, type TaskState } from "./progress";

type Snapshot = { revision: number; progress: Progress };
export type ProgressChange = (latest: Progress) => Progress;
let database: Promise<IDBDatabase> | undefined;

function open() {
  return database ??= new Promise<IDBDatabase>((resolve, reject) => {
    const request = indexedDB.open("c-lab-learning", 1);
    request.onupgradeneeded = () => {
      request.result.createObjectStore("progress").put(
        { revision: 0, progress: load() } satisfies Snapshot,
        "active",
      );
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  }).catch(error => {
    database = undefined;
    throw error;
  });
}

export async function accessProgress(change?: ProgressChange): Promise<Snapshot> {
  const db = await open();
  return new Promise((resolve, reject) => {
    const tx = db.transaction("progress", change ? "readwrite" : "readonly");
    const store = tx.objectStore("progress");
    const request = store.get("active");
    let result: Snapshot;
    request.onsuccess = () => {
      try {
        const previous = request.result as Snapshot;
        result = previous;
        if (change) {
          result = {
            revision: previous.revision + 1,
            progress: { ...change(previous.progress), updatedAt: new Date().toISOString() },
          };
          store.put(result, "active");
        }
      } catch (error) {
        tx.abort();
        reject(error);
      }
    };
    tx.oncomplete = () => resolve(result);
    tx.onabort = () => reject(tx.error ?? Error("学习记录保存失败"));
    tx.onerror = () => reject(tx.error);
  });
}

export function mergeTask(current: TaskState, seen: TaskState, patch: Partial<TaskState>) {
  const task = { ...current, ...patch };
  if (patch.draft !== undefined && current.draft !== undefined &&
      current.draft !== seen.draft && current.draft !== patch.draft) {
    task.draftHistory = [current.draft, ...(current.draftHistory ?? []).filter(code => code !== current.draft)].slice(0, 5);
  }
  if (patch.files) {
    const files: Record<string, string> = { ...current.files };
    for (const name of new Set([...Object.keys(seen.files ?? {}), ...Object.keys(patch.files)])) {
      if (patch.files[name] === seen.files?.[name]) continue;
      if (Object.hasOwn(patch.files, name)) files[name] = patch.files[name];
      else delete files[name];
    }
    task.files = files;
  }
  return task;
}
