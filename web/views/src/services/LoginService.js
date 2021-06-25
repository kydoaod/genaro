const handleGoogleLogin = async googleData => {
  console.log(googleData)
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
}

export default handleGoogleLogin;