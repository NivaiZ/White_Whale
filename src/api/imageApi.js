import { apiInstance } from './instance'

const uploadImage = async ({file}) => {
  try {
    if (!file) {
      console.error('Файл не выбран')
      return //в идеале бы бросить ошибку, чтобы обработать её в thunk
    }

    const formData = new FormData()
    formData.append('file', file)

    const token = localStorage.getItem('token')
    const response = await apiInstance.post(
      'https://615aa29e26d29508.mokky.dev/uploads/',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      }
    )

    console.log('Response from server:', response.data)

    return response.data
  } catch (error) {
    console.error('Ошибка при загрузке файла:', error)
  }
}

// const doSmtToImage = async () => {}

/** в этот экспорт идут все методы, связанные с images */
export const imageApi = {
  uploadImage,
  // doSmtToImage,
}