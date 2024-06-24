// Libraries
import { Checkbox, CheckboxProps, Modal, Select } from "antd"
// Hooks
import { useForm } from "../../../../hooks/useForm"
// Styles
import './EditRequestModalStyles.scss'
import { TableConfig, TableRequestIndex } from "../../../../models/tables";
import { useEffect } from "react";
import { getTableConfigService, updateTableConfigService } from "../../../../service/table-config/table-config.service";


interface EditRequestModalProps {
    isShowModal: boolean;
    onClose: () => void;
}
const EditRequestsModal = ({ isShowModal = false, onClose }: EditRequestModalProps) => {
    const { values, setValue, setValues, resetForm } = useForm<TableConfig<TableRequestIndex>>({
        "Archivo adjunto": {
            isVisible: false,
            order: 0
        },
        Descripcion: {
            isVisible: false,
            order: 0
        },
        Estado: {
            isVisible: false,
            order: 0
        },
        "Fecha de respuesta": {
            isVisible: false,
            order: 0
        },
        "Fecha de solicitud": {
            isVisible: false,
            order: 0
        },
        Referencia: {
            isVisible: false,
            order: 0
        },
        "Revisado por": {
            isVisible: false,
            order: 0
        },
        "Tipo de solicitud": {
            isVisible: false,
            order: 0
        }
    });

    useEffect(() => {
        isShowModal && getTableConfigService('solicitudes')
            .then((resp) => {
                console.log(resp)
                setValues(resp)
            })
            .catch((error) => console.error(error))
        return () => {
            resetForm()
        }
    }, [isShowModal])

    const handelOk = async () => {
        const columns = Object.entries(values).map(([key, value]) => ({
            name: key,
            isVisible: value.isVisible,
            order: value.order
        }));
        await updateTableConfigService('solicitudes', columns)
        resetForm()
        onClose()
    }
    const handelCancel = () => {
        resetForm()
        onClose()
    }
    const handelChange: CheckboxProps['onChange'] = (e) => {
        setValue(e.target.name as keyof TableConfig<TableRequestIndex>, {
            ...values[e.target.name as keyof TableConfig<TableRequestIndex>],
            isVisible: e.target.checked
        });
    }
    const handleOrderChange = (name: keyof TableConfig<TableRequestIndex>, order: number) => {
        setValue(name, {
            ...values[name],
            order
        });
    };

    return (
        <Modal open={isShowModal} title='Editar tabla de solicitudes' onOk={handelOk} onCancel={handelCancel}>
            <div className="edit-request-modal">
                {Object.keys(values).map((value) => (
                    <div key={value} className="edit-request-modal__field">
                        <div>
                            <label>{value}: </label>

                            <Checkbox
                                checked={values[value as keyof TableConfig<TableRequestIndex>].isVisible}
                                name={value}
                                onChange={handelChange}
                            />
                        </div>
                        <div>
                            <label>orden: </label>
                            <Select
                                value={values[value as keyof TableConfig<TableRequestIndex>].order}
                                onChange={(order: number) => handleOrderChange(value as keyof TableConfig<TableRequestIndex>, order)}
                                options={Object.keys(values).map((_value, index) => ({ value: index + 1, label: index + 1 }))}
                            />
                        </div>
                    </div>
                ))
                }
            </div>

        </Modal>
    )
}

export default EditRequestsModal