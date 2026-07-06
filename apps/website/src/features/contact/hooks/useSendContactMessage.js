import { useMutation } from '@tanstack/react-query'

import { sendContactMessage } from '../api/contact.api'

export function useSendContactMessage(options = {}) {
  return useMutation({
    mutationFn: sendContactMessage,
    ...options,
  })
}