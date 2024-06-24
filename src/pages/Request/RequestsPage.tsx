// Assets - icons
import { DotsIcon } from '../../assets/icons';
// Libraries
import { Table, TableProps } from 'antd'
import { useEffect, useState } from 'react';
// Styles
import './RequestStyles.scss';
// Components
import ProtectedComponent from '../../components/ProtectedComponent/ProtectedComponent';
import EditRequestsModal from './components/EditRequestsModal/EditRequestsModal';
import { getTableColumnsService } from '../../service/table-config/table-config.service';

export const RequestsPage = () => {
  const [refreshIndex, setRefreshIndex] = useState(0)
  useEffect(() => {
    getTableColumnsService('solicitudes')
      .then((resp) => {
        console.log(resp)
        setRequestColumns([
          ...resp,
          {
            title: '',
            render: () => (
              <div className='requests-page__list__actions'>
                <button className='requests-page__list__actions__btn'>
                  <img src={DotsIcon} alt="icon-dots" />
                </button>
              </div>
            ),
            key: 'createDate'
          }
        ])
      })
    return () => {
      setRequestColumns([{
        title: '',
        render: () => (
          <div className='requests-page__list__actions'>
            <button className='requests-page__list__actions__btn'>
              <img src={DotsIcon} alt="icon-dots" />
            </button>
          </div>
        ),
        key: 'createDate'
      }])
    }
  }, [refreshIndex])

  const [isShowModal, setIsShowModal] = useState(false)
  const [requestColumns, setRequestColumns] = useState<TableProps['columns']>([{
    title: '',
    render: () => (
      <div className='request-page__list__actions'>
        <button className='request-page__list__actions__btn'>
          <img src={DotsIcon} alt="icon-dots" />
        </button>
      </div>
    ),
    key: 'createDate'
  }])

  return (
    <div className="requests-page">
      <div className="requests-page__header">
        <div className="requests-page__header__title">
          <span>Mis Solicitudes</span>
        </div>
        <div className='requests-page__header__actions'>
          <ProtectedComponent permission={['administrador']}>
            <button onClick={() => setIsShowModal(true)} className='requests-page__header__actions--edit'>
              Editar tabla
            </button>
          </ProtectedComponent>
          <button>
            crear nueva solicitud
          </button>
        </div>
      </div>
      <div className="requests-page__list">
        <Table columns={requestColumns} dataSource={[{}]} />
      </div>
      <EditRequestsModal
        isShowModal={isShowModal}
        onClose={() => {
          setRefreshIndex((ps) => ps+1)
          setIsShowModal(false)
        }} />
    </div>
  )
}