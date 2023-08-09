import { PathConstant } from '@/constants'
import { AutoStoriesOutlined, QuizOutlined } from '@mui/icons-material'

export const routes = [
  {
    id: 1,
    name: 'Vocabulary',
    rootPath: PathConstant.VOCABULARIES,
    Icon: AutoStoriesOutlined,
  },
  {
    id: 2,
    name: 'Quiz',
    rootPath: PathConstant.QUIZ,
    Icon: QuizOutlined,
  },
]
