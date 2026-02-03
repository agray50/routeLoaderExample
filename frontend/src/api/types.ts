/** User from external integration */
export interface User {
  uuid: string;
  name: string;
}

/** User detail from backend */
export interface UserDetail {
  id: string;
  name: string;
  createdAt: string;
}
