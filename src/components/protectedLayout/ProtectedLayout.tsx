// Actions
import { logoutAction } from "../../redux/slices/authSlice";
// Libraries
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
// Store - Hooks
import { useAppDispatch, useAppSelector } from "../../redux/store/hooks";
// Assets - icons
import LogOutIcon from "../../assets/icons/icon-logout.svg";
import LogoSurtidor from "../../assets/icons/logo-surtidor.svg";
// Styles
import "./ProtectedLayout.scss";
// Utils
import { routes } from "../../utils/routes-location-utils";

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
    const [openSideBar, setOpenSideBar] = useState<boolean>(false);
    const user = useAppSelector((state) => state.auth.user);
    const dispatch = useAppDispatch();

    const handleLogOut = () => {
        dispatch(logoutAction());
    };

    return (
        <div className="protected-layout">
            <nav className="protected-layout__navBar">
                <div className="protected-layout__logo-container">
                    <div className="protected-layout__navBar__burger-container">
                        <label className="protected-layout__navBar__burger">
                            <input
                                type="checkbox"
                                id="burger"
                                onChange={(e) => setOpenSideBar(e.target.checked)}
                            />
                            <span></span>
                            <span></span>
                            <span></span>
                        </label>
                    </div>
                    <div className="protected-layout__logo-container__logo">
                        <img src={LogoSurtidor} alt="logo" />
                    </div>
                </div>
                <ul className="protected-layout__navBar__menu">
                    <li className="protected-layout__navBar__user">
                        <span>{`${user?.name} ${user?.lastName}`}</span>
                        <span className="subtitle">{user?.email}</span>
                    </li>
                </ul>
            </nav>
            <div className="protected-layout__container">
                <div
                    className={
                        openSideBar
                            ? "protected-layout__side-bar protected-layout__side-bar--open"
                            : "protected-layout__side-bar"
                    }
                >
                    <div className="protected-layout__side-bar__menu">
                        {routes
                            .filter(route => route.permissions.length === 0 || route.permissions.includes(user!.role))
                            .map((route, index) => (
                                <NavLink
                                    key={index}
                                    className={({ isActive }) =>
                                        isActive
                                            ? "protected-layout__side-bar__item protected-layout__side-bar__item--active"
                                            : "protected-layout__side-bar__item"
                                    }
                                    to={route.path}
                                >
                                    <img src={route.icon} alt="home-icons" />
                                    <span>{route.label}</span>
                                </NavLink>
                            ))}
                    </div>
                    <div className="protected-layout__side-bar__menu">
                        <button
                            className="protected-layout__side-bar__item protected-layout__side-bar__log-out"
                            onClick={handleLogOut}
                        >
                            <img src={LogOutIcon} alt="log-out-icon" />
                            LOG OUT
                        </button>
                    </div>
                </div>
                <div className="protected-layout__content">{children}</div>
            </div>
        </div>
    );
};

export default ProtectedLayout;
