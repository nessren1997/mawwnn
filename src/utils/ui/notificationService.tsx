import { notification, Typography } from 'antd'
import getT from 'next-translate/getT'
import React from 'react'

import { DEFAULT_LANG, KEY_LANG_COOKIE, SITE_LANGUAGE } from '../../constants/keys'
import getDocumentCookie from '../helpers/get-document-cookie'
import ApiError from '../api/models/api-error'

const ApiErrorNotification = async (error: ApiError, language?: SITE_LANGUAGE) => {

  const lang = language || getDocumentCookie(KEY_LANG_COOKIE) || DEFAULT_LANG;

  const t = await getT(lang, 'errors')

  console.error(error)

  let message: React.ReactNode = <Typography.Text style={{ fontSize: '2rem' }}>{t(`api-errors.${error.errorType.toString()}`)}</Typography.Text>;

  notification.open({
    type: 'error',
    message: message,
    placement: 'bottomRight'
  })
}
export default ApiErrorNotification;