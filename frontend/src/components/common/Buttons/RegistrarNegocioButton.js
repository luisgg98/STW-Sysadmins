import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

const RegistrarNegocioButton = () => {
    return (
        <div class="row d-flex flex-nowrap justify-content-center">
            <div
                class="d-flex col-xl-2 pt-2 justify-content-center pl
        -2"
            >
                <Link to="/registrarNegocio">
                    <button class="btn btn-md btn-lg btn-primary mr-5 mt-2">
                        Registrar Negocio
                    </button>
                </Link>
            </div>
        </div>
    );
};
export default RegistrarNegocioButton;
