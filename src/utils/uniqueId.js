import UUID from "node-uuid";

const getUniqueId = (prefix = "id") => UUID.v4();

export default getUniqueId;
