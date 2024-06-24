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

const RequestsPage = () => {
  useEffect(() => {
    setRequestColumns([
      {
        title: 'Fecha de solicitud',
        dataIndex: 'createDate',
        key: 'createDate'
      },
      {
        title: 'Tipo de solicitud',
        dataIndex: 'type',
        key: 'type'
      },
      {
        title: 'Referencia',
        dataIndex: 'reference',
        key: 'reference'
      },
      {
        title: 'Archivo Adjunto',
        dataIndex: 'file',
        key: 'file'
      },
      {
        title: 'Estado',
        dataIndex: 'state',
        key: 'state'
      },
      {
        title: 'Revisado por',
        dataIndex: 'reviewer',
        key: 'reviewer'
      },
      {
        title: 'Fecha de respuesta',
        dataIndex: 'responseDate',
        key: 'responseDate'
      },
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
  }, [])

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
      <EditRequestsModal isShowModal={isShowModal} onClose={() => setIsShowModal(false)}/>
    </div>
  )
}

export default RequestsPage