
const handleLogin = {
  googleLogin:  async googleData => {
    const res = await fetch("/v1/auth/google", {
        method: "POST",
        body: JSON.stringify({
        token: googleData.tokenId
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
    const data = await res.json();
    console.log(data);
    // store returned user in a context?
  },
  fBLogin: async fbData => {
    const res = await fetch("/v1/auth/fb", {
        method: "POST",
        body: JSON.stringify(fbData),
      headers: {
        "Content-Type": "application/json"
      }
    })
    const data = await res.json();
    console.log(data);
    // store returned user in a context?
  },
  linkedInLogin: (linkedInData) => {
    console.log(linkedInData)
  },
  linkedInLoginFail: (linkedInData) => {
    console.log(linkedInData)
  }
}
export default handleLogin;