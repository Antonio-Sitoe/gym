import { UserTYpe } from "@/dtos/userDTO";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AUTH_TOKEN_STORAGE, USER_STORAGE } from "./config";

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

export async function setToken(token: string) {
  await AsyncStorage.setItem(AUTH_TOKEN_STORAGE, token);
}
export async function getToekn() {
  const token = await AsyncStorage.getItem(AUTH_TOKEN_STORAGE);
  return token;
}
export async function storageAuthTokenRemove() {
  await AsyncStorage.removeItem(AUTH_TOKEN_STORAGE);
}
