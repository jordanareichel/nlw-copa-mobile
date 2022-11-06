import { Participant } from "../Participants";

export type Pools = {
  id: string;
  code: string;
  title: string;
  ownerId: string;
  createdAt: string;
  owner: {
    name: string;
  },
  participants: Participant[];
  _count: {
    participants: number;
  }
}