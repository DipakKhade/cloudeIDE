export const BACKEND_URL = `http://localhost:3000`;

export const token = localStorage.getItem("token");

export const templates = [
  {
    name: "Python",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnY1kIrCB53BuedRASBGGgAWoslNDoN2BWag&s",
  },
  {
    name: "HTML , CSS , JS",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAeo8CXp00OqY04Eik7VI1JvyN5RsNdH97kQ&s",
  },
  {
    name: "Node.js",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQJXEUyFdvTJ7aggzHbeVsDicaR3Ja47OHHw&s",
  },
  {
    name: "Next js",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSS4gSbV80I94hVTscWjNfXT7NYo9riAujIAg&s",
  },
];

export const req_config = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
};
