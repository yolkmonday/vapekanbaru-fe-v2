import axios from "axios"


const axiosPost = (url, payload) => {
  const config = useRuntimeConfig()
  const defaultUrl = config.public.apiURL;

  const instance = axios.create({
    baseURL: defaultUrl,
    headers: {
      common: {
        'Api-Key': ''
      },
    },
    timeout: 120000
  });

  return instance.post(url, payload)
}

const axiosGet = (url) => {
  const config = useRuntimeConfig()
  const defaultUrl = config.public.apiURL;
  const instance = axios.create({
    baseURL: defaultUrl,
    headers: {
      common: {
        'Api-Key': '',
      },
    },
    timeout: 120000
  });
  return instance.get(url)
}


export {
  axiosPost,
  axiosGet
}
