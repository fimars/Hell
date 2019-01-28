export interface NavLink {
  level: number;
  text: string;
  id: string;
}
export interface Heading extends NavLink {
  parent?: string;
}