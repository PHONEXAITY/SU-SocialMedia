export const sendSuccess = (res,message,data) => {
    res.status(200).json({status: true, message, data});
};
export const sendCreated = (res,message,data) => {
    res.status(201).json({status:true, message, data})
}
  export const sendNocontent = (res, message, error) => {
    res.status(204).json({ status: false, message, error, data: {} });
  };
  export const sendBadrequest = (res, message) => {
    res.status(400).json({ status: false, message, });
  };
  export const sendUnauthorized = (res, message) => {
    res.status(401).json({ status: false, message});
  };
  export const sendNotFound = (res, message) => {
    res.status(404).json({ status: false, message});
  };
  export const sendForbidden = (res, message) => {
    res.status(403).json({ status: false, message});
  };
  export const sendServerErr = (res, message) => {
    res.status(500).json({ status: false, message});
  };