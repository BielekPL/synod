 export default function api_req(path,d){
  return new Promise((r) => {
    let resp;
    setTimeout(() => {
        switch (path) {
            case "new-order":
                resp = { status: 200, id: 1234 }
                break;
            case "order-details":
                resp = {};
                break;
            default:
                resp = {status: 404};
                break;
        }
      r(resp);
    }, 200);
  });
};