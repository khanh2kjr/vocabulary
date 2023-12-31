import ApiClientWithToken from '@/apps/api'
import { cleanObject } from '@/utils'

export default {
  getVocabularies(queries) {
    return ApiClientWithToken.get('/vocabularies', {
      params: cleanObject({ ...queries }),
    })
  },
  createVocabulary(requestBody) {
    return ApiClientWithToken.post('/vocabularies', requestBody)
  },
  updateVocabulary(payload) {
    return ApiClientWithToken.put(`/vocabularies/${payload.vocabularyId}`, payload.requestBody)
  },
  deleteVocabulary(vocabularyId) {
    return ApiClientWithToken.delete(`/vocabularies/${vocabularyId}`)
  },
  getVocabularyType() {
    return ApiClientWithToken.get('/types')
  },
}
