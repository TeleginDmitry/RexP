/* eslint-disable react/no-array-index-key */
import { Button } from '@nextui-org/react'
import clsx from 'clsx'
import { useRouter } from 'next/router'

import RootButton from '@/src/components/ui/RootButton'
import SpecificBlock from '@/src/components/ui/SpecificBlock/SpecificBlock'
import {
    useAppDispatch,
    useAppSelector
} from '@/src/hooks/redux-hooks/redux-hooks'
import { changeIsMain } from '@/src/store/slices/getDelivery'
import { editDeliveryCart } from '@/src/utils/api/DeliveryCartMethods'

import image from 'public/images/global/image1.png'

import s from './DeliveryBlock.module.scss'

const DeliveryBlock = () => {
    const dispatch = useAppDispatch()
    const deliveryCarts = useAppSelector((state) => state.delivery.data)
    const router = useRouter()

    const currentIsMain = deliveryCarts.find((item) => item.isMain)

    const onHandleClick = (id: number, typeId: number) => {
        router.push(
            { pathname: '/profile/deliveryDetails', query: { id, typeId } },
            undefined,
            { shallow: true }
        )
    }

    const onHandleActiveClick = async (id: number) => {
        try {
            const response = await editDeliveryCart(id, { isMain: true })
            if (response.data) {
                dispatch(changeIsMain({ id, value: true }))

                if (!currentIsMain?.id) {
                    return
                }

                await editDeliveryCart(currentIsMain.id, { isMain: false })
            }
        } catch (error) {
            /* empty */
        }
    }

    if (!deliveryCarts.length) {
        return (
            <SpecificBlock
                imageUrl={image.src}
                linkText=''
                text='Внеси информацию, и мы с радостью доставим твои покупки!'
                title='У тебя пока что не заполнены данные для доставки'
            />
        )
    }

    return (
        <div className={s.wrapper}>
            {!!deliveryCarts.length &&
                [...deliveryCarts]
                    .sort((a, b) =>
                        a.isMain === b.isMain ? 0 : a.isMain ? -1 : 1
                    )
                    .map(
                        (
                            {
                                id,
                                firstName,
                                lastName,
                                patronymic,
                                number,
                                deliveryType,
                                isMain,
                                city,
                                street,
                                house
                            },
                            index
                        ) => (
                            <div
                                className={clsx(s.address, isMain && s.active)}
                                key={index}
                            >
                                <div className={s.header}>
                                    <div className={s.title}>
                                        {isMain
                                            ? 'Основной адрес'
                                            : 'Дополнительный адрес'}
                                    </div>
                                    <RootButton
                                        onClick={() =>
                                            onHandleClick(id!, deliveryType!.id)
                                        }
                                    >
                                        <svg
                                            xmlns='http://www.w3.org/2000/svg'
                                            width='14'
                                            height='16'
                                            viewBox='0 0 14 16'
                                            fill='none'
                                        >
                                            <path
                                                d='M7.79423 3.95881C8.05328 3.63559 8.00126 3.16358 7.67804 2.90453C7.35483 2.64549 6.88281 2.6975 6.62377 3.02072L7.79423 3.95881ZM1.311 10.8488L1.87903 11.3385C1.88489 11.3317 1.89062 11.3248 1.89623 11.3178L1.311 10.8488ZM1.14 11.2668L0.391457 11.2179L0.390803 11.2321L1.14 11.2668ZM1 14.2898L0.250803 14.2551C0.249078 14.2923 0.250133 14.3296 0.253958 14.3667L1 14.2898ZM1.787 14.9768L1.81152 15.7264C1.86154 15.7247 1.91126 15.7181 1.95996 15.7065L1.787 14.9768ZM4.787 14.2658L4.95998 14.9956L4.97162 14.9927L4.787 14.2658ZM5.172 14.0218L5.75061 14.4991L5.75711 14.491L5.172 14.0218ZM11.7971 6.95897C12.0562 6.63582 12.0043 6.16379 11.6812 5.90466C11.3581 5.64552 10.886 5.69742 10.6269 6.02056L11.7971 6.95897ZM6.62693 3.02052C6.36777 3.34365 6.41963 3.81568 6.74276 4.07484C7.06589 4.33399 7.53792 4.28213 7.79707 3.95901L6.62693 3.02052ZM8.8 1.50976L9.38507 1.97901C9.39493 1.96672 9.4044 1.95412 9.41346 1.94123L8.8 1.50976ZM10.429 1.18976L10.9088 0.613324C10.8849 0.593443 10.8598 0.575066 10.8337 0.558299L10.429 1.18976ZM12.666 3.05176L13.1968 2.52192C13.1805 2.50561 13.1635 2.49007 13.1458 2.47532L12.666 3.05176ZM13.0029 3.87264L13.7529 3.87676V3.87676L13.0029 3.87264ZM12.657 4.68976L12.132 4.15412C12.1108 4.17496 12.0908 4.19704 12.0721 4.22025L12.657 4.68976ZM10.6271 6.02025C10.3678 6.34326 10.4195 6.81532 10.7425 7.07462C11.0655 7.33393 11.5376 7.28228 11.7969 6.95928L10.6271 6.02025ZM7.95372 3.37862C7.89233 2.96898 7.51049 2.68666 7.10085 2.74805C6.69121 2.80943 6.4089 3.19127 6.47028 3.60091L7.95372 3.37862ZM11.313 7.23294C11.7234 7.17717 12.0109 6.79923 11.9552 6.38879C11.8994 5.97834 11.5215 5.69082 11.111 5.74659L11.313 7.23294ZM6.62377 3.02072L0.725768 10.3797L1.89623 11.3178L7.79423 3.95881L6.62377 3.02072ZM0.742969 10.359C0.535608 10.5995 0.412256 10.9011 0.39159 11.218L1.88841 11.3156C1.88786 11.324 1.88457 11.3321 1.87903 11.3385L0.742969 10.359ZM0.390803 11.2321L0.250803 14.2551L1.7492 14.3245L1.8892 11.3015L0.390803 11.2321ZM0.253958 14.3667C0.335633 15.1586 1.01588 15.7524 1.81152 15.7264L1.76248 14.2272C1.75928 14.2273 1.75771 14.2268 1.75669 14.2264C1.75526 14.2259 1.75337 14.2249 1.75144 14.2232C1.7495 14.2215 1.74825 14.2198 1.74754 14.2185C1.74703 14.2175 1.74637 14.216 1.74604 14.2128L0.253958 14.3667ZM1.95996 15.7065L4.95996 14.9955L4.61404 13.536L1.61404 14.247L1.95996 15.7065ZM4.97162 14.9927C5.27713 14.9151 5.54997 14.7422 5.75055 14.499L4.59345 13.5445C4.59575 13.5417 4.59888 13.5397 4.60238 13.5388L4.97162 14.9927ZM5.75711 14.491L11.7971 6.95897L10.6269 6.02056L4.58689 13.5526L5.75711 14.491ZM7.79707 3.95901L9.38507 1.97901L8.21493 1.04052L6.62693 3.02052L7.79707 3.95901ZM9.41346 1.94123C9.5521 1.74411 9.82143 1.6912 10.0243 1.82123L10.8337 0.558299C9.9544 -0.00515878 8.78732 0.224102 8.18654 1.0783L9.41346 1.94123ZM9.94919 1.7662L12.1862 3.6282L13.1458 2.47532L10.9088 0.613324L9.94919 1.7662ZM12.1352 3.58161C12.2111 3.6577 12.2535 3.761 12.2529 3.86852L13.7529 3.87676C13.7557 3.36905 13.5555 2.88127 13.1968 2.52192L12.1352 3.58161ZM12.2529 3.86852C12.2524 3.97604 12.2088 4.07886 12.132 4.15412L13.182 5.22541C13.5446 4.87002 13.7501 4.38447 13.7529 3.87676L12.2529 3.86852ZM12.0721 4.22025L10.6271 6.02025L11.7969 6.95928L13.2419 5.15928L12.0721 4.22025ZM6.47028 3.60091C6.81963 5.93221 8.97712 7.55032 11.313 7.23294L11.111 5.74659C9.58811 5.95352 8.18149 4.89855 7.95372 3.37862L6.47028 3.60091Z'
                                                fill='#8E8E8E'
                                            />
                                        </svg>
                                    </RootButton>
                                </div>
                                <div className={s.content}>
                                    <div className={s.title}>Получатель</div>
                                    <div className={s.name}>
                                        {lastName} {firstName} {patronymic}
                                    </div>
                                    <div className={s.phone}>
                                        {number.replace(
                                            /(\d)(\d{3})(\d{3})(\d{2})(\d{2})/,
                                            '+$1 $2 $3 $4 $5'
                                        )}
                                    </div>
                                    <div className={s.title}>
                                        Адрес доставки
                                    </div>

                                    <div className={s.addressValue}>
                                        {deliveryType.id === 1 &&
                                            'Пункт СДЭК, '}
                                        {city}, {street}
                                        {deliveryType.id === 2 && `, ${house}`}
                                    </div>
                                </div>
                                {!isMain && (
                                    <Button
                                        className={clsx(s.button)}
                                        onClick={() => onHandleActiveClick(id!)}
                                    >
                                        Сделать основным
                                    </Button>
                                )}
                            </div>
                        )
                    )}
        </div>
    )
}

export default DeliveryBlock
