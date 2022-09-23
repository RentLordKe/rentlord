import { findUserById } from "../users/userService";

const getUserRole = async (id: number) => {
    const user = await findUserById(id);
    if (!user) return false;
    return user.toJSON(); 
}

export default getUserRole;