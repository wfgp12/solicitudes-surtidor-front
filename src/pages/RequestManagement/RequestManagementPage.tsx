import './RequestManagementStyles.scss'

export const RequestManagementPage = () => {
    return (
        <div className='request-management'>
            <div className="request-management__managed">
                <div className="request-management__header">
                    <span>Solicitudes gestionadas</span>
                </div>
                <div className="request-management__list"></div>
            </div>
            <div className="request-management__pending">
                <div className="request-management__header">
                    <span>Solicitudes pendientes</span>
                </div>
                <div className="request-management__list"></div>
            </div>
        </div>
    )
}