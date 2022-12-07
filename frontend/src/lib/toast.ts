import { toast } from 'react-hot-toast'

export const toastSuccess = (message: string, id: string | null = null) => {
  if (id) {
    return toast.success(message, {
      id: id,
      duration: 1000
    })
  }
  return toast.success(message)
}

export const toastError = (message: string, id: string | null = null) => {
  if (id) {
    return toast.error(message, {
      id: id
    })
  }
  return toast.error(message)
}

export const toastLoad = (message: string) => {
  return toast.loading(message)
}
