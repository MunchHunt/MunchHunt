import axios from "axios";

async function GetUserData(email: string) {
  return await axios
    .get(".netlify/functions/getUserData", {
      params: {
        email: email,
      },
    })
    .then((response: any) => {
      return response.data;
    })
    .catch((err: any) => {
      console.log("[userAuth] Failed to retrieve user data!", err);
    });
}

async function AddNewUser(email: string, name: string) {
  return await axios
    .get(".netlify/functions/addNewUser", {
      params: {
        email: email,
        name: name,
      },
    })
    .then((response: any) => {
      return response.data;
    })
    .catch((err: any) => {
      console.log("[userAuth] Failed to create new user.", err);
    });
}

async function UpdateUserData(email: string, userTemplates: any) {
  return await axios
    .get(".netlify/functions/updateUserData", {
      params: {
        email: email,
        templates: JSON.stringify(userTemplates),
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log("[userAuth] Failed to update user data.", err);
    });
}

module.exports = {
  AddNewUser,
  GetUserData,
  UpdateUserData,
};
