import { api } from "../../connection/index";
import { Pools } from "../../models/Pools";

export const getPools = async (): Promise<Pools> => {
	return await api.get('/pools');
};
