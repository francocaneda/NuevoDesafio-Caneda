import { getManagerMessages } from "../daoManager.js";

const data = await getManagerMessages();
const managerMessages = new data.managerMessageMongoDB();

//const data = await getManagerMessages()
//const messageManagerma = new data.messageManagerMongoDB();

export default managerMessages;