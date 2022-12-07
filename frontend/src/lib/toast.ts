import { toast } from 'react-hot-toast'

export const toastSuccess = (message: string, id: string) => {
  if (id) {
    return toast.success(message, {
      id: id,
      duration: 1000
    })
  }
  return toast.success(message)
}

export const toastError = (message: string) => {
  return toast.error(message)
}

export const toastLoad = (message: string) => {
  return toast.loading(message)
}
