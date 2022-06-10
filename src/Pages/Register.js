import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FormLogin from "../Component/FormLogin";
import FormRegister from "../Component/FormRegister";

function Register() {

    const history = useNavigate()

    const handleSubmit = (value) => {
        axios.post(`${process.env.REACT_APP_URL_BACKEND}/profile`, value).then((res) => {
            history('/login')
            axios.post(`${process.env.REACT_APP_URL_BACKEND}/profile_share`, {
                user_id: res.data.id,
                share: false,
                url: `${process.env.REACT_APP_URL_FRONTEND}/${value.name + "HelloGuy"}`,
                nickname: `${value.name + "HelloGuy"}`
            })
            alert('success register')

        }).catch((err) => {
            console.log(err.response)
        })
    }

    useEffect(() => {
        if (localStorage.getItem("profile_id")) {
            history("/")
        }
    }, [])

    return (
        <div className='d-flex justify-content-center' >
            <div className="tab-content " style={{ width: "50%" }}>
                <ul className="nav nav-pills nav-justified mb-3" id="ex1" role="tablist">
                    <li className="nav-item" role="presentation">
                        <a className="nav-link" id="tab-register" data-mdb-toggle="pill" href="/login" role="tab" aria-controls="pills-register" aria-selected="false">Login</a>
                    </li>
                    <li className="nav-item" role="presentation">
                        <a className="nav-link active" id="tab-login" data-mdb-toggle="pill" href="/register" role="tab" aria-controls="pills-login" aria-selected="true">Register</a>
                    </li>
                </ul>
                <div className="tab-pane fade show active" id="pills-login" role="tabpanel" aria-labelledby="tab-login">
                    <FormRegister handleSubmit={(value) => handleSubmit(value)} />
                </div>
            </div>
        </div>

    );
}

export default Register;