export function assertWorkspaceId(workspaceId: string): string {
  if (!workspaceId) {
    throw new Error("workspace required");
  }
  return workspaceId;
}
