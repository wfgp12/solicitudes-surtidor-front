import { Modal, Select } from 'antd';
import './CreateUserModal.scss'
import { RoleSelector, UserCreate } from '../../../../models/user';
import { useForm } from '../../../../hooks/useForm';
import { useEffect, useState } from 'react';
import { createUserService, getRoleSelectorService } from '../../../../service/user/user.service';

interface CreateUserModalProps {
    onEdit?: boolean,
    isShowModal: boolean;
    onClose: () => void;
}
export const CreateUserModal = ({ isShowModal, onClose }: CreateUserModalProps) => {
    
    const [roleSelector, setRoleSelector] = useState<RoleSelector[]>([])
    const { values, handleChange, setValue, resetForm } = useForm<UserCreate>({
        id_role: 0,
        name: '',
        document: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    
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

    const handelOk = async() => {
        try {
            console.log(values);
            await createUserService(values)
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
        <Modal open={isShowModal} title='Crear nuevo usuario' onOk={handelOk} onCancel={handelCancel}>
            <div className="edit-request-modal">
                {Object.keys(values).map((value) => (
                    <div key={value} className="edit-request-modal__field">
                        <label>{value}: </label>
                        {value === 'id_role' 
                            ?<Select
                            placeholder="Selecciona un rol"
                            onChange={(value) => setValue('id_role', value)}
                            options={roleSelector.map(({id, name}:RoleSelector) => ({value:id, label: name}))}
                          />
                            : <input type={value === "password" || value === "confirmPassword"? "password":"text"} name={value} value={values[value as keyof UserCreate]} onChange={handleChange}/>
                        }
                    </div>
                ))
                }
            </div>

        </Modal>
    )
}
