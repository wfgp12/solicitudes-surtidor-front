import { useEffect, useState } from "react"
import { getListSitesService } from "../service/sites/sites.service"
import { SiteDAO } from "../models/sites"

export const useSites = () => {
  const [sites, setSites] = useState<SiteDAO[]>([])
  const [refreshCount, setRefreshCount] = useState(0);

  useEffect(() => {
    getListSitesService()
      .then((response) => {
        setSites(response)
      })
    setSites([])
    return () => {

    }
  }, [refreshCount])

  const refreshSites = () => {
    setRefreshCount(prevCount => prevCount + 1);
  };

  return {
    sites,
    refreshSites
  }
}