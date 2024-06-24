import { Modal, Select } from 'antd';
import { PermissionDAO, RoleCreate } from '../../../../models/user';
import { useForm } from '../../../../hooks/useForm';
import { useEffect, useState } from 'react';
import { createRoleService, getListPermissionService } from '../../../../service/user/user.service';

interface CreateUserModalProps {
    onEdit?: boolean,
    isShowModal: boolean;
    onClose: () => void;
}
export const CreateRoleModal = ({ isShowModal, onClose }: CreateUserModalProps) => {

    const [permissionSelector, setPermissionSelector] = useState<PermissionDAO[]>([])
    const { values, handleChange, setValue, resetForm } = useForm<RoleCreate>({
        name: '',
        permissions: []
    });

    useEffect(() => {
        if (isShowModal) {
            getListPermissionService()
                .then((resp) => setPermissionSelector(resp))
                .catch((error) => console.error(error))
        }
        return () => {
            setPermissionSelector([])
        }
    }, [isShowModal])

    const handelOk = async () => {
        try {
            await createRoleService(values)
            resetForm()
            onClose()
        } catch (error) {
            console.log(error)
        }
    }
    const handelCancel = () => {
        resetForm()
        onClose()
    }
    return (
        <Modal open={isShowModal} title='Crear nuevo rol' onOk={handelOk} onCancel={handelCancel}>
            <div className="edit-request-modal">
                {Object.keys(values).map((value) => (
                    <div key={value} className="edit-request-modal__field">
                        <label>{value}: </label>
                        {value === 'permissions'
                            ? <Select
                                mode='multiple'
                                allowClear
                                placeholder="Seleccione los permisos"
                                onChange={(value) => setValue('permissions', value)}
                                options={permissionSelector.map(({ id, name }: PermissionDAO) => ({ value: id, label: name }))}
                            />
                            : <input
                                type="text"
                                name={value} value={values[value as keyof RoleCreate] as string}
                                onChange={handleChange}
                            />
                        }
                    </div>
                ))
                }
            </div>

        </Modal>
    )
}
