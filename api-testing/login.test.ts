import axios from "axios";
import jsonpath from "jsonpath";
import fs from "fs-extra";
import jsonData from "../api-data.json";

let userName: String;
let userPass: String;

describe("authorization", () => {
  test("get all users", async () => {
    const all_users_response = await axios.get(`${jsonData.baseUrl}/users`);
    userName = String(
      jsonpath.query(all_users_response.data, "$..users[3].username")
    );
    let userName12 = String(
      jsonpath.query(all_users_response.data, "$..users[?(@.id==12)].username")
    );
    userPass = String(
      jsonpath.query(all_users_response.data, "$..users[3].password")
    );
    console.log(userName + " pass: " + userPass);
    console.log(userName12);
    expect(all_users_response.status).toEqual(200);
  });

  test("get auth token", async () => {
    const auth_token_response = await axios.post(
      `${jsonData.baseUrl}/auth/login`,
      {
        username: userName,
        password: userPass,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    jsonData.token = auth_token_response.data.token;
    fs.writeJSONSync("api-data.json", jsonData);
  });
});
