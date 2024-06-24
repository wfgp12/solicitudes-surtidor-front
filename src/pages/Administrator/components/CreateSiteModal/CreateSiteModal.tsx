//Libraries
import { Modal } from 'antd';
import { useState } from 'react';
//hooks
import { useForm } from '../../../../hooks/useForm';
//models
import { SectionCreate, SiteCreate } from '../../../../models/sites';
import { createServiceService, createSiteService } from '../../../../service/sites/sites.service';
//Styles
import './CreateSiteModalStyles.scss'
import { CloseSquareIcon } from '../../../../assets/icons';


interface ModalProps {
    onEdit?: boolean,
    isShowModal: boolean;
    onClose: () => void;
}
export const CreateSiteModal = ({ isShowModal, onClose }: ModalProps) => {

    const [sections, setSections] = useState<SectionCreate[]>([])
    const { values, handleChange, resetForm } = useForm<SiteCreate>({
        name: ''
    });

    const handelOk = async () => {
        try {
            const site = await createSiteService(values);

            await Promise.all(sections.map(section => createServiceService(section, site.id)))
            resetForm()
            setSections([])
            onClose()
        } catch (error) {
            console.log(error)
        }
    }
    const handelCancel = () => {
        resetForm()
        setSections([])
        onClose()
    }

    const handleAddSection = () => {
        setSections((ps) => ([...ps, { identifier: '', name: '' }]))
    }

    const handleSectionChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSections((prevSections) =>
            prevSections.map((section, i) =>
                i === index ? { ...section, [name]: value } : section
            )
        );
    };

    const renderSectionForm = (section: SectionCreate, index: number) => (
        <div key={index} className="create-site-modal__sections__content">
            {Object.keys(section).map((field) => (
                <div key={field} className="create-site-modal__sections__content__field">
                    <label>{`${field}`}: </label>
                    <input
                        type="text"
                        name={field}
                        value={section[field as keyof SectionCreate]}
                        onChange={(e) => handleSectionChange(index, e)}
                        required
                    />
                </div>
            ))}
            <button onClick={() => setSections((prevSections) => prevSections.filter((_, i) => i !== index))}>
                <img src={CloseSquareIcon} alt="icon-close" />
            </button>
        </div>
    );

    return (
        <Modal open={isShowModal} title='Crear nuevo rol' onOk={handelOk} onCancel={handelCancel} onClose={handelCancel} className='create-site-modal'>
            <div className="edit-request-modal">
                <div className="edit-request-modal__field">
                    <label>Nombre: </label>
                    <input
                        type="text"
                        name='name'
                        value={values.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className='create-site-modal__sections'>
                    <div className="create-site-modal__sections__header">
                        <span>Secciones</span>
                        <button onClick={handleAddSection}>Agregar Sección</button>
                    </div>

                    {sections.map((s, index) => renderSectionForm(s, index))}
                </div>
            </div>

        </Modal>
    )
}
