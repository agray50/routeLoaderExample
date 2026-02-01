/** User from external integration */
export interface User {
  id: number;
  name: string;
  uuid: string;
}

/** Resource from backend */
export interface Resource {
  uuid: string;
  name: string;
  createdAt: string;
}
