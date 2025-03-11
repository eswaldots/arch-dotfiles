import { GenericGetResponse, GenericPostResponse } from "@/models/archive-models";
import { INSTITUTES_TABLE } from "@/routes/_app/personal/_layout/archive/-consts";
import { REDIP_TABLE } from "@/routes/_app/analysis/_layout/archive/-consts";
import { ESTATE_TABLE } from "@/routes/_app/analysis/_layout/archive/-consts";
import { invoke } from "@tauri-apps/api/core";

export async function getCustomTableFields(table: string) {
  try { return await invoke<GenericGetResponse<string[]>>("get_custom_table_fields", { tableName: table }) }
  catch (error) { return error as GenericGetResponse<null> }
}

export async function getInstitutes() {
  try { return await invoke<GenericGetResponse<Record<string, string>[]>>("get_institutes") } catch (error) { return error as GenericGetResponse<null> }
}

export async function createInstitute(data: string) {
  try { return await invoke<GenericPostResponse>("create_custom_row", { tableName: INSTITUTES_TABLE, data: data }) }
  catch (error) { return error as GenericPostResponse }
}

export async function getRedip() {
  try { return await invoke<GenericGetResponse<Record<string, string>[]>>("get_redip") } catch (error) { return error as GenericGetResponse<null> }
}

export async function createRedip(data: string) {
  try { return await invoke<GenericPostResponse>("create_custom_row", { tableName: REDIP_TABLE, data: data }) }
  catch (error) { return error as GenericPostResponse }
}

export async function getEstate() {
  try {
    const response = await invoke<GenericGetResponse<Record<string, string>[]>>("get_estate");
    console.log("getEstate response:", response);
    return response;
  } catch (error) {
    console.error('Error fetching estate data:', error);
    return { error };
  }
}

export async function createEstate(data: string) {
  try { return await invoke<GenericPostResponse>("create_custom_row", { tableName: ESTATE_TABLE, data: data }) }
  catch (error) { return error as GenericPostResponse }
}

export async function getCustomTable(tableName: string, searchTerm?: string) {
  try {
    const response = await invoke<GenericGetResponse<Record<string, string>[]>>("get_custom_table", { tableName, searchTerm });
    console.log("getCustomTable response:", response);
    return response;
  } catch (error) {
    console.error('Error fetching table data:', error);
    return error as GenericGetResponse<null>;
  }
}

export async function createCustomRow(data: string, table_name: string) {
  try { return await invoke<GenericPostResponse>("create_custom_row", { tableName: table_name, data: data }) }
  catch (error) { return error as GenericPostResponse }
}
