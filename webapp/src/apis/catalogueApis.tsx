const host: string = process.env.REACT_APP_HOST || "";
const myHeaders = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
};

export const listDir = async (path: string) => {
  let response = await fetch(`${host}/fs/${path}`, {
    method: "GET",
    headers: myHeaders,
  });
  let data = await response.json();
  return data;
};
