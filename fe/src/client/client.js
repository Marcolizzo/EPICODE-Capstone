import axios from "axios";

  const AxiosClient = axios.create({
      baseURL: `${process.env.REACT_APP_SERVER_BASE_URL}`,
      maxContentLength: Infinity,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    // Aggiungi eventuali interceptors
    AxiosClient.interceptors.request.use(
      (config) => {
        // Esempio: aggiungi un token di autenticazione al header di ogni richiesta
        const token = localStorage.getItem("auth");
        if (token) {
          config.headers.Authorization = JSON.parse(token);
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

export default AxiosClient;

// OLD CLIENT
// class AxiosClient {
//     static baseUrl = `${process.env.REACT_APP_SERVER_BASE_URL}`

//     constructor() {
//         this.axiosInstance = axios.create({
//             baseURL: AxiosClient.baseUrl,
//             maxContentLength: Infinity,
//             headers: {
//                 Accept: 'application/json',
//                 'Content-Type': 'application/json',
//             }
//         })
//     }

//     setHeaders(headers) {
//         this.axiosInstance.defaults.headers.common = {
//             ...this.axiosInstance.defaults.headers.common,
//             ...headers
//         }
//     }

//     async get(url, config) {
//         const response = await this.axiosInstance.get(url, config)
//         return response.data
//     }

//     async post(url, payload, config) {
//         const response = await this.axiosInstance.post(url, payload, config)
//         return response.data
//     }

//     async update(url, payload, config) {
//         return await this.axiosInstance.patch(url, payload, config)
//     }

//     async delete(url, config) {
//         return await this.axiosInstance.delete(url, config);
//     }
// }

// export default AxiosClient;
