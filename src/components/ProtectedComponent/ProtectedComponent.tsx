
import { useAppSelector } from '../../redux/store/hooks';
import { PermissionType } from '../../models/user';

interface ProtectedComponentProps {
    children: React.ReactNode;
    permission: PermissionType[];
}

const ProtectedComponent = ({ children, permission }: ProtectedComponentProps) => {
    const user = useAppSelector(state => state.auth.user);
    if (!user) return null

    const userPermissions = user.role.permissions.map((perm) => perm.name);
    const isAuthorized = permission.length === 0 || permission.some(perm => userPermissions.includes(perm));


    return isAuthorized ? <>{children}</> : null
}

export default ProtectedComponent;