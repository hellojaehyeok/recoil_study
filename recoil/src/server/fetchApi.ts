const ip = "https://jsonplaceholder.typicode.com/"; 

const fetchApi = (
    path: string,
    method: string,
    body?: FormData,
    callBack?:(item: object)=>void,
    errorCallBack?:(item: object)=>void,
  ) => {
    return fetch(`${ip}${path}`, {
      credentials: "include",
      method: method,
      body: body ? body : null,
    })
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      if (callBack) callBack(data);
      return data;
    })
    .catch(function (e) {
      if (errorCallBack) errorCallBack(e);
      return e;
    });
  }

export default fetchApi;
