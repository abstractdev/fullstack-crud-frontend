const apiPaths = (id) => {
  return {
    userGet: "http://localhost:5000/user",
    userLoginPost: "http://localhost:5000/user/login",
    userSignupPost: "http://localhost:5000/user/signup",
    userLogoutPost: "http://localhost:5000/user/logout",
    userEditPut: `http://localhost:5000/user/${id}`,
    userDelete: `http://localhost:5000/user/${id}`,
    allUsersGet: "http://localhost:5000/users",
  };
};

export default apiPaths;
