import { ToastOptions } from "react-toastify"

export const toastOptions: ToastOptions<unknown> = {
    position: "top-center",
    autoClose: 1500,
    hideProgressBar: true,
    theme: "light",
    closeOnClick: false,
    closeButton: false,
}

export const toastOptionsLoading: ToastOptions<unknown> = {
    position: "top-center",
    autoClose: 1500,
    isLoading: true,
    hideProgressBar: true,
    theme: "light",
    closeOnClick: false,
    closeButton: false,
}
