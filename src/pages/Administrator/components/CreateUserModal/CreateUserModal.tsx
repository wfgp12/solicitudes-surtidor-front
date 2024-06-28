import { Modal, Select } from 'antd';
import './CreateUserModal.scss'
import { RoleSelector, UserCreate } from '../../../../models/user';
import { useForm } from '../../../../hooks/useForm';
import { useEffect, useState } from 'react';
import { createUserService, getRoleSelectorService, getUserService, updateUserService } from '../../../../service/user/user.service';

interface CreateUserModalProps {
    userId?: number,
    isShowModal: boolean;
    onClose: () => void;
}
export const CreateUserModal = ({ isShowModal, onClose, userId }: CreateUserModalProps) => {
    const [roleSelector, setRoleSelector] = useState<RoleSelector[]>([])
    const { values, handleChange, setValue, setValues, resetForm } = useForm<UserCreate>({
        id_role: null,
        name: '',
        document: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    useEffect(() => {
        if (userId) {
            getUserService(userId)
                .then((resp) => setValues({
                    name: resp.name,
                    document: resp.document,
                    email: resp.email,
                    id_role: resp.role.id,
                    password: '',
                    confirmPassword: ''
                }))
                .catch((error) => console.error(error))
        }
        return () => {
            setRoleSelector([])
        }
    }, [userId])

    useEffect(() => {
        if (isShowModal) {
            getRoleSelectorService()
                .then((resp) => setRoleSelector(resp))
                .catch((error) => console.error(error))
        }
        return () => {
            setRoleSelector([])
        }
    }, [isShowModal])

    const handelOk = async () => {
        try {
            if (userId) {
                await updateUserService(userId, values)
            } else {
                await createUserService(values)
            }
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
        <Modal open={isShowModal} title={userId ? 'Editar usuario' : 'Crear nuevo usuario'} onOk={handelOk} onCancel={handelCancel}>
            <div className="edit-request-modal">
                {Object.keys(values).map((value) => userId && (value === "password" || value == "confirmPassword")
                    ? null
                    : (
                        <div key={value} className="edit-request-modal__field">
                            <label>{value}: </label>
                            {value === 'id_role'
                                ? <Select
                                    value={values.id_role}
                                    placeholder="Selecciona un rol"
                                    onChange={(value) => { console.log(value); setValue('id_role', value) }}
                                    options={roleSelector.map(({ id, name }: RoleSelector) => ({ value: id, label: name }))}
                                />
                                : <input
                                    type={value === "password" || value === "confirmPassword" ? "password" : "text"}
                                    name={value}
                                    value={values[value as keyof UserCreate] as number}
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
