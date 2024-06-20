// Assets - icons
import { BuildingsIcon, EditIcon, ShieldStartIcon, TrashIcon, UserIcon } from '../../assets/icons';
// Libraries
import { Table } from 'antd';
// Styles
import './AdministratorStyle.scss';


const UserColumns = [
  {
    title: 'Nombre',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Rol',
    dataIndex: 'Role',
    key: 'Role',
  },
  {
    title: 'Documento',
    dataIndex: 'document',
    key: 'document',
  },
  {
    title: 'Contraseña',
    dataIndex: 'password',
    key: 'password',
  },
  {
    title: '',
    width: '80px',
    render: () => <div className='administrator-page__btn-container'>
      <button className='administrator-page__btn--edit'><img src={EditIcon} alt="edit-icon" /></button>
      <button className='administrator-page__btn--delete'><img src={TrashIcon} alt="tash-icon" /></button>
    </div>,
    key: 'actions',
  },
];
const SitesColumns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Nombre',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '',
    width: '80px',
    render: () => <div className='administrator-page__btn-container'>
      <button className='administrator-page__btn--edit'><img src={EditIcon} alt="edit-icon" /></button>
      <button className='administrator-page__btn--delete'><img src={TrashIcon} alt="tash-icon" /></button>
    </div>,
    key: 'actions',
  },
];
const RolesColumns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Nombre',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '',
    width: '80px',
    render: () => <div className='administrator-page__btn-container'>
      <button className='administrator-page__btn--edit'><img src={EditIcon} alt="edit-icon" /></button>
      <button className='administrator-page__btn--delete'><img src={TrashIcon} alt="tash-icon" /></button>
    </div>,
    key: 'actions',
  },
];

const AdministratorPage = () => {
  return (
    <div className='administrator-page'>
      <div className="administrator-page__users">
        <div className="administrator-page__header">
          <div className="administrator-page__header__title">
            <img src={UserIcon} alt="icon-user" />
            <span>Usuarios</span>
          </div>
          <div className="administrator-page__header__button">
            <button>Crear usuario</button>
          </div>
        </div>
        <div className="administrator-page__users__table">
          <Table columns={UserColumns} dataSource={[{}]} />
        </div>
      </div>
      <div className="administrator-page__others">
        <div className="administrator-page__others__sites">
          <div className="administrator-page__header">
            <div className="administrator-page__header__title">
              <img src={BuildingsIcon} alt="icon-user" />
              <span>Sedes</span>
            </div>
            <div className="administrator-page__header__button">
              <button>Crear Sede</button>
            </div>
          </div>
          <div className="administrator-page__others__sites__table">
            <Table columns={SitesColumns} dataSource={[{}]} />
          </div>
        </div>
        <div className="administrator-page__others__roles">
          <div className="administrator-page__header">
            <div className="administrator-page__header__title">
              <img src={ShieldStartIcon} alt="icon-user" />
              <span>Roles</span>
            </div>
            <div className="administrator-page__header__button">
              <button>Crear Rol</button>
            </div>
          </div>
          <div className="administrator-page__others__roles__table">
            <Table columns={RolesColumns} dataSource={[{}]} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdministratorPage;