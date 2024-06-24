// Libraries
import { Checkbox, CheckboxProps, Modal } from "antd"
// Hooks
import { useForm } from "../../../../hooks/useForm"
// Styles
import './EditRequestModalStyles.scss'

interface RequestsTableForm {
    createDate: boolean,
    type: boolean,
    reference: boolean,
    file: boolean,
    state: boolean,
    reviewer: boolean,
    responseDate: boolean
}

interface EditRequestModalProps {
    isShowModal: boolean;
    onClose: () => void;
}
const EditRequestsModal = ({ isShowModal = false, onClose }: EditRequestModalProps) => {
    const { values, setValue, resetForm } = useForm<RequestsTableForm>({
        createDate: true,
        type: true,
        reference: true,
        file: true,
        state: true,
        reviewer: true,
        responseDate: true
    });


    const handelOk = () => {
        console.log(values);
        onClose()
    }
    const handelCancel = () => {
        resetForm()
        onClose()
    }
    const handelChange: CheckboxProps['onChange'] = (e) => {
        setValue(e.target.name as keyof RequestsTableForm, e.target.checked)
    }

    return (
        <Modal open={isShowModal} title='Editar tabla de solicitudes' onOk={handelOk} onCancel={handelCancel}>
            <div className="edit-request-modal">
                {Object.keys(values).map((value) => (
                    <div key={value} className="edit-request-modal__field">
                        <label>{value}: </label>
                        <Checkbox
                            checked={values[value as keyof RequestsTableForm]}
                            name={value}
                            onChange={handelChange}
                        />
                    </div>
                ))
                }
            </div>

        </Modal>
    )
}

export default EditRequestsModal