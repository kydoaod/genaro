
const handleMessage = {
    sendMessage:  async (data) =>{
      const res = await(await fetch("/v1/send-message", {
          method: "POST",
          body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json"
        }
      })).json();
      return res;
    }
  }
  
  export default handleMessage;