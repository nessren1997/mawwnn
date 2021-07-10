import { notification } from 'antd';
import useTranslation from 'next-translate/useTranslation';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { EmptyCart, selectOrderDetails, selectVerificationStatus, SendVerificationCodeAsync } from '../redux';
import ConfirmOrderForm from '../widgets/site/pill-input';

const test: React.FC = () => {
    const { t } = useTranslation('cart');
    const dispatch = useDispatch();

    const [verificationCode, setVerificationCode] = useState('');
    const orderId = useSelector(selectOrderDetails)?.id;
    const verificationStatus = useSelector(selectVerificationStatus);

    const verificationtNotification = (
        msg: string,
        description: string,
        type: string
    ) => {
        notification[type === 'success' ? 'success' : 'error']({
            message: msg,
            description: description,
            placement: 'bottomRight',
            duration: 4,
        });
    };

    const submitVerificationCode = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (verificationCode.trim().length > 0)
            dispatch(SendVerificationCodeAsync(verificationCode, orderId + ''));
    };

    const handleVerificationCodeChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => setVerificationCode(e.target.value);

    useEffect(() => {
        if (verificationStatus === 'data') {
            verificationtNotification(
                t`verification-success`,
                t`verification-success-desc`,
                'success'
            );
            dispatch(EmptyCart());
        }
    }, [verificationStatus]);

    useEffect(() => {
        if (verificationStatus === 'error') {
            verificationtNotification(
                t`verification-failed`,
                t`verification-failed-desc`,
                'failed'
            );
        }
    }, [verificationStatus]);

    return <ConfirmOrderForm
        placeholder={t`cart-forms.enter-confirmation`}
        name='confirmation'
        button_text={t`verify`}
        handleSubmit={submitVerificationCode}
        handleChange={handleVerificationCodeChange}
        val={verificationCode}
        isLoading={verificationStatus === 'loading'}
    />

}
export default test;