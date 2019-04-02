export const convert = data => {
  const convertedData = {
    shared_properties: [],
    shared_branches: [],
    pending_requests: [],
  };

  data.agencies.forEach(agency => {
    agency.branches.forEach(branch => {
      convertedData.shared_branches.push({
        ...branch,
        ...{agencyName: agency.name},
        ...{type: "shared_branches"},
      });
      branch.properties.forEach(property => {
        if (branch.shareStatus === "PENDING") {
          convertedData.pending_requests.push({
            ...property,
            ...{type: "pending_requests"},
          });
        } else {
          convertedData.shared_properties.push({
            ...property,
            ...{type: "pending_requests"},
          });
        }
      });
    });
  });

  return convertedData;
};
