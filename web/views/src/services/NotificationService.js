
const handleNotification = {
  getNotification:  async (user_id) =>{
    const res = await(await fetch("/v1/notifications", {
        method: "POST",
        body: JSON.stringify({
            user_id: user_id
        }),
      headers: {
        "Content-Type": "application/json"
      }
    })).json();
    return res;
  }
}

export default handleNotification;