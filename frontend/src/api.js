const PATH = "http://localhost:8000/test/";

export class APIConnector {
  constructor() {
    this.path = PATH;
    this.routes = {
      test: "",
      details: "details/",
      submitOrder: "",
    };
  }

  #make_req(method = "GET", path, data) {
    // if(!path) throw Error("No path defined");
    try {
      const url = new URL(path, this.path);
      url.searchParams.append("format", "json");
      console.log(url)
      const req = new Request(url);
      return fetch(req, { method: method, body: data });
    } catch (e) {
      return Promise.reject(e);
    }
  }

  req_get(dest = this.routes.test, reject) {
    return new Promise((res, rej) => {
      this.#make_req("GET", dest)
        .then((resp) => {
          if (!resp.ok)
            throw new Error("Response with code: " + resp.status, {
              cause: resp,
            });
          resp.blob().then((b) => b.text().then((txt) => res(JSON.parse(txt))));
        })
        .catch(reject || console.error);
    });
  }

  form_post(form = new FormData()) {
    return new Promise((res, rej) => {
      console.log(form);
      this.#make_req("POST", this.routes.submitOrder, form)
        .then((r) => {
          if (!r.ok) throw Error("Status code: " + r.status);
          else return r.blob();
        })
        .then((b) => b.text())
        .then((t) => {
          console.log(JSON.parse(t));
          res("Zamówienie zostało przyjęte");
        })
        .catch((e) => {
          console.error(e);
          res("Coś poszło nie tak...");
        });
    });
  }
}

function api_req(path, d) {
  return new Promise((r) => {
    let resp;
    setTimeout(() => {
      switch (path) {
        case "new-order":
          resp = { status: 200, id: 1234 };
          break;
        case "order-details":
          resp = {};
          break;
        default:
          resp = { status: 404 };
          break;
      }
      r(resp);
    }, 200);
  });
}
