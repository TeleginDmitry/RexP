/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from "react";

import { Button } from "@nextui-org/react";
import clsx from "clsx";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";

import RootIcon from "@/src/components/ui/icons/RootIcon";
import RootButton from "@/src/components/ui/RootButton";
import { getProductName } from "@/src/utils/api/getProductName";

const SearchPage = () => {
  const router = useRouter();

  const [isError, setIsError] = useState(false);
  const [value, setValue] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    setIsError(false);
  };

  async function onSubmit() {
    if (value.length === 0) {
      return;
    }

    const product = await getProductName({ url: value });

    const { data } = product;

    if (data) {
      router.push(`/catalog/${data.id}`);
    }
  }

  const handleClick = () => {
    if (value.length === 0) {
      setIsError(true);
      return;
    }

    setIsError(false);

    try {
      onSubmit();
    } catch (error) {
      /* empty */
    }
  };

  return (
    <>
      <Head>
        <title>title</title>
        <meta name="description" content="description" />
      </Head>

      <div className="flex flex-col w-full h-[calc(100vh-100px)] overflow-hidden">
        <div className="flex flex-col gap-4 px-4 overflow-y-auto grow">
          <div className="flex justify-between items-center gap-2">
            <RootButton onClick={() => router.back()}>
              <RootIcon name="arrowLeft" />
            </RootButton>
            <p className="text-base text-black font-medium">Поиск товара из Poizon по ссылке</p>
            <div />
          </div>
          <input
            onChange={handleChange}
            className={`w-full bg-[#EEEEEE] p-3  rounded-2xl ${clsx({
              "placeholder:text-[#D50000]": isError,
            })}`}
            type="text"
            placeholder={isError ? "Вставьте ссылку на товар из Poizon*" : "Ссылка товара из Poizon"}
          />
          <div className="flex flex-col gap-3">
            <p className="text-base text-black font-medium">Как скопировать ссылку из Poizon?</p>

            <div className="flex flex-col gap-3 pb-4 border-b border-solid border-[#EEEEEE]">
              <div className="flex gap-3 items-center">
                <span className="flex items-center justify-center bg-black text-white py-2 px-3 rounded-full">1</span>
                <p className="text-base text-black">Скачайте приложение Poizon и зарегистрируйтесь</p>
              </div>
              <div className="flex items-center gap-3 justify-center">
                <a href="#" className="border border-solid border-black rounded-lg w-full">
                  <img className="max-w-full" src="/images/searchPage/store.png" alt="store link" />
                </a>
                <a href="#" className="border border-solid border-black rounded-lg w-full">
                  <img className="max-w-full" src="/images/searchPage/market.png" alt="market link" />
                </a>
              </div>
            </div>
            <div className="flex flex-col gap-3 pb-4 border-b border-solid border-[#EEEEEE]">
              <div className="flex gap-3 items-center">
                <span className="flex items-center justify-center bg-black text-white py-2 px-3 rounded-full">2</span>
                <p className="text-base text-black">Скопируйте ссылку на товар, выполнив эти действия</p>
              </div>
              <div className="flex items-center gap-3 justify-center">
                <Image src="/images/searchPage/example1.png" alt="store link" width={128} height={200} />

                <Image
                  className="translate-y-4"
                  src="/images/searchPage/example2.png"
                  alt="market link"
                  width={128}
                  height={200}
                />
              </div>
            </div>
            <div className="flex flex-col gap-3 pb-4">
              <div className="flex gap-3 items-center">
                <span className="flex items-center justify-center bg-black text-white py-2 px-3 rounded-full">3</span>
                <p className="text-base text-black">Вставьте ссылку в строку поиска выше</p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full pt-3 px-4 bg-white">
          <Button onClick={handleClick} className="w-full py-3 bg-black rounded-xl text-white text-base">
            Найти товар
          </Button>
        </div>
      </div>
    </>
  );
};

export default SearchPage;
