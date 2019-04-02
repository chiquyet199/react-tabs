export const extractBranch = (branches, properties) =>
  branches.filter(branch => branch.id === properties[0].branchId)[0];
