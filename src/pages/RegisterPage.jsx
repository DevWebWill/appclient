import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Link, redirect } from 'react-router-dom'
import CheckBox from '../components/checkbox/CheckBox'

export const RegisterPage = () => {

    const [checked, setChecked] = useState(false)

    function handleRegister(e) {
        e.preventDefault()

        const form = e.target
        const user = {
            name: form[0].value,
            email: form[1].value,
            password: form[2].value
        }

        fetch(process.env.REACT_APP_URL_API+"/register", {
            method: "POST",
            headers: {
                'Content-type': "application/json"
            },
            body: JSON.stringify(user)
        })
    }

    useEffect(() => {
        fetch(process.env.REACT_APP_URL_API+"/isuserauth", {
            headers: {
                'x-access-token': localStorage.getItem("token")
            },
        })
        .then(res => res.json())
        .then(data => data.isLogin ? redirect("/admin") : null)
    }, [])

    return (
        <section className="h-screen">
            <div className="lg:px-40 px-2 py-12 h-full bg-gradient-to-br from-black  to-purple-900">
                <div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
                    {/* <div className="md:w-8/12 lg:w-6/12 mb-12 md:mb-0">
                        <img
                            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                            className="w-full"
                            alt="Prueba"
                        />
                    </div> */}
                    <div className="md:w-8/12 lg:w-6/12 rounded shadow p-4 bg-white">
                        <div className='text-center p-4 text-2xl'>
                            Registro
                        </div>
                        <form onSubmit={event => handleRegister(event)}>
                            <div className="mb-6">
                                <input
                                    type="text"
                                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                    placeholder="Nombre"
                                />
                            </div>
                            <div className="mb-6">
                                <input
                                    type="text"
                                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                    placeholder="Correo electrónico"
                                />
                            </div>
                            <div className="mb-6">
                                <input 
                                    type="password"
                                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                    placeholder="Contraseña"
                                />
                            </div>

                            <div className="flex justify-between items-center mb-6">

                                <CheckBox 
                                    onChange={(e) => setChecked(e.target.checked)}
                                    onClick={() => {}}
                                    invalid={false}
                                    value={"Recuerdame"}
                                    labelText={"Recuerdame"}
                                    checked={checked}
                                />

                                {/* <div className="flex items-center justify-center">
                                    <CheckBoxGroup
                                        selectedValues={[]}
                                        remove={"true"}
                                        options={[
                                        { value: 1, label: "Option 1" },
                                        { value: 2, label: "Option 2" }
                                        ]}
                                    />
                                </div> */}

                                <a href="#!" className="text-blue-600 hover:text-blue-700 focus:text-blue-700 active:text-blue-800 duration-200 transition ease-in-out">
                                    ¿Ha perdido la contraseña?
                                </a>
                            </div>

                            <button
                                type="submit"
                                className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
                                data-mdb-ripple="true"
                                data-mdb-ripple-color="light"
                            >
                                Registrar
                            </button>

                            <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
                                <p className="text-center font-semibold mx-4 mb-0">OR</p>
                            </div>

                            <div className='grid grid-cols-3 gap-2'>
                                <a
                                    className="px-7 py-3 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full flex justify-center items-center mb-3"
                                    style={{backgroundColor: '#3b5998'}}
                                    href="#!"
                                    role="button"
                                    data-mdb-ripple="true"
                                    data-mdb-ripple-color="light"
                                >
                                    Google
                                </a>

                                <a
                                    className="px-7 py-3 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full flex justify-center items-center mb-3"
                                    style={{backgroundColor: '#3b5998'}}
                                    href="#!"
                                    role="button"
                                    data-mdb-ripple="true"
                                    data-mdb-ripple-color="light"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" className="w-3.5 h-3.5 mr-2">
                                        <path fill="currentColor" d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"/>
                                    </svg>
                                    Facebook
                                </a>
                                <a
                                    className="px-7 py-3 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full flex justify-center items-center mb-3"
                                    style={{backgroundColor: '#55acee'}}
                                    href="#!"
                                    role="button"
                                    data-mdb-ripple="true"
                                    data-mdb-ripple-color="light"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-3.5 h-3.5 mr-2">
                                        <path fill="currentColor" d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"/>
                                    </svg>
                                    Twitter
                                </a>
                            </div>

                            <div className='flex justify-center mt-2 '>
                                <span className='mr-4'>¿Ya tienes cuenta?</span> 
                                <Link to="/login" className='text-blue-600 hover:text-blue-700 focus:text-blue-700 active:text-blue-800 duration-200 transition ease-in-out'>
                                    Acceder
                                </Link>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}
