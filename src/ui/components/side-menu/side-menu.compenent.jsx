import "./side-menu.css";
import { useState } from "react";
import { SUBMENUS } from "../../../core/constants";
import { SubMenu } from "../sub-menu/sub-menu.component.jsx";
import { VersoAleatorio } from "../verso-aleatorio/verso-aleatorio.component.jsx";
import jesusImageSideMenuHeader from "../../../assets/images/jesus-login.png";

const SideMenu = ({ parametros, submenus, identificadorSubmenuAtual }) => {
  const getSubMenu = (identificador) => {
    return SUBMENUS.find((element) => element.identificador === identificador);
  };

  const OBJETO_INICIAL_SIDEMENU = {
    submenuAtual: getSubMenu(identificadorSubmenuAtual),
    submenus: submenus?.map((identificador) => getSubMenu(identificador)),
    sideMenuResponsivoMobileVisivel: false,
  };

  const [dadosSideMenu, setDadosSideMenu] = useState(OBJETO_INICIAL_SIDEMENU);

  const onAparecerSideMenuResponsivo = () => {
    setDadosSideMenu({
      ...dadosSideMenu,
      sideMenuResponsivoMobileVisivel:
        !dadosSideMenu?.sideMenuResponsivoMobileVisivel,
    });
  };

  return (
    <div className="side-menu">
      <div className="side-menu__responsive-header">
        <img
          src={jesusImageSideMenuHeader}
          alt="Ícone de Jesus"
          className="side-menu__jesus-icon"
        />

        <button
          className="side-menu__botao-hamburger"
          onClick={onAparecerSideMenuResponsivo}
        >
          <div
            className={`side-menu__listra-botao-hamburguer ${
              dadosSideMenu?.sideMenuResponsivoMobileVisivel
                ? "side-menu__mobile-listra-cima"
                : ""
            }`}
          ></div>
          <div
            className={`side-menu__listra-botao-hamburguer ${
              dadosSideMenu?.sideMenuResponsivoMobileVisivel
                ? "side-menu__mobile-listra-meio"
                : ""
            }`}
          ></div>
          <div
            className={`side-menu__listra-botao-hamburguer ${
              dadosSideMenu?.sideMenuResponsivoMobileVisivel
                ? "side-menu__mobile-listra-abaixo"
                : ""
            }`}
          ></div>
        </button>
      </div>

      <div
        className={`side-menu__side ${
          dadosSideMenu?.sideMenuResponsivoMobileVisivel
            ? "side-menu__mobile-visivel"
            : ""
        }`}
      >
        <div
          className="side-menu__submenu-atual"
          style={{
            backgroundImage: "url(" + dadosSideMenu?.submenuAtual?.image + ")",
          }}
        ></div>

        <div className="side-menu__submenus">
          {dadosSideMenu?.submenus !== null &&
          dadosSideMenu?.submenus?.length > 0
            ? dadosSideMenu?.submenus?.map((submenu, index) => (
                <SubMenu
                  key={index}
                  image={submenu?.image}
                  descricao={submenu?.descricao}
                  rota={submenu?.rota}
                  parametros={parametros}
                />
              ))
            : null}

          <div className="side-menu__last">
            <div className="side-menu__last-descricao font-genos">
              SEM_MAIS_ITENS
            </div>
            <p className="side-menu__last-content">...</p>
          </div>
        </div>

        <VersoAleatorio />
      </div>
    </div>
  );
};

export { SideMenu };
