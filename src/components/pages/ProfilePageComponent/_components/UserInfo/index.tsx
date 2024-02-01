import { useState, useMemo, useEffect } from 'react'

import { Image } from '@nextui-org/react'
import axios from 'axios'
import { toast } from 'sonner'

import { getUserPhotoPath } from '@/src/utils/getUserPhotoPath'
import { getUserPhotos } from '@/src/utils/getUserPhotos'

import s from './UserInfo.module.scss'

const UserInfo = () => {
    const [webApp, setWebApp] = useState<any | null>(null)
    const [photo, setPhoto] = useState<string | null>(null)

    const value = useMemo(
        () =>
            webApp
                ? {
                      webApp,
                      unsafeData: webApp.initDataUnsafe,
                      user: webApp.initDataUnsafe.user
                  }
                : {},
        [webApp]
    )

    useEffect(() => {
        const app = window.Telegram.WebApp

        app.ready()
        setWebApp(app)

        if (value.user?.id) {
            axios(getUserPhotos(value.user?.id))
                .then(async (response) =>
                    axios(
                        getUserPhotoPath(
                            response.data?.result?.photos[0][0]?.file_id
                        )
                    )
                        .then(async (res) => {
                            setPhoto(
                                `https://api.telegram.org/file/bot6563010085:AAGyH_HZD-zLcNugzfucST9AC63yFtPt6gA/${res.data?.result?.file_path}`
                            )
                        })
                        .catch(() => toast.error('Не удалось загрузить фото'))
                )
                .catch(() => toast.error('Не удалось загрузить фото'))
        }
    }, [value.user?.id])

    return (
        <>
            {/* <div style={{ fontSize: "50px" }}>{value.user?.username}1</div>
      <div style={{ fontSize: "50px" }}>{typeof value.user?.photo_url}2</div>
      <div style={{ fontSize: "50px" }}>{value.user?.id}3</div>
      <div style={{ fontSize: "50px" }}>{photo}4</div> */}
            {photo ? (
                <Image
                    loading='lazy'
                    src={photo}
                    alt='Фото пользователя'
                    width={120}
                    height={120}
                    className={s.image}
                    classNames={{ wrapper: s.image }}
                />
            ) : (
                <div className={s.image} />
            )}
            <div className={s.name}>{value.user?.first_name}</div>
        </>
    )
}

export default UserInfo
