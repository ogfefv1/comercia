import { Link, Outlet } from "react-router-dom";
import './ui/Layout.css';
import Label from "../label/Label";
import LabelTypes from "../label/types/LabelTypes";
import { useContext } from "react";
import { AppContext } from "../app_context/AppContext";

export default function Layout() {
    const {user, cart} = useContext(AppContext);
    const profileTitle = user == null ? "Вход" : "Кабинет";

    return <>
    <header>
        <nav className="navbar navbar-expand-lg border-bottom">
            <div className="container-fluid">
                <Link to="/" className="navbar-brand">
                    Коммерция
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">

                <div className="nav-item">
                    <Label title="Каталог" type={LabelTypes.Black } />
                </div>    

                <form className="d-flex flex-grow-1" role="search">
                    <input className="form-control me-2 nav-search" type="search" placeholder="Search" aria-label="Search"/>
                    <button className="btn btn-outline-success" type="submit">Search</button>
                </form>
                
                <ul className="navbar-nav mb-2 mb-lg-0">
                    <li className="nav-item">
                        <Link to="/" className="nav-link" title="Trade-In" aria-label="Trade-In">
                            <Label title="Trade-In" />
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/privacy" className="nav-link" title="Ремонт" aria-label="Ремонт">
                            <Label title="Ремонт" type={LabelTypes.Violet} />
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/auth" className="nav-link" title={profileTitle} aria-label={profileTitle}>
                            <Label title={profileTitle} type={LabelTypes.Blue  } />
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/cart" className="nav-link" title={["Корзина", ...cart.items.map(item => item.product.name + ": " + item.cnt) ].join('\n')} aria-label="Корзина">
                            <Label title={"Корзина " + cart.items.reduce((n, item) => n + item.cnt, 0)} type={LabelTypes.White} />
                        </Link>
                    </li>
                </ul>
                </div>
            </div>
            </nav>
    </header>
    <main className="container mt-4"><Outlet /></main>
    <footer className="border-top p-3 text-muted">
        &copy; University &copy; KN-P-231, 2025. &emsp;
        Разработка коммерческих приложений. &emsp;
        <Link to="/privacy">Политика конфиденциальности сайта</Link>
    </footer>
    </>;
}