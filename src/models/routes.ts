import { MainRole } from "./user"

export interface IRoute {
    path: string
    element: JSX.Element,
    label: string
    icon: string
    permissions: MainRole[]
}