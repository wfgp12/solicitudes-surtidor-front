import { useEffect, useState } from "react"
import { getListRoleService } from "../service/user/user.service"
import { RoleDAO } from "../models/user"

export const useRoles = () => {
  const [roles, setRoles] = useState<RoleDAO[]>([])
  const [refreshCount, setRefreshCount] = useState(0);

  useEffect(() => {
    getListRoleService()
      .then((response) => {
        setRoles(response);
      })
      .catch((error) => console.error(error))
    return () => {
      setRoles([])
    }
  }, [refreshCount])

  const refreshRoles = () => {
    setRefreshCount(prevCount => prevCount + 1);
  };

  return {
    roles,
    refreshRoles
  }
}
