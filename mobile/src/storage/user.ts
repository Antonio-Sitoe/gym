import { UserTYpe } from "@/dtos/userDTO";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { USER_STORAGE } from "./config";

export async function storageUserSave(user: UserTYpe) {
  await AsyncStorage.setItem(USER_STORAGE, JSON.stringify(user));
}

export async function userGet() {
  const storage = await AsyncStorage.getItem(USER_STORAGE);
  const user: UserTYpe = storage ? JSON.parse(storage) : {};
  return user;
}


export async function removeUser() {
  await AsyncStorage.removeItem(USER_STORAGE);
}