import { createGlobalState } from "react-hooks-global-state";
const userState = {
  isLoggedIn: false,
  jwt: "",
  user: {
    accessToken: "",
    id: null,
    name: "",
    email: "",
    gender: "",
    dob: "",
    city: "",
  },
};

const { useGlobalState } = createGlobalState(userState);
export { useGlobalState };
