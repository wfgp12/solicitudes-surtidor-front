import { useEffect, useState } from "react"
import { mapperUserToUserIndexTable, UserIndexTable } from "../models/tables"
import { getListUserService } from "../service/user/user.service"

export const useUser = () => {
  const [users, setUsers] = useState<UserIndexTable[]>([])
  const [refreshCount, setRefreshCount] = useState(0);

  useEffect(() => {
    getListUserService()
      .then((response) => {
        const mapperResponse = response.map(user => mapperUserToUserIndexTable(user))

        setUsers(mapperResponse);
      })
      .catch((error) => console.error(error))
    return () => {
      setUsers([])
    }
  }, [refreshCount])

  const refreshUsers = () => {
    setRefreshCount(prevCount => prevCount + 1);
  };

  return {
    users,
    refreshUsers
  }
}
