import api from "./config";

export const card = () => {
  const config = {
    headers: { "Content-Type": "application/json; charset=utf-8" },
  };
  return new Promise((resolve, reject) => {
    api
      .get("/4d8db890-5327-4c69-a3ef-b4f5f5225d17", config)
      .then((res) => {
        resolve(res);
        if (res.status !== 200) {
          throw new Error("Something went wrong", res.statusText);
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
};
