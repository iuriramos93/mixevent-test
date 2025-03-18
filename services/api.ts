const url = process.env.API_URL || 'http://localhost:5001';


const api = async (route: string, options?: object) => {
  const res = await fetch(`${url}/${route}`,options);
  return res
}

export {
  api
}