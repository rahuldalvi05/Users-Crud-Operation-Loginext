export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  export const validateMobile = (mobile) => {
    const mobileRegex = /^[0-9-]{10,}$/;
    return mobileRegex.test(mobile);
  };
  
  export const validateName = (name) => {
    return name.trim() !== "";
  };
  
  export const validateWebsite = (website) => {
    const websiteRegex = /^(https?:\/\/)?(?:www\.)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\/\S*)?$/;
    return websiteRegex.test(website);
  };
  