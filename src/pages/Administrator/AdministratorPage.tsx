// Assets - icons
import { BuildingsIcon, EditIcon, ShieldStartIcon, TrashIcon, UserIcon } from '../../assets/icons';
// Libraries
import { Modal, Table } from 'antd';
// Styles
import './AdministratorStyle.scss';
// hooks
import { useUser } from '../../hooks/useUser';
import { useSites } from '../../hooks/useSites';
import { useRoles } from '../../hooks/useRole';
// Models
import { ColumnsType } from 'antd/es/table';
import { PermissionDAO, RoleDAO, } from '../../models/user';
import { SectionDAO, SiteDAO } from '../../models/sites';
import { UserIndexTable } from '../../models/tables';
import { CreateUserModal } from './components/CreateUserModal/CreateUserModal';
import { useState } from 'react';
import { CreateRoleModal } from './components/CreateRoleModal/CreateRoleModal';
import { CreateSiteModal } from './components/CreateSiteModal/CreateSiteModal';
import { deleteRoleService, deleteUserService } from '../../service/user/user.service';
import { deleteSiteService } from '../../service/sites/sites.service';



export const AdministratorPage = () => {
  const { users, refreshUsers } = useUser();
  const { sites, refreshSites } = useSites();
  const { roles, refreshRoles } = useRoles();

  const [modalState, setModalState] = useState({
    showUserCreateModal: false,
    showModalDeleteUser: false,
    showRoleCreateModal: false,
    showModalDeleteRole: false,
    showSiteCreateModal: false,
    showModalDeleteSite: false,
  })

  const [idsState, setIdsState] = useState({
    user: undefined,
    site: undefined,
    role: undefined
  })

  const UserColumns: ColumnsType<UserIndexTable> = [
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Rol',
      dataIndex: 'role',
      key: 'role',
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
      width: '95px',
      render: (record) => <div className='administrator-page__btn-container'>
        <button
          onClick={() => {
            setIdsState((ps) => ({ ...ps, user: record.id }))
            setModalState((ps) => ({ ...ps, showUserCreateModal: true }))
          }}
          className='administrator-page__btn--edit'
        >
          <img src={EditIcon} alt="edit-icon" />
        </button>
        <button
          onClick={() => {
            setIdsState((ps) => ({ ...ps, user: record.id }))
            setModalState((ps) => ({ ...ps, showModalDeleteUser: true }))
          }}
          className='administrator-page__btn--delete'
        >
          <img src={TrashIcon} alt="tash-icon" />
        </button>
      </div>,
      key: 'actions',
    },
  ];
  const SitesColumns: ColumnsType<SiteDAO> = [
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
      width: '95px',
      render: (record) => <div className='administrator-page__btn-container'>
        <button className='administrator-page__btn--edit'><img src={EditIcon} alt="edit-icon" /></button>
        <button
          onClick={() => {
            setIdsState((ps) => ({ ...ps, site: record.id }))
            setModalState((ps) => ({ ...ps, showModalDeleteSite: true }))
          }}
          className='administrator-page__btn--delete'
        >
          <img src={TrashIcon} alt="tash-icon" />
        </button>
      </div>,
      key: 'actions',
    },
  ];
  const SectionColumns: ColumnsType<SectionDAO> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Identificador',
      dataIndex: 'identifier',
      key: 'identifier',
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
  const RolesColumns: ColumnsType<RoleDAO> = [
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
      width: '95px',
      render: (record) => <div className='administrator-page__btn-container'>
        <button className='administrator-page__btn--edit'><img src={EditIcon} alt="edit-icon" /></button>
        <button
          onClick={() => {
            setIdsState((ps) => ({ ...ps, role: record.id }))
            setModalState((ps) => ({ ...ps, showModalDeleteRole: true }))
          }}
          className='administrator-page__btn--delete'
        >
          <img src={TrashIcon} alt="tash-icon" />
        </button>
      </div>,
      key: 'actions',
    },
  ];
  const PermissionColumns: ColumnsType<PermissionDAO> = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Name', dataIndex: 'name', key: 'name' },
  ];

  const handleDeleteUser = async () => {
    try {
      if (idsState.user) await deleteUserService(idsState.user);
    } catch (error) {
      console.error(error)
    }
    refreshUsers()
    setIdsState((ps) => ({ ...ps, user: undefined }))
    setModalState((ps) => ({ ...ps, showModalDeleteUser: false }))
  }

  const handleDeleteSites = async () => {
    try {
      if (idsState.site) await deleteSiteService(idsState.site);
    } catch (error) {
      console.error(error)
    }
    refreshSites()
    setIdsState((ps) => ({ ...ps, site: undefined }))
    setModalState((ps) => ({ ...ps, showModalDeleteSite: false }))
  }
  const handleDeleteRole = async () => {
    try {
      if (idsState.role) await deleteRoleService(idsState.role);
    } catch (error) {
      console.error(error)
    }
    refreshRoles()
    setIdsState((ps) => ({ ...ps, role: undefined }))
    setModalState((ps) => ({ ...ps, showModalDeleteRole: false }))
  }

  return (
    <div className='administrator-page'>
      <div className="administrator-page__users">
        <div className="administrator-page__header">
          <div className="administrator-page__header__title">
            <img src={UserIcon} alt="icon-user" />
            <span>Usuarios</span>
          </div>
          <div className="administrator-page__header__button">
            <button onClick={() => setModalState((ps) => ({ ...ps, showUserCreateModal: true }))}>
              Crear usuario
            </button>
          </div>
        </div>
        <div className="administrator-page__users__table">
          <Table
            columns={UserColumns}
            dataSource={users}
          />
          <Modal
            title="Esta seguro de eliminar este usuario"
            open={modalState.showModalDeleteUser}
            onOk={handleDeleteUser}
            onCancel={() => setModalState((ps) => ({ ...ps, showModalDeleteUser: false }))}
          />
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
              <button onClick={() => setModalState((ps) => ({ ...ps, showSiteCreateModal: true }))}>Crear Sede</button>
            </div>
          </div>
          <div className="administrator-page__others__sites__table">
            <Table
              // scroll={{ y: 300, x: ''}}
              columns={SitesColumns}
              dataSource={sites}
              rowKey="id"
              expandable={{
                expandedRowRender: (record) => (
                  <Table
                    columns={SectionColumns}
                    dataSource={record.sections}
                    rowKey="id"
                    pagination={false}
                  />
                ),
                rowExpandable: (record) => record.sections.length > 0,
              }}
            />
            <Modal
              title="Esta seguro de eliminar esta Sede"
              open={modalState.showModalDeleteSite}
              onOk={handleDeleteSites}
              onCancel={() => setModalState((ps) => ({ ...ps, showModalDeleteSite: false }))}
            />
          </div>
        </div>
        <div className="administrator-page__others__roles">
          <div className="administrator-page__header">
            <div className="administrator-page__header__title">
              <img src={ShieldStartIcon} alt="icon-user" />
              <span>Roles</span>
            </div>
            <div className="administrator-page__header__button">
              <button onClick={() => setModalState((ps) => ({ ...ps, showRoleCreateModal: true }))}>Crear Rol</button>
            </div>
          </div>
          <div className="administrator-page__others__roles__table">
            <Table
              columns={RolesColumns}
              dataSource={roles}
              // scroll={{ y: 300 }}
              rowKey="id"
              expandable={{
                expandedRowRender: (record) => (
                  <Table
                    columns={PermissionColumns}
                    dataSource={record.permissions}
                    rowKey="id"
                    pagination={false}
                  />
                ),
                rowExpandable: (record) => record.permissions.length > 0,
              }}
            />
            <Modal
              title="Esta seguro de eliminar este Rol"
              open={modalState.showModalDeleteRole}
              onOk={handleDeleteRole}
              onCancel={() => setModalState((ps) => ({ ...ps, showModalDeleteRole: false }))}
            />
          </div>
        </div>
      </div>
      <CreateUserModal
        userId={idsState.user}
        isShowModal={modalState.showUserCreateModal}
        onClose={() => {
          refreshUsers()
          setIdsState((ps) => ({ ...ps, user: undefined }))
          setModalState((ps) => ({ ...ps, showUserCreateModal: false }))
        }} />
      <CreateSiteModal
        isShowModal={modalState.showSiteCreateModal}
        onClose={() => {
          refreshSites()
          setIdsState((ps) => ({ ...ps, user: undefined }))
          setModalState((ps) => ({ ...ps, showSiteCreateModal: false }))
        }}
        />
      <CreateRoleModal
        isShowModal={modalState.showRoleCreateModal}
        onClose={() => {
          refreshRoles()
          setIdsState((ps) => ({ ...ps, user: undefined }))
          setModalState((ps) => ({ ...ps, showRoleCreateModal: false }))
        }}
      />
    </div>
  )
}