import { toast } from 'react-hot-toast'

export const toastSuccess = (message: string) => {
  toast.success(message, {
    // style: {
    //   background: '#333',
    //   color: '#fff'
    // }
  })
}

export const toastError = (message: string) => {
  toast.error(message, {
    // style: {
    //   background: '#333',
    //   color: '#fff'
    // }
  })
}
