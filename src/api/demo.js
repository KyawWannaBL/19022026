import axios from "axios";
// GET 请求示例
export const getUser = async (id) => {
    const response = await axios.get(`https://api.example.com/api/users/${id}`);
    return response.data;
};
// POST 请求示例
export const createUser = async (data) => {
    const response = await axios.post("https://api.example.com/api/users", data);
    return response.data;
};
// supabase 请求示例
// export const getUserById = async (id: number): Promise<User | null> => {
//   const { data, error } = await supabase
//     .from("users")
//     .select("*")
//     .eq("id", id)
//     .single();
//   if (error) return null;
//   return data as User;
// };
