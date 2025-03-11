export default async (to) => {
    //document.title = `${to.name} - TCE PR`;
  
    const token = localStorage.getItem("token-auth");
  
    if (to.name === "login" && token) {
      return { path: `/home` };
    }
  
    if (to.path === "/" && token) {
      return { path: `/home` };
    }
  
    if (to.meta.requiresAuth) {
      if (!token) {
        return { path: "/" };
      }
  
      return true;
    }
  
    return true;
  };